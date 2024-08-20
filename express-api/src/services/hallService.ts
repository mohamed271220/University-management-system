import Department from "../models/Department";
import Hall from "../models/Hall";
import { v4 as uuid } from "uuid";
import Lecture from "../models/Lecture";

export class HallService {
  constructor(private hallModel: typeof Hall = Hall) {}

  async createHall(name: string, isLab: boolean, departmentId: string) {
    const department = await Department.findByPk(departmentId);
    if (!department) {
      throw new Error("Department not found");
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
      throw new Error("Hall not found");
    }

    if (name) hall.name = name;
    if (isLab !== undefined) hall.isLab = isLab;
    if (departmentId) {
      const department = await Department.findByPk(departmentId);
      if (!department) {
        throw new Error("Department not found");
      }
      hall.departmentId = departmentId;
    }
    await hall.save();
    return hall;
  }

  async deleteHall(hallId: string) {
    const hall = await this.hallModel.findByPk(hallId);
    if (!hall) {
      throw new Error("Hall not found");
    }
    await hall.destroy();
    return hall;
  }

  async getLecturesByHall(hallId: string) {
    const hall = await this.hallModel.findByPk(hallId);
    if (!hall) {
      throw new Error("Hall not found");
    }
    const lectures = await Lecture.findAll({
      where: { hallId },
    });
    return lectures;
  }
}
