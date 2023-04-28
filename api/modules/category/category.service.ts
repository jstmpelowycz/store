import {pool} from "../../index";
import {EmployeeRole} from "../employee/employee.typedefs";

export interface CategoryProductsRevenue {
  category_name: string;
  revenue: number;
}

export interface ExtendedCategoryProductsRevenue extends CategoryProductsRevenue {
  product_name: string;
}

export class CategoryService {
  public async getCategoryProductsTotal(): Promise<CategoryProductsRevenue[]> {
    const {rows} = await pool.query(`
        SELECT c.name                          as category_name,
               SUM(s.amount * s.selling_price) as revenue
        FROM sales s
                 JOIN store_products sp ON s.store_product_upc = sp.upc
                 JOIN products p ON sp.product_id = p.id
                 JOIN categories c ON p.category_id = c.id
        GROUP BY c.name
        ORDER BY revenue DESC;
    `);

    return rows;
  }

  public async getProductsTotalSoldByEmployeeRole(
    role: EmployeeRole,
  ): Promise<ExtendedCategoryProductsRevenue[]> {
    const {rows} = await pool.query(`
        SELECT 
            p.name AS product_name, 
            c.name AS category_name, 
            SUM(s.amount * s.selling_price) AS revenue
        FROM products p
                 JOIN categories c ON p.category_id = c.id
                 JOIN store_products sp ON p.id = sp.product_id
                 JOIN sales s ON sp.upc = s.store_product_upc
        WHERE NOT EXISTS (
                SELECT *
                FROM invoices i
                WHERE i.id = s.invoice_id
                  AND i.employee_id NOT IN (
                    SELECT id
                    FROM employees
                    WHERE role = ${role}
                )
            )
        GROUP BY p.name, c.name
        ORDER BY revenue DESC;
    `);

    return rows;
  }
}
