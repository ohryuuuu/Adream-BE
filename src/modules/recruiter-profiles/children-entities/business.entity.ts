import { Column } from "typeorm";
import { BusinessType } from "../constants/business-type.enum";

export class Business {
    @Column()
    number: string;

    @Column()
    name: string;

    @Column()
    startDate: string; //yyyymmdd

    @Column()
    representativeName: string;

    @Column()
    type: BusinessType;
}