require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/auth/index.js":
/*!***************************!*\
  !*** ./src/auth/index.js ***!
  \***************************/
/*! exports provided: router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ "./src/auth/router.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "router", function() { return _router__WEBPACK_IMPORTED_MODULE_0__["router"]; });



/***/ }),

/***/ "./src/auth/router.js":
/*!****************************!*\
  !*** ./src/auth/router.js ***!
  \****************************/
/*! exports provided: router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "router", function() { return router; });
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/auth/store.js");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core */ "./src/core/index.js");




const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a();

const createToken = user => {
  return jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default.a.sign({
    username: user.username,
    _id: user._id
  }, _core__WEBPACK_IMPORTED_MODULE_3__["jwtConfig"].secret, {
    expiresIn: 60 * 60 * 60
  });
};

const createUser = async (user, response) => {
  try {
    await _store__WEBPACK_IMPORTED_MODULE_1__["default"].insert(user);
    response.body = {
      token: createToken(user)
    };
    response.status = 201; // created
  } catch (err) {
    response.body = {
      issue: [{
        error: err.message
      }]
    };
    response.status = 400; // bad request
  }
};

router.post('/signup', async ctx => await createUser(ctx.request.body, ctx.response));
router.post('/login', async ctx => {
  const credentials = ctx.request.body;
  const response = ctx.response;
  const user = await _store__WEBPACK_IMPORTED_MODULE_1__["default"].findOne({
    username: credentials.username
  });

  if (user && credentials.password === user.password) {
    response.body = {
      token: createToken(user)
    };
    response.status = 201; // created
  } else {
    response.body = {
      issue: [{
        error: 'Invalid credentials'
      }]
    };
    response.status = 400; // bad request
  }
});

/***/ }),

/***/ "./src/auth/store.js":
/*!***************************!*\
  !*** ./src/auth/store.js ***!
  \***************************/
/*! exports provided: UserStore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserStore", function() { return UserStore; });
/* harmony import */ var nedb_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nedb-promise */ "nedb-promise");
/* harmony import */ var nedb_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nedb_promise__WEBPACK_IMPORTED_MODULE_0__);

class UserStore {
  constructor({
    filename,
    autoload
  }) {
    this.store = nedb_promise__WEBPACK_IMPORTED_MODULE_0___default()({
      filename,
      autoload
    });
  }

  async findOne(props) {
    return this.store.findOne(props);
  }

  async insert(user) {
    //
    return this.store.insert(user);
  }

}
/* harmony default export */ __webpack_exports__["default"] = (new UserStore({
  filename: './db/users.json',
  autoload: true
}));

/***/ }),

/***/ "./src/core/Issue.js":
/*!***************************!*\
  !*** ./src/core/Issue.js ***!
  \***************************/
/*! exports provided: SEVERITY, Issue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEVERITY", function() { return SEVERITY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Issue", function() { return Issue; });
const SEVERITY = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'information'
};
function Issue(severity, code, details) {
  this.severity = severity;
  this.code = code;
  this.details = details;
}

/***/ }),

/***/ "./src/core/ValidationError.js":
/*!*************************************!*\
  !*** ./src/core/ValidationError.js ***!
  \*************************************/
/*! exports provided: ValidationError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationError", function() { return ValidationError; });
class ValidationError extends Error {
  constructor(issues) {
    super('validation error');
    this.issues = issues;
  }

}

/***/ }),

/***/ "./src/core/index.js":
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
/*! exports provided: idGenerator, jwtConfig, ValidationError, SEVERITY, Issue, init, brodcast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "idGenerator", function() { return idGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jwtConfig", function() { return jwtConfig; });
/* harmony import */ var _ValidationError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidationError */ "./src/core/ValidationError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValidationError", function() { return _ValidationError__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]; });

