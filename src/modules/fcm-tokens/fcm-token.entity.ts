import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity('fcm_tokens')
export class FcmToken extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fcmToken: string;

    @Column()
    lastLoginTime: Date;

    @ManyToOne(type => User)
    user: User;

}