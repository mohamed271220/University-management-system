import { departmentData } from "../interfaces";
import Department from "../models/Department";
import { v4 as uuid } from "uuid";

export class DepartmentService {
  constructor(private departmentModel: typeof Department) {}

  async createDepartment(data: departmentData) {
    const { name, code } = data;
    const department = await this.departmentModel.create({
      id: uuid(),
      name,
      code,
    } as departmentData & { id: string });
    return department;
  }
}
