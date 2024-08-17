import Semester from "../models/Semester";
import { v4 as uuid } from "uuid";

export class SemesterService {
  constructor(private semesterModel: typeof Semester) {}

  async createSemester(semesterName: string, startDate: Date, endDate: Date) {
    const semester = await this.semesterModel.create({
      id: uuid(),
      name: semesterName,
      startDate,
      endDate,
    });
    return semester;
  }
}
