import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Department } from './department.entity';
import { Course } from 'src/course/course.entity';
import { User } from 'src/user/user.entity';
import { Hall } from 'src/hall/hall.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDepartmentDTO } from './dto/create-department.dto';
import { Op } from 'sequelize';
import { UpdateDepartmentDTO } from './dto/update-department.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department)
    private departmentModel: typeof Department,
    @InjectModel(Course)
    private courseModel: typeof Course,
    @InjectModel(Hall)
    private hallModel: typeof Hall,
  ) {}

  async createDepartment(
    createDepartmentDto: CreateDepartmentDTO,
  ): Promise<Department> {
    const { name, code } = createDepartmentDto;
    const existingDepartment = await this.departmentModel.findOne({
      where: { [Op.or]: [{ code }, { name }] },
    });

    if (existingDepartment) {
      throw new BadRequestException('Department already exists.');
    }

    const department = await this.departmentModel.create({
      id: uuid(),
      ...createDepartmentDto,
    });

    return department;
  }

  async getAllDepartments(
    search: string = '',
    limit: number = 10,
    offset: number = 0,
  ) {
    const { count, rows: departments } =
      await this.departmentModel.findAndCountAll({
        raw: true,
        nest: true,
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { code: { [Op.iLike]: `%${search}%` } },
          ],
        },
        limit,
        offset,
      });

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

    if (!departments.length) {
      throw new NotFoundException('No departments found');
    }

    return { departments, pagination };
  }

  async getDepartment(departmentId: string) {
    const department = await this.departmentModel.findByPk(departmentId);

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    return department;
  }

  async getDepartmentCourses(departmentId: string) {
    const department = await this.departmentModel.findByPk(departmentId, {
      raw: true,
      nest: true,
      include: [
        {
          model: this.courseModel,
          as: 'courses',
        },
      ],
    });

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    return department.courses;
  }

  async getDepartmentHalls(departmentId: string) {
    const department = await this.departmentModel.findByPk(departmentId);

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    const halls = await this.hallModel.findAll({
      where: { departmentId: departmentId },
      raw: true,
      nest: true,
    });

    if (!halls) {
      throw new NotFoundException('Halls not found');
    }

    return halls;
  }

  async updateDepartment(
    departmentId: string,
    updateDepartmentDto: UpdateDepartmentDTO,
  ) {
    const department = await this.departmentModel.findByPk(departmentId);
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    const { name, code } = updateDepartmentDto;
    if (name) {
      department.name = name;
    }
    if (code) {
      department.code = code;
    }
    await department.save();
    return department;
  }

  async deleteDepartment(departmentId: string) {
    const department = await this.departmentModel.findByPk(departmentId);
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    await department.destroy();
    return department;
  }
}
