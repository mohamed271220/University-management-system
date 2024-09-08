import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { DepartmentYearCoursesService } from './department-year-courses.service';
import { Roles } from 'src/auth/roles.decorator';
import { CreateDepartmentYearCourseDto } from './dto/create-department-year-courses.dto';
import { UpdateDepartmentYearCourseDto } from './dto/update-department-year-courses.dto';

@Controller('api/v1/department-year-courses')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DepartmentYearCoursesController {
  constructor(
    private readonly departmentYearCoursesService: DepartmentYearCoursesService,
  ) {}

  // add course to department specific year
  @Post('/')
  @Roles('Admin')
  createDepartmentYearCourses(
    @Body() createDepartmentYearCoursesDto: CreateDepartmentYearCourseDto,
  ) {
    return this.departmentYearCoursesService.createDepartmentYearCourses(
      createDepartmentYearCoursesDto,
    );
  }

  // get all courses for a department specific year
  @Get('/')
  getAllDepartmentYearCourses() {
    return this.departmentYearCoursesService.getAllDepartmentYearCourses();
  }

  // edit course for a department specific year
  @Put(':departmentYearCourseId')
  @Roles('Admin')
  updateDepartmentYearCourses(
    @Param('departmentYearCourseId') departmentYearCourseId: string,
    @Body() updateDepartmentYearCoursesDto: UpdateDepartmentYearCourseDto,
  ) {
    return this.departmentYearCoursesService.updateDepartmentYearCourses(
      departmentYearCourseId,
      updateDepartmentYearCoursesDto,
    );
  }

  // delete course for a department specific year
  @Delete(':departmentYearCourseId')
  @Roles('Admin')
  deleteDepartmentYearCourses(
    @Param('departmentYearCourseId') departmentYearCourseId: string,
  ) {
    return this.departmentYearCoursesService.deleteDepartmentYearCourses(
      departmentYearCourseId,
    );
  }
}
