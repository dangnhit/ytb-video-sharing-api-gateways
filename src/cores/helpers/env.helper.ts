import { existsSync } from 'fs'
import { resolve } from 'path'

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV
  const fallBack: string = resolve(`${dest}/.env`)
  const fileName: string = env && env !== 'production' ? `${env}.env` : '.env'
  let filePath: string = resolve(`${dest}/${fileName}`)

  if (!existsSync(filePath)) {
    filePath = fallBack
  }

  return filePath
}
