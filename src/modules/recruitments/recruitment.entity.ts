import { PriceRange } from "src/modules/recruitments/constants/price-range.enum";
import { ReviewStatus } from "src/modules/recruitments/constants/review-status.enum";
import { SupportMethod } from "src/modules/recruitments/constants/support-method.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { RecruiterProfile } from "../recruiter-profiles/recruiter-profile.entity";
import { randomUUID } from "crypto";

@Entity('recruitments')
export class Recruitment extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

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
        enum: SupportMethod,
        nullable: true,
    })
    supportMethodB: SupportMethod;

    @Column({
        type: "enum",
        enum: PriceRange,
        nullable: true
    })
    priceRangeType: PriceRange;

    @Column({
        nullable: true
    })
    price: number;

    @Column()
    deadline: Date;

    @CreateDateColumn()
    createdAt: Date;

    @Column({
        type: "enum",
        enum: ReviewStatus,
        default: ReviewStatus.WAITING,
    })
    reviewStatus: ReviewStatus;

    @Column({
        type: "text",
        nullable: true
    })
    review: string;

    @ManyToOne(type => RecruiterProfile, {
        lazy:true
    })
    recruiterProfile?: RecruiterProfile | Promise<RecruiterProfile>;

}