import { PriceRange } from "src/modules/recruitments/constants/price-range.enum";
import { RecruitmentStatus } from "src/modules/recruitments/constants/recruitment-status.enum";
import { SupportMethod } from "src/modules/recruitments/constants/support-method.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('recruitments')
export class Recruitment extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "enum",
        enum: RecruitmentStatus
    })
    status: RecruitmentStatus;

    @Column()
    title: string;

    @Column({
        type: "text"
    })
    description : string;

    @Column({
        type: "enum",
        enum: SupportMethod
    })
    supportMethodA: SupportMethod;

    @Column({
        type: "enum",
        enum: SupportMethod
    })
    supportMethodB: SupportMethod;

    @Column({
        type: "enum",
        enum: PriceRange,
    })
    priceRangeType: PriceRange

    @Column()
    price: number;

    @Column()
    deadline: Date;

    @CreateDateColumn()
    createdAt: Date;

    @Column({
        type: "text"
    })
    rejectReason: string;
}