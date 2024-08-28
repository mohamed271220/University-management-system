import Grade from "../models/Grade";

export class GradeService {
  constructor(private gradeRepository: typeof Grade = Grade) {}
}
