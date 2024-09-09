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
import { HallService } from './hall.service';
import { Roles } from 'src/auth/roles.decorator';
import { CreateHallDTO } from './dto/create-hall.dto';
import { UpdateHallDTO } from './dto/update-hall.dto';

@Controller('api/v1/halls')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class HallController {
  constructor(private readonly hallService: HallService) {}

  @Post('/')
  @Roles('Admin', 'Staff')
  createHall(@Body() createHallDto: CreateHallDTO) {
    return this.hallService.createHall(createHallDto);
  }

  @Get()
  getAllHalls(
    @Query('search') search: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.hallService.getAllHalls(search, limit, offset);
  }

  @Get(':hallId')
  getHall(@Param('hallId') hallId: string) {
    return this.hallService.getHallById(hallId);
  }

  @Get(':hallId/lectures')
  getHallLectures(@Param('hallId') hallId: string) {
    return this.hallService.getHallLectures(hallId);
  }

  @Put(':hallId')
  @Roles('Admin', 'Staff')
  updateHall(
    @Param('hallId') hallId: string,
    @Body() updateHallDto: UpdateHallDTO,
  ) {
    return this.hallService.updateHall(hallId, updateHallDto);
  }

  @Delete(':hallId')
  @Roles('Admin', 'Staff')
  deleteHall(@Param('hallId') hallId: string) {
    return this.hallService.deleteHall(hallId);
  }
}
