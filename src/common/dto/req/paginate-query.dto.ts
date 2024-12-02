import { IsNumber, IsOptional } from "class-validator";
import { PaginationDefault } from "src/common/enums/pagenation-default.enum";

export class PaginateQueryDto {

    @IsOptional()
    @IsNumber()
    page?: number = PaginationDefault.PAGE_DEFAULT;
    
    @IsOptional()
    @IsNumber()
    take?: number = PaginationDefault.TAKE_DEFAULT;
  
    getSkip() {
      return (this.page - 1) * this.take || PaginationDefault.SKIP_DEFAULT;
    }

}