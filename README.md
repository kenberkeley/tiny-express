# Tiny Express

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/tiny-express)
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/tiny-express)
[![Build Status](https://travis-ci.org/kenberkeley/tiny-express.svg?branch=master)](https://travis-ci.org/kenberkeley/tiny-express)
[![Coverage Status](https://coveralls.io/repos/github/kenberkeley/tiny-express/badge.svg)](https://coveralls.io/github/kenberkeley/tiny-express)

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
