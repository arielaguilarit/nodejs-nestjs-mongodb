import { HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService  } from "./cron.service";
import { CronController } from './cron.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CronSchema } from './schemas/cron.schema';

@Module({
    imports:[
        ScheduleModule.forRoot(),
        HttpModule,
        MongooseModule.forFeature([
            { name: "Cron", schema: CronSchema }
        ]) 
    ],
    providers: [CronService],
    controllers: [CronController],
})
export class CronModule {}