/* harmony import */ var _Issue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Issue */ "./src/core/Issue.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SEVERITY", function() { return _Issue__WEBPACK_IMPORTED_MODULE_1__["SEVERITY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Issue", function() { return _Issue__WEBPACK_IMPORTED_MODULE_1__["Issue"]; });

/* harmony import */ var _wsBroadcast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wsBroadcast */ "./src/core/wsBroadcast.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "init", function() { return _wsBroadcast__WEBPACK_IMPORTED_MODULE_2__["init"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "brodcast", function() { return _wsBroadcast__WEBPACK_IMPORTED_MODULE_2__["brodcast"]; });




const idGenerator = (() => {
  let id = 0;
  return {
    next: () => ++id
  };
})();
const jwtConfig = {
  secret: 'my-secret'
};

/***/ }),

/***/ "./src/core/wsBroadcast.js":
/*!*********************************!*\
  !*** ./src/core/wsBroadcast.js ***!
  \*********************************/
/*! exports provided: init, brodcast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "brodcast", function() { return brodcast; });
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ws */ "ws");
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core */ "./src/core/index.js");



let wss;
const init = server => {
  wss = new ws__WEBPACK_IMPORTED_MODULE_0___default.a.Server({
    server
  });
  wss.on('connection', ws => {
    ws.on('message', message => {
      // console.log('received: %s', message);
      const {
        token
      } = JSON.parse(message);

      try {
        const signInfo = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default.a.verify(token, _core__WEBPACK_IMPORTED_MODULE_2__["jwtConfig"].secret);
        ws.user = {
          userId: signInfo._id
        }; // console.log(signInfo);
      } catch (e) {
        console.log('auth error ', e);
        ws.close();
      }
    });
  });
};
const brodcast = ({
  event,
  payload
}) => {
  // console.log("broadcast: ");
  // console.log(event, payload);
  wss.clients.forEach(ws => {
    const userId = ws.user ? ws.user.userId : null; // console.log('userid:', userId);
    // console.log('payloaduserid:', payload.userId);

    if (ws.readyState === ws__WEBPACK_IMPORTED_MODULE_0___default.a.OPEN && userId === payload.userId) {
      console.log('send: ', event, payload);
      ws.send(JSON.stringify({
        event,
        payload
      }));
    }
  });
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa */ "koa");
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _item_itemRouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./item/itemRouter */ "./src/item/itemRouter.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ws */ "ws");
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! koa-bodyparser */ "koa-bodyparser");
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(koa_bodyparser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core */ "./src/core/index.js");
/* harmony import */ var _koa_cors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @koa/cors */ "@koa/cors");
/* harmony import */ var _koa_cors__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_koa_cors__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var koa_jwt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! koa-jwt */ "koa-jwt");
/* harmony import */ var koa_jwt__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(koa_jwt__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./auth */ "./src/auth/index.js");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_9__);










const app = new koa__WEBPACK_IMPORTED_MODULE_0___default.a();

const server = __webpack_require__(/*! http */ "http").createServer(app.callback());

app.use(_koa_cors__WEBPACK_IMPORTED_MODULE_6___default()());
Object(_core__WEBPACK_IMPORTED_MODULE_5__["init"])(server);
app.use(_utils__WEBPACK_IMPORTED_MODULE_2__["logger"]);
app.use(_utils__WEBPACK_IMPORTED_MODULE_2__["errorHandler"]);
app.use(koa_bodyparser__WEBPACK_IMPORTED_MODULE_4___default()()); // app.use(function *(){
//     this.set('Access-Control-Allow-Origin', '*');
// });
// public

const prefix = '/api';
const publicApiRouter = new koa_router__WEBPACK_IMPORTED_MODULE_9___default.a({
  prefix
});
publicApiRouter.use('/auth', _auth__WEBPACK_IMPORTED_MODULE_8__["router"].routes());
app.use(publicApiRouter.routes()).use(publicApiRouter.allowedMethods()); // app.use(async (ctx, next) => {
//     console.log('before: ', ctx.state);
//     await next();
// });

app.use(koa_jwt__WEBPACK_IMPORTED_MODULE_7___default()(_core__WEBPACK_IMPORTED_MODULE_5__["jwtConfig"])); // app.use(async (ctx, next) => {
//     console.log('after: ', ctx.state);
//     await next();
// });
//protected

