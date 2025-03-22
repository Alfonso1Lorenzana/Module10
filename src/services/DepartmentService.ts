import { dbPool, connect2Db } from "./connection.js";
import { Department } from "../types.js";

await connect2Db();
class DepartmentService {
  async getDepartments(): Promise<Department[]> {
    const sql = `SELECT id, name FROM department;`;
    try {
      const result = await dbPool.query(sql);
      return result.rows;
    } catch (err) {
      throw err;
    }
  }
  async addDepartment(name: string): Promise<Department> {
    const query = "INSERT INTO department (name) VALUES ($1) RETURNING *";
    try {
      const result = await dbPool.query(query, [name]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}
export default new DepartmentService();