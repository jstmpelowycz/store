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
}
