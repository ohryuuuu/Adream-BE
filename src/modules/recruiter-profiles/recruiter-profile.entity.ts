import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/modules/users/user.entity";
import { Business } from "./children-entities/business.entity";
import { Proof } from "./children-entities/proof.entity";
import { ProfileIsNotOwnException } from "./exceptions/profile-is-now-own.exception";


@Entity('recruiter_profiles')
export class RecruiterProfile extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    contactEmail: string;

    @Column(() => Business)
    business: Business;

    @Column(() => Proof)
    proof : Proof;

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

    async checkOwnProfile(userId: string) : Promise<void> {
        const userId_ = (await this?.user)?.id;
        if(userId_ !== userId) throw new ProfileIsNotOwnException();
    }
}
