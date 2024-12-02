import { FilterDto } from "src/common/interfaces/filter-dto";
import { Recruitment } from "../../recruitment.entity";
import { FindOptionsOrder, FindOptionsWhere } from "typeorm";

export class SearchRecruitmentsDto implements FilterDto<Recruitment> {


    



    getWhere() {
        const where: FindOptionsWhere<Recruitment> = {};

        return where;
    }

    getOrder() {
        const order: FindOptionsOrder<Recruitment> = {};

        
        return order;
    }
}