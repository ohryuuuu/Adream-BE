import { CustomRepository } from "src/config/typeorm/typeorm-ex.decorator";
import { Application } from "./application.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";


@CustomRepository(Application)
export class ApplicationsRepository extends Repository<Application> {
    
    async getOneById(id:string) {
        const application = await this.findOneBy({
            id
        });
        if(!application) throw new NotFoundException();
        return application;
    }



}