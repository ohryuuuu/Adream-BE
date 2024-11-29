import { Module } from '@nestjs/common';
import { SocialPlatformsService } from './social-platforms.service';
import { YoutubeService } from './youtube.service';
import { InstagramService } from './instagram.service';

@Module({
  providers: [SocialPlatformsService, YoutubeService, InstagramService],
  exports:[SocialPlatformsService, YoutubeService, InstagramService],
})
export class SocialPlatformsModule {}
