var express = require('express')
var bodyParser = require('body-parser')
var _ = require('underscore')
var app = express()
var routes = require('./routes')

app.use(app.router)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logErrors)
app.use(errorHandler)

// have server listen on port 3000
app.listen(3000, ()=> {
  console.log('Express Quotes App listening on port 3000!')
})

// get a quote by id
function getQuote(quoteID) {
  return _.find(quotes, (quote)=> { return quote.id == quoteID })
}

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) { return next(err) }
  res.status(500)
  res.json({error: 'Something went wrong.'})
}
