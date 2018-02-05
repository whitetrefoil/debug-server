'use strict'

const Koa     = require('koa')
const koaBody = require('koa-bodyparser')
const logger  = require('fancy-log')
const uuidv4  = require('uuid/v4')

const DEFAULT_PORT = 8080

const port = parseInt(process.argv[2], 10) || DEFAULT_PORT
const name = process.argv[3] || uuidv4()

function run() {
  const app = new Koa()

  app.use(koaBody())

  app.use(async(ctx, next) => {
    await next()

    ctx.request.ctx.body = {
      name  : name,
      header: ctx.headers,
      body  : ctx.request.body,
    }
  })

  app.listen(port, '0.0.0.0', () => {
    logger.info(`Server started at port ${port}`)
  })
}

module.exports = {
  run: run,
}

if (require.main === module) {
  run()
}
