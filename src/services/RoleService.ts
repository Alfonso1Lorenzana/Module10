import { dbPool, connect2Db } from "./connection.js";
import { Role } from "../types.js";

await connect2Db();

class RoleService {
  async getRoles(): Promise<Role[]> {
    const sql = `
    Select 
        role.id, role.title, 
        dept.name As department, role.salary
    From 
        role role 
        LEFT JOIN department dept
        ON dept.id = role.department_id;
    `;
    try {
      const result = await dbPool.query(sql);
      return result.rows;
    } catch (err) {
      throw err;
    }
  }
  async addRole(
    title: string,
    salary: string,
    departmentId?: number
  ): Promise<Role> {
    const query =
      "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *";
    try {
      const result = await dbPool.query(query, [title, salary, departmentId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}
export default new RoleService();