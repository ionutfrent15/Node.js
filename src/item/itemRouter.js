import Router from 'koa-router';
import { ItemStore } from './ItemStore';
import {Item} from "./Item";
import { brodcast } from "../core/wsBroadcast";

const itemStore = new ItemStore({filename: './db/items.json'});

// for(let i = 3; i < 55; i++){
//     const txt = 'item' + i;
//     var item = new Item(txt, 'false');
//     item.userId = "43RBCV8x6gWu871H";
//     item.version = 1;
//     itemStore.insert(item);
// }


export const router = new Router();

// router.get('/item', async (ctx, next) => {
//     ctx.response.body = await itemStore.find({});
//     ctx.response.status = 200;
// });

router.get('/', async (ctx, next) => {
    // const page = ctx.params.page || 0;
    // const limit = ctx.params.limit || 10;

    const props = ctx.query;
    // var res = await itemStore
    //     .find({...props, userId: ctx.state.user._id});
    //
    // res = res.slice(page * limit, page * limit + limit);

    // ctx.response.body = res;

    ctx.response.body = await itemStore
        .find({...props, userId: ctx.state.user._id});
    ctx.response.status = 200;
});

router.get('/:id', async (ctx, next) => {
    console.log(ctx.params.id);
    const res = await itemStore.find({_id: ctx.params.id});
    console.log(res);
    if(res.length === 0){
        ctx.response.status = 404;
    }
    else {
        if(ctx.state.user._id !== res[0].userId){
            ctx.response.status = 403;
        }
        else {
            ctx.response.body = res[0];
            ctx.response.status = 200;
        }
    }
});



router.post('/', async (ctx, next) => {
    const userId = ctx.state.user._id;
    const item = await itemStore.insert({...ctx.request.body, userId, version: 1});
    ctx.response.body = item;
    ctx.response.status = 200;
    // console.log(item);
    brodcast({event: 'created', payload: item});
});

router.put('/:id', async (ctx, next) => {
    const props = ctx.request.body;
    const id = ctx.params.id;
    const version = props.version;
    const oldItem = await itemStore.find({_id: id});
    if(oldItem.length === 0){
        ctx.response.status = 404;
        return;
    }
    if(oldItem[0].version > version){
        ctx.response.status = 409; //conflict
        ctx.response.body = oldItem[0];
        return;
    }
    props.version += 1;
    const count = await itemStore.update({_id: id}, props);
    const newItemList = await itemStore.find({_id: id});
    const newItem = newItemList[0];
    console.log('newItem: ', newItem);
    ctx.response.status = 200;
    ctx.response.body = newItem;
    brodcast({event: 'updated', payload: newItem });
});

router.delete('/:id', async (ctx, next) => {
    const props = {_id: ctx.params.id};
    const found = await itemStore.find(props);
    const payload = found[0];
    const count = await itemStore.remove(props);
    // ctx.response.body = "DELETED: " + count;
    ctx.response.status = 200;
    brodcast({event: 'deleted', payload: payload});
});
