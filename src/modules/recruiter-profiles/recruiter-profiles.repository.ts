import { CustomRepository } from "src/config/typeorm/typeorm-ex.decorator";
import { RecruiterProfile } from "./recruiter-profile.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

@CustomRepository(RecruiterProfile)
export class RecruiterProfilesRepository extends Repository<RecruiterProfile> {
    
    async findByUserId(userId: string) {
        return await this.findBy({
            user : {
                id : userId
            }
        })
    }

    async getOneById(id: string) {
        const recruiterProfile = await this.findOneBy({
           id
        });
        if(!recruiterProfile) throw new NotFoundException();
        return recruiterProfile;
    }

}