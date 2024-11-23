import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/modules/users/user.entity";
import { BusinessType } from "./constants/business-type.enum";

@Entity('recruiter_profiles')
export class RecruiterProfile extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    contactEmail: string;

    @Column({
        type: "enum",
        enum: BusinessType
    })
    businessType: BusinessType; //개인, 법인

    @Column()
    businessNumber: string; //사업자등록번호

    @Column()
    businessName: string; //상호명

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




}