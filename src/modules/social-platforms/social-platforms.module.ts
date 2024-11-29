import { Module } from '@nestjs/common';
import { SocialPlatformsService } from './social-platforms.service';
import { YoutubeService } from './youtube.service';
import { InstagramService } from './instagram.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports : [CacheModule.register()],
  providers: [SocialPlatformsService, YoutubeService, InstagramService],
  exports:[SocialPlatformsService, YoutubeService, InstagramService],
})
export class SocialPlatformsModule {}
