import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    
}
