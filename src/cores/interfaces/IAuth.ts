import { IAuthPayload } from '@libs/auth'

export interface IAuth extends IAuthPayload {
  accessToken: string
}
