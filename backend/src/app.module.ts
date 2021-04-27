import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CronModule } from './cron/cron.module';


@Module({
  imports: [ 
    MongooseModule.forRoot('mongodb://localhost/cron'), CronModule, 
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
