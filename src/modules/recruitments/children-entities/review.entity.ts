import { Column } from "typeorm";
import { ReviewStatus } from "../constants/review-status.enum";

export class AdminReview {
    @Column({
        type: "enum",
        enum: ReviewStatus,
        default: ReviewStatus.WAITING,
    })
    status: ReviewStatus;

    @Column({
        type: "text",
        nullable: true
    })
    content: string;
}