import { CustomRepository } from "src/config/typeorm/typeorm-ex.decorator";
import { InfluencerProfile } from "./influencer-profile.entity";
import { Repository } from "typeorm";
import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { VerifyStatus } from "./enums/verify-status.enum";
import { SocialPlatform } from "../social-platforms/enums/social-platform.enum";


@CustomRepository(InfluencerProfile)
export class InfluencerProfilesRepository extends Repository<InfluencerProfile> {

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
        const result =  await this.update(id, {
            verifyStatus
        });
        if(!result.affected) new HttpException("", HttpStatus.NOT_MODIFIED);
    }




}