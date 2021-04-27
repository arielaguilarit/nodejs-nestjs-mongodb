import { HttpService, Injectable } from '@nestjs/common';
import { Cron } from "@nestjs/schedule";
import { CronDto } from "./dto/cron.dto";
import { CronInterface } from './interfaces/Cron.interface';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CronService {

    constructor(private httpService: HttpService, @InjectModel('Cron') private readonly cronModel: Model<CronInterface>) { }

    @Cron('60 * * * * *')
    handleCron() {
        console.log('Called when the current 1 hours');
        this.getHits();
    }

    async getHits() {
        const response = await this.httpService.get('http://hn.algolia.com/api/v1/search_by_date?query=nodejs').toPromise();
        let cronDtos1: CronDto[] = response.data.hits;
        const cronDtos2: CronDto[] = await this.getCrons();

        cronDtos2.map((cron) => {
            cronDtos1 = cronDtos1.filter((cron1) =>{
                return cron1.objectID != cron.objectID;
            });
        });

        await this.setCrons(cronDtos1);
        return cronDtos1;
    }

async setCrons(cronDtos: CronDto[]) {
    const response = await this.cronModel.insertMany(cronDtos);
    return response;
}

async getCrons() {
    const response = await this.cronModel.find({ status_story: null }).sort({ created_at: -1 });
    return response;
}

async putCron(id: string) {
    return await this.cronModel.findByIdAndUpdate(id, { status_story: true }, { new: true });
}
}



