import { PaginateQueryDto } from "../req/paginate-query.dto";

export class PaginationDto<T> {
    data: T[];
    meta: {
      page: number;
      take: number;
      totalCount: number;
      totalPage: number;
      hasNextPage: boolean;
    };
  
    constructor(data: T[],  totalCount:number, paginateQuery: PaginateQueryDto) {

      const totalPage = this.getTotalPage(
        totalCount,
        paginateQuery.take,
      );

      this.data = data;
      this.meta = {
        page: paginateQuery.page,
        take: paginateQuery.take,
        totalCount,
        totalPage,
        hasNextPage: this.getHasNextPage(paginateQuery.page, totalPage),
      };
    }
  
    private getTotalPage(totalCount: number, take: number): number {
      return Math.ceil(totalCount / take);
    }
  
    private getHasNextPage(page: number, totalPage: number): boolean {
      return page < totalPage;
    }
  }

