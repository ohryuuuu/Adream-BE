import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recruitment } from "../recruitments/recruitment.entity";
import { InfluencerProfile } from "../influencer-profiles/influencer-profile.entity";


@Entity('applications')
export class Application extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "text"
    })
    appeal: string;

    @ManyToOne(type => Recruitment)
    recruitment: Recruitment;

    @ManyToOne(type => InfluencerProfile)
    influencerProfile: InfluencerProfile;

    @CreateDateColumn()
    createdAt: Date;

}