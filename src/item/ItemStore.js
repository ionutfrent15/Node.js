import {idGenerator, ValidationError, Issue, SEVERITY} from '../core';
import {validate} from './Item';
import datastore from 'nedb-promise';

const match = (props, item) => {
    const keys = Object.keys(props);
    let i;
    for (i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (props[k] !== item[k]) {
            break;
        }
    }
    return i >= keys.length;
};

export class ItemStore {
    constructor({filename}) {
        this.db = datastore({filename, autoload: true});
    }

    static ensureValidItem(item) {
        if (!item) {
            throw new ValidationError([new Issue(SEVERITY.WARNING, 'item', 'Invalid argument')]);
        }
        const issues = validate(item);
        if (issues.length > 0) {
            throw new ValidationError(issues);
        }
    }

    async insert(item) {
        // return new Promise((resolve, reject) => {
        //         try {
        //             ItemStore.ensureValidItem(item);
        //             item.id = idGenerator.next();
        //             this.items.push(item);
        //             resolve(item);
        //         } catch (e) {
        //             reject(e);
        //         }
        //     }
        // );

        ItemStore.ensureValidItem(item);
        // item.id = idGenerator.next();
        return this.db.insert(item);
    }

    find = async (props) => {
        return this.db.find(props);
        // return this.db.find(props)
        //     .sort({text: 1})
        //     .skip(page * limit)
        //     .limit(limit);



        // return new Promise(((resolve, reject) => {
        //     try {
        //         const result = [];
        //         this.items.forEach(item => {
        //             if (match(props, item)) {
        //                 result.push(item);
        //             }
        //         });
        //         resolve(result);
        //     } catch (e) {
        //         reject(e);
        //     }
        // }));
    };

    update = async (props, item) => {
        return this.db.update(props, item);
        // return new Promise(((resolve, reject) => {
        //     try {
        //         const filteredItems = this.items
        //             .filter(it => match(props, it));
        //         filteredItems
        //             .forEach(it => Object.assign(it, item));
        //         resolve(filteredItems.length);
        //     } catch (e) {
        //         reject(e);
        //     }
        // }));
    };

    remove = async props => {
        return this.db.remove(props);
        // return new Promise(((resolve, reject) => {
        //     try {
        //         let count = 0;
        //         for (let i = this.items.length - 1; i >= 0; i--) {
        //             if (match(props, this.items[i])) {
        //                 this.items.splice(i, 1);
        //                 count++;
        //             }
        //         }
        //         resolve(count);
        //     } catch (e) {
        //         reject(e);
        //     }
        // }));
    };

    count = async props => {
        return this.db.count(props);
        // return new Promise(((resolve, reject) => {
        //     try {
        //         const c = this.items
        //             .filter(it => match(props, it))
        //             .length;
        //         resolve(c);
        //     } catch (e) {
        //         reject(e);
        //     }
        // }));
    }

}
