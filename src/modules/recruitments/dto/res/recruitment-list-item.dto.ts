import { AnotherSupport } from "../../enums/another-support.enum";
import { PriceRange } from "../../enums/price-range.enum";
import { Recruitment } from "../../recruitment.entity";


export class RecruitmentListItemDto {
    id: number;
    title: string;
    description : string;
    priceRange: PriceRange;
    price: number;
    deadline: Date;
    createdAt: Date;
    anotherSupport: AnotherSupport;
    businessName: string;
    applicationCnt:number;
    viewCnt:number;
    preferCategoryNames: string[];

    constructor(recruitment:Recruitment) {
        this.id = recruitment.id;
        this.title = recruitment.title;
        this.anotherSupport = recruitment.anotherSupport;
        this.priceRange = recruitment.priceRange;
        this.price = recruitment.price;
        this.deadline = recruitment.deadline;
        this.createdAt = recruitment.createdAt;
        this.applicationCnt = recruitment.applicationCnt;
        this.preferCategoryNames = recruitment.preferCategories?.map((category) => category.name);
        this.viewCnt = recruitment.viewCnt;
        this.businessName = recruitment.recruiterProfile.business.name;
    }

}
