import { UserType } from "src/modules/users/constants/user-type.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.GENERAL
    })
    type: UserType;

    @CreateDateColumn()
    createdAt : Date;

}