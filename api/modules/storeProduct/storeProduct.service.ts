import {pool} from "../../index";
import {StoreProduct} from "./storeProduct.typedefs";

interface StoreProductsRevenue {
  product_name: string;
  revenue: number;
}

interface CategoryAveragePrice {
  category_name: string;
  average: number;
}

interface StoreProductsRevenue {
  product_name: string;
  revenue: number;
}

interface CategoryAveragePrice {
  category_name: string;
  average: number;
}

interface ProductsByCategories {
  upc: string;
  selling_price: number;
  is_promotional: boolean;
  name: string;
}

interface StoreProductInfo {
  selling_price: number;
  amount: number;
  name: string;
  description: string;
}

export class StoreProductService {
  // @Danylo - Q1
  public async getStoreProductsRevenue(): Promise<StoreProductsRevenue[]> {
    const {rows} = await pool.query(`
        SELECT p.name,
               SUM(s.amount * s.selling_price) as revenue
        FROM store_products sp
                 JOIN products p ON sp.product_id = p.id
                 JOIN sales s ON sp.upc = s.store_product_upc
        GROUP BY p.name
        ORDER BY revenue DESC;
    `);

    return rows;
  }

  // @Danylo - Q2
  public async getStoreProductsNeverSoldByEmployees(
    employeeId: number,
  ): Promise<StoreProduct[]> {
    const {rows} = await pool.query(`
        SELECT *
        FROM store_products sp
        WHERE NOT EXISTS(
                SELECT *
                FROM sales s
                WHERE s.store_product_upc = sp.upc
                  AND s.invoice_id NOT IN (SELECT i.id
                                           FROM invoices i
                                           WHERE i.employee_id <> ${employeeId})
            );
    `);

    return rows;
  }

  // @Dmytro H. - Q1
  public async getAllNonPromotionalSoldStoreProducts(): Promise<string[]> {
    const {rows} = await pool.query(`
        SELECT p.name
        FROM products AS p
                 INNER JOIN categories AS c ON p.id = c.id
                 INNER JOIN store_products AS sp ON sp.product_id = p.id
        WHERE NOT EXISTS(
                SELECT 1
                FROM sales AS s
                WHERE s.store_product_upc = sp.upc
                  AND sp.is_promotional = true
                  AND s.selling_price NOT IN (SELECT sp2.selling_price
                                              FROM store_products AS sp2
                                              WHERE sp2.product_id = p.id
                                                AND sp2.is_promotional = true)
            );
    `);

    return rows;
  }

  // @Dmytro H. - Q2
  public async getCategoryAveragePrice(categoryName: string): Promise<CategoryAveragePrice> {
    const {rows} = await pool.query(`
        SELECT c.name                AS category_name,
               AVG(sp.selling_price) AS avg_selling_price
        FROM categories AS c
                 JOIN products AS p ON c.id = p.category_id
                 JOIN store_products AS sp ON p.id = sp.product_id
        WHERE c.name = ${categoryName}
        GROUP BY c.name;
    `);

    return rows[0];
  }


  public async getProductsByCategoryName(categoryName: string): Promise<ProductsByCategories[]> {
    const {rows} = await pool.query(`
        SELECT sp.upc            AS upc,
               sp.selling_price  AS selling_price,
               sp.is_promotional AS is_promotional,
               p.name            AS name
        FROM store_products AS sp
                 JOIN products AS p ON sp.product_id = p.id
                 JOIN categories AS c ON p.category_id = c.id
        WHERE c.name = ${categoryName}
        ORDER BY p.name DESC;

    `);

    return rows;
  }

  public async getAllStoreProductsByAmount(): Promise<StoreProduct[]> {
    const {rows} = await pool.query(`
        SELECT *
        FROM products AS p
                 JOIN store_products AS sp ON p.id = sp.product_id
        ORDER BY sp.amount DESC;
    `);

    return rows;
  }

  public async findStoreProductInfoByUPC(upc: string): Promise<StoreProductInfo[]> {
    const {rows} = await pool.query(`
        SELECT sp.selling_price AS selling_price,
               sp.amount        AS amount,
               p.name           AS name,
               p.description    AS description
        FROM store_products AS sp
                 JOIN products AS p ON sp.product_id = p.id
        WHERE sp.upc = ${upc};
    `);

    return rows;
  }

  public async findAllPromotionalStoreProductsSortedByAmount(): Promise<StoreProduct[]> {
    const {rows} = await pool.query(`
        SELECT *
        FROM store_products
        WHERE is_promotional = true
        ORDER BY amount DESC;
    `);

    return rows;
  }

  public async findAllNonPromotionalStoreProductsSortedByAmount(): Promise<StoreProduct[]> {
    const {rows} = await pool.query(`
        SELECT *
        FROM store_products
        WHERE is_promotional = false
        ORDER BY amount DESC;
    `);

    return rows;
  }

  public async findAllPromotionalStoreProductsSortedByName(): Promise<StoreProduct[]> {
    const {rows} = await pool.query(`
        SELECT *
        FROM store_products AS sp
                 JOIN products AS p ON sp.product_id = p.id
        WHERE is_promotional = true
        ORDER BY p.name;
    `);

    return rows;
  }

  public async findAllNonPromotionalStoreProductsSortedByName(): Promise<StoreProduct[]> {
    const {rows} = await pool.query(`
        SELECT *
        FROM store_products AS sp
                 JOIN products AS p ON sp.product_id = p.id
        WHERE is_promotional = false
        ORDER BY p.name;
    `);

    return rows;
  }

  public async getSumOfTotalSoldStoreProducts(start: string, end: string): Promise<number> {
    const {rows} = await pool.query(`
        SELECT SUM(total)
        FROM invoices
        WHERE print_date >= ${start}
          AND print_date < ${end};
    `);

    return rows[0];
  }

  public async getAmountOfStoreProductSoldByPeriod(
    productName: string,
    start: string,
    end: string
  ): Promise<number> {
    const {rows} = await pool.query(`
        SELECT SUM(s.amount)
        FROM sales AS s
                 JOIN store_products AS sp ON s.store_product_upc = sp.upc
                 JOIN products AS p ON sp.product_id = p.id
                 JOIN invoices AS i ON s.invoice_id = i.id
        WHERE p.name = ${productName}
          AND i.print_date >= ${start}
          AND i.print_date < ${end};
    `);

    return rows[0];
  }

  public async getAmountOfStoreProductsSoldByCashierAndPeriod(
    cashier_last_name: string,
    start: string,
    end: string,
  ): Promise<number> {
    const {rows} = await pool.query(`
        SELECT SUM(i.total)
        FROM invoices AS i
                 JOIN employees AS e ON i.employee_id = e.id
        WHERE e.last_name = ${cashier_last_name}
          AND e.role = 'CASHIER'
          AND i.print_date >= ${start}
          AND i.print_date < ${end};
    `);

    return rows[0];
  }
}
