import { paginate as paginateHandler, IPaginationMeta, IPaginationOptions } from 'nestjs-typeorm-paginate'
import { SelectQueryBuilder } from 'typeorm'

import { IResponseList } from '@cores/interfaces'

export async function paginate<T>(queryBuilder: SelectQueryBuilder<T>, options: IPaginationOptions): Promise<IResponseList<T>> {
  options.metaTransformer = (meta: IPaginationMeta): any =>
    new Object({
      totalItems: meta.totalItems,
      limit: meta.itemsPerPage,
      totalPages: meta.totalPages,
      page: meta.currentPage,
      pagingCounter: (meta.currentPage - 1) * meta.itemsPerPage + 1,
      hasPrevPage: meta.currentPage - 1 ? true : false,
      hasNextPage: meta.totalPages > meta.currentPage ? true : false,
      previousPage: meta.currentPage - 1 ? meta.currentPage - 1 : null,
      nextPage: meta.totalPages > meta.currentPage ? meta.currentPage + 1 : null,
    })

  const result: any = await paginateHandler(queryBuilder, options)
  return {
    success: true,
    data: {
      body: result.items,
      ...result.meta,
    },
  }
}
