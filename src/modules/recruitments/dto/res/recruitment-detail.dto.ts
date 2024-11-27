import { SupportMethod } from "../../constants/support-method.enum";
import { PriceRange } from "../../constants/price-range.enum";
import { ReviewStatus } from "../../constants/review-status.enum";
import { RecruiterProfileDto } from "./recruiter-profile.dto";
import { Recruitment } from "../../recruitment.entity";
import { User } from "src/modules/users/user.entity";
import { RecruiterProfile } from "src/modules/recruiter-profiles/recruiter-profile.entity";
import { AdminReview } from "../../children-entities/review.entity";


export class RecruitmentDetailDto {
    id: number;
    title: string;
    description : string;
    priceRangeType: PriceRange;
    price: number;
    deadline: Date;
    createdAt: Date;
    reviewStatus: ReviewStatus;
    author: string;
    supportMethods: SupportMethod[];
    review: AdminReview;
    recruiterProfile: RecruiterProfileDto;

    constructor(recruitment:Recruitment) {
        this.id = recruitment.id;
        this.title = recruitment.title;
        this.description = recruitment.description;
        this.supportMethods = [recruitment.supportMethodA, recruitment.supportMethodB]?.map((d) => (d));
        this.priceRangeType = recruitment.priceRangeType;
        this.price = recruitment.price;
        this.deadline = recruitment.deadline;
        this.createdAt = recruitment.createdAt;
        this.review = recruitment.review;
    }

    setAuthor(user: User) {
        this.author = user.name;
    }

    setRecruiterProfile(recruiterProfile : RecruiterProfile) {
        this.recruiterProfile = new RecruiterProfileDto(recruiterProfile);
    }



}
