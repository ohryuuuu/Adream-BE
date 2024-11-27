import { BusinessType } from "src/modules/recruiter-profiles/constants/business-type.enum";
import { RecruiterProfile } from "src/modules/recruiter-profiles/recruiter-profile.entity";

export class RecruiterProfileDto {
    id:string;
    contactEmail:string;
    businessName:string;
    businessType : BusinessType;
    representativeName : string;

    constructor(recruiter : RecruiterProfile) {
        if(!recruiter) return;
        this.id = recruiter.id;
        this.contactEmail = recruiter.contactEmail;
        this.businessName = recruiter.business.name;
        this.businessType = recruiter.business.type;
        this.representativeName = recruiter.business.representativeName;
    }

}
