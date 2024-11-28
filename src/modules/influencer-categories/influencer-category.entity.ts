import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { InfluencerProfile } from "../influencer-profiles/influencer-profile.entity";

@Entity('influencer_categories')
export class InfluencerCategory extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column()
    img: string;

    @Column({
        nullable: true
    })
    description: string;

    @ManyToMany(() => InfluencerProfile, influencerProfile => influencerProfile.categories)
    influencerProfiles : InfluencerProfile[];
    
}
