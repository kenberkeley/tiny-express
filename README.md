# Tiny Express

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
