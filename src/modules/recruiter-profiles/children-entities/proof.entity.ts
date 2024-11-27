import { Column } from "typeorm";

export class Proof {
    @Column()
    way: string; //신분증(대표의경우), 재직증명서(직원의경우)

    @Column()
    img: string; //증명서가 찍힌 사진 이미지
}
