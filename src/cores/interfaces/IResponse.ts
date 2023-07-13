export class IResponse<T> {
  success?: boolean
  message?: string
  error?: any
  data?: T
}

export class IResponseList<T> {
  success: boolean
  message?: string
  error?: any
  data?: {
    body: T[]
    totalItems?: number
    limit?: number
    totalPages?: number
    page?: number
    pagingCounter?: number
    hasPrevPage?: boolean
    hasNextPage?: boolean
    itemId?: string
    itemName?: string
    itemImage?: string
  }
}
