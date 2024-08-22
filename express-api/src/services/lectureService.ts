import { Op } from "sequelize";
import { lectureType } from "../interfaces";
import Course from "../models/Course";
import Hall from "../models/Hall";
import Lecture from "../models/Lecture";
import User from "../models/User";
import { v4 as uuid } from "uuid";
import Attendance from "../models/Attendance";
import LectureHistory from "../models/LectureHistory";

export class LectureService {
  constructor(private lectureModel: typeof Lecture = Lecture) {}

  async createLecture(database: lectureType) {
    const [course, professor, hall] = await Promise.all([
      Course.findByPk(database.courseId),
      User.findByPk(database.professorId),
      Hall.findByPk(database.hallId),
    ]);

    if (!course) {
      throw new Error("Course not found");
    }
    if (!professor || professor.role !== "Professor") {
      throw new Error("Professor not found");
    }
    if (!hall) {
      throw new Error("Hall not found");
    }

    const isTimeValid = await this.lectureModel.findOne({
      where: {
        hallId: database.hallId, // Ensuring we are checking within the same hall
        dayOfWeek: database.dayOfWeek,
        [Op.or]: [
          // Check if the lecture starts or ends between the existing lecture's start and end time
          {
            startTime: {
              [Op.between]: [database.startTime, database.endTime],
            },
          },
          {
            endTime: {
              [Op.between]: [database.startTime, database.endTime],
            },
          },
          // or if the new lecture's start and end time is between the
          // existing lecture's start and end time
          {
            [Op.and]: [
              {
                startTime: {
                  [Op.lte]: database.startTime,
                },
              },
              {
                endTime: {
                  [Op.gte]: database.endTime,
                },
              },
            ],
          },
        ],
      },
    });

    if (isTimeValid) {
      throw new Error("Lecture already exists at this time in the same hall");
    }

    const lecture = await this.lectureModel.create({
      id: uuid(),
      ...database,
    });

    return lecture;
  }

  async getAllLectures(offset: number, limit: number, search: string = "") {
    const includeModels: any[] = [
      {
        model: Course,
        as: "course",
        required: false,
        where: search
          ? {
              name: {
                [Op.like]: `%${search}%`,
              },
            }
          : undefined,
      },
      {
        model: Hall,
        as: "hall",
        required: false,
        where: search
          ? {
              name: {
                [Op.like]: `%${search}%`,
              },
            }
          : undefined,
      },
      {
        model: User,
        as: "professor",
        required: false,
        attributes: { exclude: ["passwordHash"] },
        where: search
          ? {
              username: {
                [Op.like]: `%${search}%`,
              },
            }
          : undefined,
      },
    ];

    const { count, rows: lectures } = await this.lectureModel.findAndCountAll({
      offset,
      limit,
      include: includeModels,
    });

    console.log(lectures);

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

    return { lectures, pagination };
  }

  async getLectureById(id: string) {
    const lecture = await this.lectureModel.findByPk(id, {
      include: [
        {
          model: Course,
          as: "course",
        },
        {
          model: User,
          as: "professor",
          attributes: { exclude: ["passwordHash"] },
        },
        {
          model: Hall,
          as: "hall",
        },
      ],
    });

    if (!lecture) {
      throw new Error("Lecture not found");
    }

    return lecture;
  }

  async updateLecture(id: string, database: lectureType) {
    const [course, professor, hall, lecture] = await Promise.all([
      database.courseId ? Course.findByPk(database.courseId) : null,
      database.professorId ? User.findByPk(database.professorId) : null,
      database.hallId ? Hall.findByPk(database.hallId) : null,
      Lecture.findByPk(id),
    ]);

    if (!lecture) throw new Error("Lecture not found");
    if (database.courseId && !course) throw new Error("Course not found");
    if (database.professorId && (!professor || professor.role !== "Professor"))
      throw new Error("Professor not found");
    if (database.hallId && !hall) throw new Error("Hall not found");

    if (database.dayOfWeek || database.startTime || database.endTime) {
      const isTimeConflict = await this.lectureModel.findOne({
        where: {
          id: {
            [Op.ne]: id,
          },
          dayOfWeek: database.dayOfWeek || lecture.dayOfWeek,
          hallId: database.hallId || lecture.hallId,
          [Op.or]: [
            {
              startTime: {
                [Op.between]: [
                  database.startTime || lecture.startTime,
                  database.endTime || lecture.endTime,
                ],
              },
            },
            {
              endTime: {
                [Op.between]: [
                  database.startTime || lecture.startTime,
                  database.endTime || lecture.endTime,
                ],
              },
            },
            {
              [Op.and]: [
                {
                  startTime: {
                    [Op.lte]: database.startTime || lecture.startTime,
                  },
                },
                {
                  endTime: {
                    [Op.gte]: database.endTime || lecture.endTime,
                  },
                },
              ],
            },
          ],
        },
      });
      if (isTimeConflict) {
        throw new Error("Lecture already exists at this time");
      }
    }

    lecture.courseId = database.courseId || lecture.courseId;
    lecture.professorId = database.professorId || lecture.professorId;
    lecture.hallId = database.hallId || lecture.hallId;
    lecture.dayOfWeek = database.dayOfWeek || lecture.dayOfWeek;
    lecture.startTime = database.startTime || lecture.startTime;
    lecture.endTime = database.endTime || lecture.endTime;
    lecture.recurrencePattern =
      database.recurrencePattern || lecture.recurrencePattern;
    lecture.recurrenceEndDate =
      database.recurrenceEndDate || lecture.recurrenceEndDate;

    await lecture.save();
    return lecture;
  }

  async deleteLecture(id: string) {
    const lecture = await this.lectureModel.findByPk(id);

    if (!lecture) {
      throw new Error("Lecture not found");
    }

    await lecture.destroy();
  }

  async getAttendanceByLecture(
    lectureId: string,
    offset: number,
    limit: number
  ) {
    const { count, rows: attendance } = await Attendance.findAndCountAll({
      offset,
      limit,
      where: {
        lectureId,
      },
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

    return { attendance, pagination };
  }

  async archiveLecture(lectureId: string) {
    const lecture = await this.lectureModel.findByPk(lectureId);

    if (!lecture) {
      throw new Error("Lecture not found");
    }

    const archivedLecture = await LectureHistory.create({
      ...lecture.toJSON(),
      id: uuid(),
      lectureId: lecture.id,
      action: "Archived",
    });

    await lecture.destroy();
    return archivedLecture;
  }

  async getLectureHistory(lectureId: string) {
    const lectureHistory = await LectureHistory.findAll({
      where: {
        lectureId,
      },
    });

    return lectureHistory;
  }
}
