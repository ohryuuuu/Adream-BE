import { CustomRepository } from "src/config/typeorm/typeorm-ex.decorator";
import { Recruitment } from "./recruitment.entity";
import { Repository } from "typeorm";


@CustomRepository(Recruitment)
export class RecruitmentsRepository extends Repository<Recruitment> {


}