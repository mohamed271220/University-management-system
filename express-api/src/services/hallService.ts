import Department from "../models/Department";
import Hall from "../models/Hall";
import { v4 as uuid } from "uuid";
import Lecture from "../models/Lecture";
import { CustomError } from "../utils/CustomError";

export class HallService {
  constructor(private hallModel: typeof Hall = Hall) {}

  async createHall(name: string, isLab: boolean, departmentId: string) {
    const department = await Department.findByPk(departmentId);
    if (!department) {
      throw new CustomError("Department not found", 404);
    }
    const hall = await this.hallModel.create({
      id: uuid(),
      name,
      isLab,
      departmentId,
    });
    return hall;
  }

  async getAllHalls() {
    const halls = await this.hallModel.findAll();
    return halls;
  }

  async getHallById(hallId: string) {
    const hall = await this.hallModel.findByPk(hallId);
    if (!hall) {
      throw new CustomError("Hall not found", 404);
    }
    return hall;
  }

  async updateHall(
    hallId: string,
    name: string,
    isLab: boolean,
    departmentId: string
  ) {
    const hall = await this.hallModel.findByPk(hallId);
    if (!hall) {
      throw new CustomError("Hall not found", 404);
    }

    if (name) hall.name = name;
    if (isLab !== undefined) hall.isLab = isLab;
    if (departmentId) {
      const department = await Department.findByPk(departmentId);
      if (!department) {
        throw new CustomError("Department not found", 404);
      }
      hall.departmentId = departmentId;
    }
    await hall.save();
    return hall;
  }

  async deleteHall(hallId: string) {
    const hall = await this.hallModel.findByPk(hallId);
    if (!hall) {
      throw new CustomError("Hall not found", 404);
    }
    await hall.destroy();
    return hall;
  }

  async getLecturesByHall(hallId: string) {
    const hall = await this.hallModel.findByPk(hallId);
    if (!hall) {
      throw new CustomError("Hall not found", 404);
    }
    const lectures = await Lecture.findAll({
      where: { hallId },
    });
    return lectures;
  }
}
