# mt-koa-logger

  Development style logger middleware for [koa](https://github.com/koajs/koa) for mt.


```
2017-08-08 16:00:33 192.168.88.120 GET / 200 - 3ms 11B
```

## Installation

```js
$ npm install mt-koa-logger
```

## Example

```js
const logger = require('mt-koa-logger')
const Koa = require('koa')

const app = new Koa()
app.use(logger())
```

## Notes

  Recommended that you `.use()` this middleware near the top
  to "wrap" all subsequent middleware.

## License

  MIT