const protectedApiRouter = new koa_router__WEBPACK_IMPORTED_MODULE_9___default.a({
  prefix
});
protectedApiRouter.use('/item', _item_itemRouter__WEBPACK_IMPORTED_MODULE_1__["router"].routes());
app.use(protectedApiRouter.routes()).use(protectedApiRouter.allowedMethods()); // app
//     .use(itemRouter.routes())
//     .use(itemRouter.allowedMethods());

server.listen(3000); // app.use(async(ctx, next) => {
//     await new Promise((resolve => {
//         setTimeout(resolve, 3000);
//     }));
//     await next();
// });

/***/ }),

/***/ "./src/item/Item.js":
/*!**************************!*\
  !*** ./src/item/Item.js ***!
  \**************************/
/*! exports provided: Item, validate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Item", function() { return Item; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return validate; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core/index.js");

function Item(text, isActive) {
  this.text = text;
  this.isActive = isActive;
}

Item.prototype.toString = function () {
  return `${this.text} ${this.isActive}`;
};

const validate = item => {
  const issues = [];

  if (!item.text || typeof item.text !== 'string' || item.text.trim().length === 0) {
    issues.push(new _core__WEBPACK_IMPORTED_MODULE_0__["Issue"](_core__WEBPACK_IMPORTED_MODULE_0__["SEVERITY"].WARNING, 'text', 'Invalid text property'));
  }

  return issues;
};

/***/ }),

/***/ "./src/item/ItemStore.js":
/*!*******************************!*\
  !*** ./src/item/ItemStore.js ***!
  \*******************************/
/*! exports provided: ItemStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemStore", function() { return ItemStore; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core/index.js");
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item */ "./src/item/Item.js");
/* harmony import */ var nedb_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nedb-promise */ "nedb-promise");
/* harmony import */ var nedb_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nedb_promise__WEBPACK_IMPORTED_MODULE_2__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





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

class ItemStore {
  constructor({
    filename
  }) {
    _defineProperty(this, "find", async props => {
      return this.db.find(props); // return this.db.find(props)
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
    });

    _defineProperty(this, "update", async (props, item) => {
      return this.db.update(props, item); // return new Promise(((resolve, reject) => {
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
    });

    _defineProperty(this, "remove", async props => {
      return this.db.remove(props); // return new Promise(((resolve, reject) => {
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
    });

    _defineProperty(this, "count", async props => {
      return this.db.count(props); // return new Promise(((resolve, reject) => {
      //     try {
      //         const c = this.items
      //             .filter(it => match(props, it))
      //             .length;
      //         resolve(c);
      //     } catch (e) {
      //         reject(e);
      //     }
      // }));
    });

    this.db = nedb_promise__WEBPACK_IMPORTED_MODULE_2___default()({
      filename,
      autoload: true
    });
  }

  static ensureValidItem(item) {
    if (!item) {
      throw new _core__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]([new _core__WEBPACK_IMPORTED_MODULE_0__["Issue"](_core__WEBPACK_IMPORTED_MODULE_0__["SEVERITY"].WARNING, 'item', 'Invalid argument')]);
    }

    const issues = Object(_Item__WEBPACK_IMPORTED_MODULE_1__["validate"])(item);

    if (issues.length > 0) {
      throw new _core__WEBPACK_IMPORTED_MODULE_0__["ValidationError"](issues);
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
    ItemStore.ensureValidItem(item); // item.id = idGenerator.next();

    return this.db.insert(item);
  }

}

/***/ }),

/***/ "./src/item/itemRouter.js":
/*!********************************!*\
  !*** ./src/item/itemRouter.js ***!
  \********************************/
/*! exports provided: router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "router", function() { return router; });
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ItemStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemStore */ "./src/item/ItemStore.js");
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Item */ "./src/item/Item.js");
/* harmony import */ var _core_wsBroadcast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/wsBroadcast */ "./src/core/wsBroadcast.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const itemStore = new _ItemStore__WEBPACK_IMPORTED_MODULE_1__["ItemStore"]({
  filename: './db/items.json'
}); // for(let i = 3; i < 55; i++){
//     const txt = 'item' + i;
//     var item = new Item(txt, 'false');
//     item.userId = "43RBCV8x6gWu871H";
//     item.version = 1;
//     itemStore.insert(item);
// }

