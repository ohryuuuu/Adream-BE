import { Module } from '@nestjs/common';
import { SocialPlatformsService } from './social-platforms.service';

@Module({
  providers: [SocialPlatformsService]
})
export class SocialPlatformsModule {}
