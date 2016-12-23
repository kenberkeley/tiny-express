# Tiny Express

[![npm version][npm-v-img]][npm-url]
[![npm download][npm-dl-img]][npm-url]
[![build](build-img)][build-url]
[![coverage][cov-img]][cov-url]

> Implement a tiny express which can run in browser

Methods supported: `GET / POST / PUT / DELETE / PATCH / OPTIONS`

```
app.use(<middleware>)
app.VERB(<path>, <middlewares?>, <handler>)

app
  .receive({ method: <String>, url: <String>, body: <Any> })
  .respond(function(result) {
    // deal with result
  })
```

```
req: {
  method: <String>,
  originalUrl: <String>,
  path: <String>,
  query: <Object>,
  params: <Object>,
  body: <Object>
}

res: {
  send: <Function>,
  json: <Function>
}
```

[npm-url]: https://www.npmjs.com/package/tiny-express
[npm-v-img]: http://img.shields.io/npm/v/tiny-express.svg
[npm-dl-img]: http://img.shields.io/npm/dm/tiny-express.svg
[build-img]: https://travis-ci.org/kenberkeley/tiny-express.svg?branch=master
[build-url]: https://travis-ci.org/kenberkeley/tiny-express
[cov-img]: https://coveralls.io/repos/github/kenberkeley/tiny-express/badge.svg
[cov-url]: https://coveralls.io/github/kenberkeley/tiny-express
