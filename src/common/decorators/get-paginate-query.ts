import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { PaginateQueryDto } from "../dto/req/paginate-query.dto";
import { PaginationDefault } from "../enums/pagenation-default.enum";

export const GetPaginateQuery = createParamDecorator(
    (_data: any, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      const page = Number(request.query?.page) || PaginationDefault.PAGE_DEFAULT;
      const take = Number(request.query?.take) || PaginationDefault.TAKE_DEFAULT;
  
      const pagenationRequest: PaginateQueryDto = {
        page: page,
        take: take,
        getSkip: () => {
          return (page - 1) * take;
        },
      };
  
      return pagenationRequest;
    },
  );