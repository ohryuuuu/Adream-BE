import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FcmToken } from "../fcm-tokens/fcm-token.entity";

@Entity('alarms')
export class Alarms extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    type: string;

    @Column()
    createdAt: Date;

    @ManyToOne(type => FcmToken)
    fcmToken: FcmToken;
    
}