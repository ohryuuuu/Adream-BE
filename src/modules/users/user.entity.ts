import { UserType } from "src/modules/users/enums/user-type.enum";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as crypto from 'crypto';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column()
    name : string;

    @Column({
        nullable: true,
    })
    phoneNumber: string;

    @Column()
    private password: string;

    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.GENERAL
    })
    type: UserType;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;


    isPasswordCorrect(password: string): boolean {
        const hash = this.hashPassword(password);
        return hash === this.password;
    }

    setPassword(password:string) {
        const hashedPassword = this.hashPassword(password);
        this.password = hashedPassword;
    }

    private hashPassword(password: string): string {
        const hash = crypto.createHmac('sha256', process.env['CRYPTO_SECRETKEY'])
        .update(password)
        .digest('hex');
        return hash;
    }

}