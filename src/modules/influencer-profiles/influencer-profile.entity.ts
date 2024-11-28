import { User } from "src/modules/users/user.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { InfluencerCategory } from "../influencer-categories/influencer-category.entity";
import { ProfileIsNotOwnException } from "./exceptions/profile-is-not-own.exception";
import { VerifyStatus } from "./constants/verify-status.enum";
import { SocialPlatform } from "../social-platforms/constant/social-platform.enum";


@Entity('influencer_profiles')
export class InfluencerProfile extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    tagId: string;

    @Column({
        default:0
    })
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

    @Column({
        type:"enum",
        enum : VerifyStatus
    })
    verifyStatus : VerifyStatus = VerifyStatus.BEFORE;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(type => User, {
        lazy: true
    })
    user: User | Promise<User>;

    @ManyToMany(type => InfluencerCategory, d => d.influencerProfiles, {
        eager:true,
    })
    @JoinTable()
    categories: InfluencerCategory[];


    async checkOwnProfile(userId: string) : Promise<void> {
        const userId_ = (await this?.user)?.id;
        if(userId_ !== userId) throw new ProfileIsNotOwnException();
    }

}