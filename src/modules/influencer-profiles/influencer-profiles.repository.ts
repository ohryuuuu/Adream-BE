import { CustomRepository } from "src/config/typeorm/typeorm-ex.decorator";
import { InfluencerProfile } from "./influencer-profile.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { SocialPlatform } from "./constants/social-platform.enum";
import { VerifyStatus } from "./constants/verify-status.enum";

@CustomRepository(InfluencerProfile)
export class InfluencerProfileRepository extends Repository<InfluencerProfile> {

    async findByUserId(userId: string) {
        return await this.findBy({
            user : {
                id : userId
            }
        });
    }

    async getOneById(id:string) {
        const influencerProfiile = await this.findOneBy({
            id
        });
        if(!influencerProfiile) throw new NotFoundException();
        return influencerProfiile;
    }


    async findSameOneInMyInfluencerProfiles(platform : SocialPlatform, tagId : string, userId: string) {
        return await this.findOneBy({
            platform,
            tagId,
            user : {
                id : userId
            }
        });
    }
    

    async updateVerifyStatus(id:string, verifyStatus: VerifyStatus) {
        await this.update(id, {
            verifyStatus
        });
    }

}