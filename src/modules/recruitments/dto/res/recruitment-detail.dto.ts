import { AnotherSupport } from "../../enums/another-support.enum";
import { PriceRange } from "../../enums/price-range.enum";
import { ReviewStatus } from "../../enums/review-status.enum";
import { Recruitment } from "../../recruitment.entity";
import { RecruiterProfile } from "src/modules/recruiter-profiles/recruiter-profile.entity";
import { AdminReview } from "../../children-entities/review.entity";
import { InfluencerCategory } from "src/modules/influencer-categories/influencer-category.entity";


export class RecruitmentDetailDto {
    id: number;
    title: string;
    description : string;
    priceRange: PriceRange;
    price: number;
    deadline: Date;
    createdAt: Date;
    reviewStatus: ReviewStatus;
    anotherSupport: AnotherSupport;
    review: AdminReview;
    recruiterProfile: RecruiterProfile;
    applicationCnt:number;
    viewCnt:number;
    preferCategories: InfluencerCategory[];

    constructor(recruitment:Recruitment) {
        this.id = recruitment.id;
        this.title = recruitment.title;
        this.description = recruitment.description;
        this.anotherSupport = recruitment.anotherSupport;
        this.priceRange = recruitment.priceRange;
        this.price = recruitment.price;
        this.deadline = recruitment.deadline;
        this.createdAt = recruitment.createdAt;
        this.review = recruitment.review;
        this.applicationCnt = recruitment.applicationCnt;
        this.preferCategories = recruitment.preferCategories;
        this.viewCnt = recruitment.viewCnt;
        this.recruiterProfile = this.recruiterProfile;
    }


}
