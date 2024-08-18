import { departmentData } from "../interfaces";
import Course from "../models/Course";
import Department from "../models/Department";
import { v4 as uuid } from "uuid";
import Hall from "../models/Hall";
import { Op } from "sequelize";

export class DepartmentService {
  constructor(private departmentModel: typeof Department = Department) {}

  async createDepartment(data: departmentData) {
    const { name, code } = data;
    const exitingDepartment = await this.departmentModel.findOne({
      where: { [Op.or]: [{ code }, { name }] },
    });

    if (exitingDepartment) throw new Error("Department already exists");
    const department = await this.departmentModel.create({
      id: uuid(),
      name,
      code,
    } as departmentData & { id: string });
    return department;
  }

  async getAllDepartments(limit: number = 10, offset: number = 0) {
    const { count, rows: departments } =
      await this.departmentModel.findAndCountAll({
        limit,
        offset,
      });
    // count the number of departments for pagination
    const totalPages = Math.ceil(count / limit);
    const currentPage = Math.ceil(offset / limit) + 1;
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    const pagination = {
      totalItems: count,
      itemsPerPage: limit,
      currentPage: currentPage,
      totalPages: totalPages,
      hasNextPage: hasNextPage,
      hasPreviousPage: hasPreviousPage,
      nextPage: hasNextPage ? currentPage + 1 : null,
      previousPage: hasPreviousPage ? currentPage - 1 : null,
    };

    return { departments, pagination };
    // return departments;
  }

  async getDepartmentById(id: string) {
    const department = await this.departmentModel.findByPk(id);
    return department;
  }

  async updateDepartment(id: string, updates: Partial<departmentData>) {
    const department = await this.departmentModel.findByPk(id);
    if (!department) throw new Error("Department not found");

    const existingDepartment = await this.departmentModel.findOne({
      where: {
        [Op.or]: [{ code: updates.code || "" }, { name: updates.name || "" }],
        id: { [Op.ne]: id },
      },
    });

    if (existingDepartment) {
      if (existingDepartment.code === updates.code) {
        throw new Error("Department code already exists");
      }
      if (existingDepartment.name === updates.name) {
        throw new Error("Department name already exists");
      }
    }
    if (updates.name) department.name = updates.name;
    if (updates.code) department.code = updates.code;

    await department.save();
    return department;
  }

  async deleteDepartment(id: string) {
    const department = await this.departmentModel.findByPk(id);
    if (!department) throw new Error("Department not found");

    await department.destroy();
  }

  async getCoursesByDepartment(id: string) {
    const courses = await Course.findAll({
      where: { departmentId: id },
    });
    if (!courses) throw new Error("Department has no courses");
    return courses;
  }

  async getHallsByDepartment(id: string) {
    const department = await Hall.findAll({
      where: { departmentId: id },
    });

    if (!department) throw new Error("Department has no halls");

    return department;
  }
}
