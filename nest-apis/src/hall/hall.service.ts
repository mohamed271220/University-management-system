import { Injectable, NotFoundException } from '@nestjs/common';
import { Hall } from './hall.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from 'src/department/department.entity';
import { Lecture } from 'src/lecture/lecture.entity';
import { CreateHallDTO } from './dto/create-hall.dto';
import { v4 as uuid } from 'uuid';
import { Op } from 'sequelize';
import { UpdateHallDTO } from './dto/update-hall.dto';

@Injectable()
export class HallService {
  constructor(
    @InjectModel(Hall)
    private hallModel: typeof Hall,
    @InjectModel(Department)
    private departmentModel: typeof Department,
    @InjectModel(Lecture)
    private lectureModel: typeof Lecture,
  ) {}

  async createHall(createHallDto: CreateHallDTO): Promise<Hall> {
    const { departmentId, ...hallData } = createHallDto;

    const department = await this.departmentModel.findByPk(departmentId);
    if (!department) {
      throw new NotFoundException('Department not found');
    }

    return this.hallModel.create({
      id: uuid(),
      ...hallData,
      departmentId,
    });
  }

  async getAllHalls(
    search: string = '',
    limit: number = 10,
    offset: number = 0,
  ): Promise<{ halls: Hall[]; pagination: any }> {
    const { count, rows: halls } = await this.hallModel.findAndCountAll({
      raw: true,
      nest: true,
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
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

    if (!halls.length) {
      throw new NotFoundException('No halls found');
    }

    return { halls, pagination };
  }

  async getHallById(hallId: string): Promise<Hall> {
    const hall = await this.hallModel.findByPk(hallId, {
      raw: true,
      nest: true,
      include: [
        {
          model: Department,
          as: 'department',
        },
      ],
    });

    if (!hall) {
      throw new NotFoundException('Hall not found');
    }

    return hall;
  }

  async getHallLectures(hallId: string): Promise<Lecture[]> {
    const hall = await this.hallModel.findByPk(hallId);

    if (!hall) {
      throw new NotFoundException('Hall not found');
    }

    const lectures = await this.lectureModel.findAll({
      raw: true,
      nest: true,
      where: {
        hallId,
      },
      include: [this.hallModel],
    });
    return lectures;
  }

  async updateHall(
    hallId: string,
    updateHallDto: UpdateHallDTO,
  ): Promise<Hall> {
    const hall = await this.hallModel.findByPk(hallId);
    if (!hall) {
      throw new NotFoundException('Hall not found');
    }

    const { departmentId, ...hallData } = updateHallDto;

    const department = await this.departmentModel.findByPk(departmentId);
    if (!department) {
      throw new NotFoundException('Department not found');
    }

    return hall.update({
      ...hallData,
      departmentId,
    });
  }

  async deleteHall(hallId: string): Promise<void> {
    const hall = await this.hallModel.findByPk(hallId);
    if (!hall) {
      throw new NotFoundException('Hall not found');
    }

    await hall.destroy();
  }
}
