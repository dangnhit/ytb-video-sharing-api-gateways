import { yellow, green } from 'chalk'

export const startUpPrinting = (appName: string, port: number): void => {
  console.log('')
  console.log('')
  console.log(yellow('                 ========================================================================'))
  console.log(yellow(`                        ${green('Instance Name')}: ${appName}`))
  console.log(yellow(`                        ${green('Instance Port')}: ${port}`))
  console.log(yellow(`                        ${green('PostgreSQL Host')}: ${process.env.POSTGRES_HOST}`))
  console.log(yellow(`                        ${green('PostgreSQL Port')}: ${process.env.POSTGRES_PORT}`))
  console.log(yellow(`                        ${green('Redis Host')}: ${process.env.REDIS_PORT ? 'localhost' : 'none'}`))
  console.log(yellow(`                        ${green('Redis Port')}: ${process.env.REDIS_PORT ? process.env.REDIS_PORT : 'none'}`))
  console.log(yellow(`                        ${green('Default Language')}: ${process.env.DEFAULT_LANG}`))
  console.log(yellow(`                        ${green('Default Timezone')}: ${process.env.DEFAULT_TZ}`))
  console.log(yellow('                 ========================================================================='))
  console.log('')
  console.log('')
}

export const routePrinting = (requestMethod: string, originalUrl: string): void => {
  console.log(`[${yellow(requestMethod)}] ${yellow(originalUrl)}`)
}
