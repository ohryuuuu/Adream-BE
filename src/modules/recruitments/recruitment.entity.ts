import { PriceRange } from "src/modules/recruitments/enums/price-range.enum";
import { AnotherSupport } from "src/modules/recruitments/enums/another-support.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RecruiterProfile } from "../recruiter-profiles/recruiter-profile.entity";
import { AdminReview } from "./children-entities/review.entity";
import { InfluencerCategory } from "../influencer-categories/influencer-category.entity";

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
        enum: AnotherSupport
    })
    anotherSupport: AnotherSupport;

    @Column({
        type: "enum",
        enum: PriceRange,
        nullable: true
    })
    priceRange: PriceRange;

    @Column({
        nullable: true
    })
    price: number;

    @Column()
    deadline: Date;

    @CreateDateColumn()
    createdAt: Date;

    @Column(() => AdminReview)
    review : AdminReview;

    @ManyToOne(type => RecruiterProfile, {
        eager:true,
    })
    @JoinColumn()
    recruiterProfile?: RecruiterProfile;

    @ManyToMany(() => InfluencerCategory, {
        eager: true
    })
    @JoinTable()
    preferCategories : InfluencerCategory[];

    @Column({
        default: 0
    })
    applicationCnt:number;

    @Column({
        default: 0
    })
    viewCnt:number;

}