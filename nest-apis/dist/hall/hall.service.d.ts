import { Hall } from './hall.entity';
import { Department } from 'src/department/department.entity';
import { Lecture } from 'src/lecture/lecture.entity';
import { CreateHallDTO } from './dto/create-hall.dto';
import { UpdateHallDTO } from './dto/update-hall.dto';
export declare class HallService {
    private hallModel;
    private departmentModel;
    private lectureModel;
    constructor(hallModel: typeof Hall, departmentModel: typeof Department, lectureModel: typeof Lecture);
    createHall(createHallDto: CreateHallDTO): Promise<Hall>;
    getAllHalls(search?: string, limit?: number, offset?: number): Promise<{
        halls: Hall[];
        pagination: any;
    }>;
    getHallById(hallId: string): Promise<Hall>;
    getHallLectures(hallId: string): Promise<Lecture[]>;
    updateHall(hallId: string, updateHallDto: UpdateHallDTO): Promise<Hall>;
    deleteHall(hallId: string): Promise<void>;
}
