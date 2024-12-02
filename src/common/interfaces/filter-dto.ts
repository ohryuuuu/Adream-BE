import { FindOptionsOrder, FindOptionsWhere } from "typeorm";

export interface FilterDto<T> {
    getWhere() : FindOptionsWhere<T>,
    getOrder() : FindOptionsOrder<T>,
}