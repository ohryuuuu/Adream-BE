import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Alarms } from "src/modules/alarms/alarm.entity";
import { Application } from "src/modules/applications/application.entity";
import { FcmToken } from "src/modules/fcm-tokens/fcm-token.entity";
import { InfluencerCategory } from "src/modules/influencer-categories/influencer-category.entity";
import { InfluencerProfile } from "src/modules/influencer-profiles/influencer-profile.entity";
import { RecruiterProfile } from "src/modules/recruiter-profiles/recruiter-profile.entity";
import { Recruitment } from "src/modules/recruitments/recruitment.entity";
import { User } from "src/modules/users/user.entity";
import 'dotenv/config';

export const dbConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env['DB_HOST'],
    port: Number(process.env['DB_PORT'] ?? 3306),
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
    entities: [Alarms, Application, FcmToken, InfluencerCategory, InfluencerProfile, RecruiterProfile, Recruitment, User],// 설정 부분
    synchronize: true,
}