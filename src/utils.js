//error handler:
export const errorHandler = async (ctx, next) => {
    try{
        await next();
    } catch (e) {
        ctx.response.status = e.status || 500; //internal server error
        ctx.response.body = e.message || 'Internal Server Error';
    }
};

export const logger = async (ctx, next) => {
    let start = Date.now();
    await next();
    console.log(`${ctx.request.method} ${ctx.request.url} ${Date.now() - start} ms`);
};
