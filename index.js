'use strict'

const Koa     = require('koa')
const koaBody = require('koa-bodyparser')
const logger  = require('fancy-log')

const DEFAULT_PORT = 8080

const port = parseInt(process.argv[2], 10) || DEFAULT_PORT

const app = new Koa()

app.use(koaBody())

app.use(async(ctx, next) => {
  await next()

  ctx.request.ctx.body = {
    header: ctx.headers,
    body  : ctx.request.body,
  }
})

app.listen(port, '0.0.0.0', () => {
  logger.info(`Server started at port ${port}`)
})
