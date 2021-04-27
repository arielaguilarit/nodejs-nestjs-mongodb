import { HttpService, Controller, Get, Res, HttpStatus, Put, Body, Param } from '@nestjs/common';
import { CronDto } from "./dto/cron.dto";
import { CronService } from "./cron.service";
import { NotFoundException } from '@nestjs/common';

@Controller('cron')
export class CronController {
    constructor(private httpService: HttpService, private cronService: CronService) { }

    @Get()
    async findHits(): Promise<CronDto[]> {
        const response = await this.httpService.get('http://hn.algolia.com/api/v1/search_by_date?query=nodejs').toPromise();
        const cronDtos1: CronDto[] = response.data.hits;
        const cronDtos2: CronDto[] = await this.getCrons();
        const cronDtos3 = [];
        for (var cron2 in cronDtos2) {
            var rebeldes = cronDtos1.filter((cron1) => {
                return cron1.objectID != cronDtos2[cron2].objectID;
            });
        }
        rebeldes.map((rebel) => {
            console.log(rebel.objectID);
        });
        return await this.setCrons(rebeldes);
    }

    @Get('all')
    async getAll(@Res() res): Promise<CronDto[]> {
        let crons = await this.getCrons();
        let crons1 = crons.filter((cron) => {
            return cron.status_story == null;
        });
        crons1 = crons.filter((cron) => {
            return cron.title != null || cron.story_title != null;
        });
        console.log(crons1.length);
        if (!crons1) throw new NotFoundException("Nor found!.")
        return res.status(HttpStatus.OK).json(crons1.sort());
    }

    @Put(':id')
    async putCron(@Res() res, @Param('id') id:string ): Promise<CronDto[]> {
        const cron = await this.cronService.putCron(id);
        if (!cron) throw new NotFoundException("Not Found!");
        return res.status(HttpStatus.OK).json(cron);
    }

    async getCrons(): Promise<CronDto[]> {
        const crons = await this.cronService.getCrons();
        return crons;
    }

    async setCrons(cronDtos: CronDto[]): Promise<CronDto[]> {
        const crons = await this.cronService.setCrons(cronDtos);
        return crons;
    }



}
