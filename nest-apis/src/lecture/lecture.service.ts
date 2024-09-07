import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Lecture } from './lecture.entity';
import { User } from 'src/user/user.entity';
import { Attendance } from 'src/entities/attendance.entity';
import { LectureHistory } from 'src/entities/lecture-history.entity';
import { CreateLectureDTO } from './dto/create-lecture.dto';
import { Course } from 'src/course/course.entity';
import { Hall } from 'src/hall/hall.entity';
import { v4 as uuid } from 'uuid';
import { Op } from 'sequelize';
import { UpdateLectureDTO } from './dto/update-lecture.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class LectureService {
  constructor(
    @InjectModel(Lecture)
    private readonly lectureModel: typeof Lecture,
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Attendance)
    private readonly attendanceModel: typeof Attendance,
    @InjectModel(LectureHistory)
    private readonly lectureHistoryModel: typeof LectureHistory,
    @InjectModel(Course)
    private readonly courseModel: typeof Course,
    @InjectModel(Hall)
    private readonly hallModel: typeof Hall,
  ) {}

  async createLecture(createLectureDto: CreateLectureDTO): Promise<Lecture> {
    const { professorId, courseId, hallId, ...lectureData } = createLectureDto;

    const [professor, course, hall] = await Promise.all([
      this.userModel.findByPk(professorId),
      this.courseModel.findByPk(courseId),
      this.hallModel.findByPk(hallId),
    ]);

    // const professor = await this.userModel.findByPk(professorId);
    if (!professor || professor.role !== 'Professor') {
      throw new NotFoundException('Professor not found');
    }

    // const course = await this.courseModel.findByPk(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // const hall = await this.hallModel.findByPk(hallId);
    if (!hall) {
      throw new NotFoundException('Hall not found');
    }

    const isTimeValid = await this.lectureModel.findOne({
      where: {
        hallId: hallId, // Ensuring we are checking within the same hall
        dayOfWeek: lectureData.dayOfWeek,
        [Op.or]: [
          // Check if the lecture starts or ends between the existing lecture's start and end time
          {
            startTime: {
              [Op.between]: [lectureData.startTime, lectureData.endTime],
            },
          },
          {
            endTime: {
              [Op.between]: [lectureData.startTime, lectureData.endTime],
            },
          },
          // or if the new lecture's start and end time is between the
          // existing lecture's start and end time
          {
            [Op.and]: [
              {
                startTime: {
                  [Op.lte]: lectureData.startTime,
                },
              },
              {
                endTime: {
                  [Op.gte]: lectureData.endTime,
                },
              },
            ],
          },
        ],
      },
    });

    if (isTimeValid) {
      throw new BadRequestException(
        'Lecture time is overlapping with another lecture',
      );
    }

    return this.lectureModel.create({
      id: uuid(),
      ...lectureData,
      professorId,
      courseId,
      hallId,
    });
  }

  async getAllLectures(
    search: string = '',
    limit: number = 10,
    offset: number = 0,
  ): Promise<{ lectures: Lecture[]; pagination: any }> {
    const includeModels: any[] = [
      {
        model: this.courseModel,
        as: 'course',
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
        model: this.hallModel,
        as: 'hall',
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
        model: this.userModel,
        as: 'professor',
        required: false,
        attributes: { exclude: ['passwordHash'] },
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
      raw: true,
      nest: true,
      offset,
      limit,
      include: includeModels,
    });

    // console.log(lectures);

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

  async getLectureById(id: string): Promise<Lecture> {
    return this.lectureModel.findByPk(id, {
      raw: true,
      nest: true,
      include: [
        {
          model: this.courseModel,
          as: 'course',
        },
        {
          model: this.hallModel,
          as: 'hall',
        },
        {
          model: this.userModel,
          as: 'professor',
          attributes: { exclude: ['passwordHash'] },
        },
      ],
    });
  }

  async getLectureAttendance(lectureId: string) {
    const lecture = await this.lectureModel.findByPk(lectureId);
    if (!lecture) {
      throw new NotFoundException('Lecture not found');
    }

    return this.attendanceModel.findAll({
      where: { lectureId },
    });
  }

  async getLectureArchived(lectureId: string) {
    const lecture = await this.lectureModel.findByPk(lectureId);
    if (!lecture) {
      throw new NotFoundException('Lecture not found');
    }

    return this.lectureHistoryModel.findAll({
      where: { lectureId },
    });
  }

  async updateLecture(lectureId: string, updateLectureDto: UpdateLectureDTO) {
    const [course, professor, hall, lecture] = await Promise.all([
      updateLectureDto.courseId
        ? this.courseModel.findByPk(updateLectureDto.courseId)
        : null,
      updateLectureDto.professorId
        ? this.userModel.findByPk(updateLectureDto.professorId)
        : null,
      updateLectureDto.hallId ? Hall.findByPk(updateLectureDto.hallId) : null,
      this.lectureModel.findByPk(lectureId),
    ]);

    if (!lecture) throw new NotFoundException('Lecture not found');
    if (updateLectureDto.courseId && !course)
      throw new NotFoundException('Course not found');
    if (
      updateLectureDto.professorId &&
      (!professor || professor.role !== 'Professor')
    )
      throw new NotFoundException('Professor not found');
    if (updateLectureDto.hallId && !hall)
      throw new NotFoundException('Hall not found');

    if (
      updateLectureDto.dayOfWeek ||
      updateLectureDto.startTime ||
      updateLectureDto.endTime
    ) {
      const isTimeConflict = await this.lectureModel.findOne({
        where: {
          id: {
            [Op.ne]: lectureId,
          },
          dayOfWeek: updateLectureDto.dayOfWeek || lecture.dayOfWeek,
          hallId: updateLectureDto.hallId || lecture.hallId,
          [Op.or]: [
            {
              startTime: {
                [Op.between]: [
                  updateLectureDto.startTime || lecture.startTime,
                  updateLectureDto.endTime || lecture.endTime,
                ],
              },
            },
            {
              endTime: {
                [Op.between]: [
                  updateLectureDto.startTime || lecture.startTime,
                  updateLectureDto.endTime || lecture.endTime,
                ],
              },
            },
            {
              [Op.and]: [
                {
                  startTime: {
                    [Op.lte]: updateLectureDto.startTime || lecture.startTime,
                  },
                },
                {
                  endTime: {
                    [Op.gte]: updateLectureDto.endTime || lecture.endTime,
                  },
                },
              ],
            },
          ],
        },
      });
      if (isTimeConflict) {
        throw new BadRequestException(
          'Lecture time is overlapping with another lecture',
        );
      }
    }

    lecture.courseId = updateLectureDto.courseId || lecture.courseId;
    lecture.professorId = updateLectureDto.professorId || lecture.professorId;
    lecture.hallId = updateLectureDto.hallId || lecture.hallId;
    lecture.dayOfWeek = updateLectureDto.dayOfWeek || lecture.dayOfWeek;
    lecture.startTime = updateLectureDto.startTime || lecture.startTime;
    lecture.endTime = updateLectureDto.endTime || lecture.endTime;
    lecture.recurrencePattern =
      updateLectureDto.recurrencePattern || lecture.recurrencePattern;
    lecture.recurrenceEndDate =
      updateLectureDto.recurrenceEndDate || lecture.recurrenceEndDate;

    await lecture.save();
    return lecture;
  }

  async deleteLecture(lectureId: string) {
    const lecture = await this.lectureModel.findByPk(lectureId);
    if (!lecture) {
      throw new NotFoundException('Lecture not found');
    }

    await lecture.destroy();
    return lecture;
  }

  //   async archiveLecture(lectureId: string) {
  //     const lecture = await this.lectureModel.findByPk(lectureId);

  //     if (!lecture) {
  //       throw new NotFoundException('Lecture not found');
  //     }

  //     const archivedLecture = await this.lectureHistoryModel.create({
  //       ...lecture.toJSON(),
  //       id: uuid(),
  //       lectureId: lecture.id,
  //       action: 'Archived',
  //     });

  //     await lecture.destroy();
  //     return archivedLecture;
  //   }
}
