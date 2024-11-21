import { SocialPlatform } from "src/modules/influencer-profiles/constants/social-platform.enum";
import { User } from "src/modules/users/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { InfluencerCategory } from "../influencer-categories/influencer-category.entity";


@Entity('influencer_profiles')
export class InfluencerProfile extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    tagId: string;

    @Column()
    followerCnt: string;

    @Column({
        type: "enum",
        enum: SocialPlatform,
    })
    platform: SocialPlatform;

    @Column({
        nullable: true
    })
    contactEmail: string;

    @UpdateDateColumn()
    updateAt: Date;

    @ManyToOne(type => User)
    user: User;

    @ManyToMany(type => InfluencerCategory)
    categories: InfluencerCategory[];

}