import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/modules/users/user.entity";
import { BusinessType } from "./constants/business-type.enum";
import { NotOwnProfileException } from "./exceptions/not-own-profile.exception";


class Business {
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

@Entity('recruiter_profiles')
export class RecruiterProfile extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    contactEmail: string;

    @Column(() => Business)
    business: Business;

    @Column()
    proofWay: string; //신분증(대표의경우), 재직증명서(직원의경우)

    @Column()
    proofImg: string; //증명서가 찍힌 사진 이미지

    @Column()
    expirationAt: Date; //만료일

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(type => User, {
        lazy: true,
    })
    user?: User | Promise<User>;


    async checkOwnProfile(user: User) : Promise<void> {
        const userId = (await this?.user)?.id;
        if(user.id !== userId) throw new NotOwnProfileException();
    }
}