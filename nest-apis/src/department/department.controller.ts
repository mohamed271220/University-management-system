import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { DepartmentService } from './department.service';
import { Roles } from 'src/auth/roles.decorator';
import { CreateDepartmentDTO } from './dto/create-department.dto';
import { UpdateDepartmentDTO } from './dto/update-department.dto';

@Controller('api/v1/departments')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  // Add CRUD operations here
  @Post('/')
  @Roles('Admin')
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDTO) {
    return this.departmentService.createDepartment(createDepartmentDto);
  }

  @Get('/')
  getAllDepartments(
    @Query('search') search: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.departmentService.getAllDepartments(search, limit, offset);
  }

  @Get(':departmentId')
  getDepartment(@Param('departmentId') departmentId: string) {
    return this.departmentService.getDepartment(departmentId);
  }

  @Get(':departmentId/courses')
  getDepartmentCourses(@Param('departmentId') departmentId: string) {
    return this.departmentService.getDepartmentCourses(departmentId);
  }

  @Get(':departmentId/halls')
  getDepartmentHalls(@Param('departmentId') departmentId: string) {
    return this.departmentService.getDepartmentHalls(departmentId);
  }

  @Put(':departmentId')
  @Roles('Admin')
  updateDepartment(
    @Param('departmentId') departmentId: string,
    @Body() updateDepartmentDto: UpdateDepartmentDTO,
  ) {
    return this.departmentService.updateDepartment(
      departmentId,
      updateDepartmentDto,
    );
  }

  @Delete(':departmentId')
  @Roles('Admin')
  deleteDepartment(@Param('departmentId') departmentId: string) {
    return this.departmentService.deleteDepartment(departmentId);
  }
}
