import { dbPool, connect2Db } from "./connection.js";
import { Department } from "../types.js";

// Connect to Database
await connect2Db();

class DepartmentService {
  // These calls need to be Promised as well, since they cannot get anything else except for Department
  async getDepartments(): Promise<Department[]> {
    const sql = `SELECT id, name FROM department;`;
    try {
      const result = await dbPool.query(sql);
      return result.rows;
    } catch (err) {
      throw err;
    }
  }
  // This as by name cannot get anything else other than the Addition of one Department
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