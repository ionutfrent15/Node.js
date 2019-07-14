import Koa from 'koa';
import { router as itemRouter } from './item/itemRouter';
import { logger, errorHandler } from "./utils";
import WebSocket from 'ws';
import bodyparser from 'koa-bodyparser';
import { init, jwtConfig } from './core';
import cors from '@koa/cors';
import koaJwt from 'koa-jwt';
import {router as authRouter} from "./auth";
import Router from 'koa-router';

const app = new Koa();
const server = require('http').createServer(app.callback());
app.use(cors());

init(server);

app.use(logger);
app.use(errorHandler);
app.use(bodyparser());

// app.use(function *(){
//     this.set('Access-Control-Allow-Origin', '*');
// });

// public

const prefix = '/api';
const publicApiRouter = new Router({ prefix });
publicApiRouter
  .use('/auth', authRouter.routes());
app
  .use(publicApiRouter.routes())
  .use(publicApiRouter.allowedMethods());

// app.use(async (ctx, next) => {
//     console.log('before: ', ctx.state);
//     await next();
// });
app.use(koaJwt(jwtConfig));
// app.use(async (ctx, next) => {
//     console.log('after: ', ctx.state);
//     await next();
// });

//protected
const protectedApiRouter = new Router({ prefix });
protectedApiRouter
    .use('/item', itemRouter.routes());
app
    .use(protectedApiRouter.routes())
    .use(protectedApiRouter.allowedMethods());

// app
//     .use(itemRouter.routes())
//     .use(itemRouter.allowedMethods());

server.listen(3000);





// app.use(async(ctx, next) => {
//     await new Promise((resolve => {
//         setTimeout(resolve, 3000);
//     }));
//     await next();
// });
