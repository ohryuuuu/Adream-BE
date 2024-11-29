import { Injectable } from "@nestjs/common";
import { SocialPlatformService } from "./interfaces/social-platform-service.interface";
import { SocialProfilePayload } from "./interfaces/social-profile-payload.interface";
import { Builder } from "builder-pattern";


@Injectable()
export class InstagramService implements SocialPlatformService {

    readonly API_KEY = "";

    async findProfileByTagId(tagId:string) : Promise<SocialProfilePayload> {
        const socialProfilePayload = Builder<SocialProfilePayload>()
        .build();
        return socialProfilePayload;
    }
}