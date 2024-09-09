import { HallService } from './hall.service';
import { CreateHallDTO } from './dto/create-hall.dto';
import { UpdateHallDTO } from './dto/update-hall.dto';
export declare class HallController {
    private readonly hallService;
    constructor(hallService: HallService);
    createHall(createHallDto: CreateHallDTO): Promise<import("./hall.entity").Hall>;
    getAllHalls(search: string, limit: number, offset: number): Promise<{
        halls: import("./hall.entity").Hall[];
        pagination: any;
    }>;
    getHall(hallId: string): Promise<import("./hall.entity").Hall>;
    getHallLectures(hallId: string): Promise<import("../lecture/lecture.entity").Lecture[]>;
    updateHall(hallId: string, updateHallDto: UpdateHallDTO): Promise<import("./hall.entity").Hall>;
    deleteHall(hallId: string): Promise<void>;
}