const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a(); // router.get('/item', async (ctx, next) => {
//     ctx.response.body = await itemStore.find({});
//     ctx.response.status = 200;
// });

router.get('/', async (ctx, next) => {
  // const page = ctx.params.page || 0;
  // const limit = ctx.params.limit || 10;
  const props = ctx.query; // var res = await itemStore
  //     .find({...props, userId: ctx.state.user._id});
  //
  // res = res.slice(page * limit, page * limit + limit);
  // ctx.response.body = res;

  ctx.response.body = await itemStore.find(_objectSpread({}, props, {
    userId: ctx.state.user._id
  }));
  ctx.response.status = 200;
});
router.get('/:id', async (ctx, next) => {
  console.log(ctx.params.id);
  const res = await itemStore.find({
    _id: ctx.params.id
  });
  console.log(res);

  if (res.length === 0) {
    ctx.response.status = 404;
  } else {
    if (ctx.state.user._id !== res[0].userId) {
      ctx.response.status = 403;
    } else {
      ctx.response.body = res[0];
      ctx.response.status = 200;
    }
  }
});
router.post('/', async (ctx, next) => {
  const userId = ctx.state.user._id;
  const item = await itemStore.insert(_objectSpread({}, ctx.request.body, {
    userId,
    version: 1
  }));
  ctx.response.body = item;
  ctx.response.status = 200; // console.log(item);

  Object(_core_wsBroadcast__WEBPACK_IMPORTED_MODULE_3__["brodcast"])({
    event: 'created',
    payload: item
  });
});
router.put('/:id', async (ctx, next) => {
  const props = ctx.request.body;
  const id = ctx.params.id;
  const version = props.version;
  const oldItem = await itemStore.find({
    _id: id
  });

  if (oldItem.length === 0) {
    ctx.response.status = 404;
    return;
  }

  if (oldItem[0].version > version) {
    ctx.response.status = 409; //conflict

    ctx.response.body = oldItem[0];
    return;
  }

  props.version += 1;
  const count = await itemStore.update({
    _id: id
  }, props);
  const newItemList = await itemStore.find({
    _id: id
  });
  const newItem = newItemList[0];
  console.log('newItem: ', newItem);
  ctx.response.status = 200;
  ctx.response.body = newItem;
  Object(_core_wsBroadcast__WEBPACK_IMPORTED_MODULE_3__["brodcast"])({
    event: 'updated',
    payload: newItem
  });
});
router.delete('/:id', async (ctx, next) => {
  const props = {
    _id: ctx.params.id
  };
  const found = await itemStore.find(props);
  const payload = found[0];
  const count = await itemStore.remove(props); // ctx.response.body = "DELETED: " + count;

  ctx.response.status = 200;
  Object(_core_wsBroadcast__WEBPACK_IMPORTED_MODULE_3__["brodcast"])({
    event: 'deleted',
    payload: payload
  });
});

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: errorHandler, logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorHandler", function() { return errorHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logger", function() { return logger; });
//error handler:
const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.response.status = e.status || 500; //internal server error

    ctx.response.body = e.message || 'Internal Server Error';
  }
};
const logger = async (ctx, next) => {
  let start = Date.now();
  await next();
  console.log(`${ctx.request.method} ${ctx.request.url} ${Date.now() - start} ms`);
};

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Ionut\Documents\Workspace\JavaScript\my-todo-server\src/index.js */"./src/index.js");


/***/ }),

/***/ "@koa/cors":
/*!****************************!*\
  !*** external "@koa/cors" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@koa/cors");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-bodyparser":
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),

/***/ "koa-jwt":
/*!**************************!*\
  !*** external "koa-jwt" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-jwt");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "nedb-promise":
/*!*******************************!*\
  !*** external "nedb-promise" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nedb-promise");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ws");

/***/ })

/******/ });
//# sourceMappingURL=main.map