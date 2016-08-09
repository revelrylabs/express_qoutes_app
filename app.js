const express = require('express')
const bodyParser = require('body-parser')
const _ = require('underscore')
const app = express()

const urlencodedParser = bodyParser.urlencoded({ extended: false })

var quotes = [
  { id: _.uniqueId(), author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
  { id: _.uniqueId(), author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  { id: _.uniqueId(), author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
  { id: _.uniqueId(), author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
]

// INDEX all quotes
app.get('/quotes', (req, res) => {
  res.json(quotes)
})

// SHOW a random quote
app.get('/quotes/random', (req, res)=> {
  const id = Math.floor(Math.random() * quotes.length)
  const q = quotes[id]
  res.json(q)
})

// SHOW a quote
app.get('/quotes/:id', (req, res)=> {
  const quote = getQuote(req.params.id)
  if(quote) {
    res.json(quote)
  } else {
    res.statusCode = 404
    return res.send(RequestError(404, 'Quote not found.'))
  }
})

// CREATE a quote
app.post('/quotes', urlencodedParser, (req, res)=> {
  if(!req.body.hasOwnProperty('author')) {
    res.statusCode = 400
    return res.send(RequestError(400, 'Please provide an author for the quote.'))
  } else if (!req.body.hasOwnProperty('text')) {
    res.statusCode = 400
    return res.send(RequestError(400, 'Please provide text for the quote.'))
  }
  const newQuote = {
    id: _.uniqueId(),
    author: req.body.author,
    text: req.body.text,
  }
  quotes.push(newQuote)
  res.json(newQuote)
})

// DELETE a quote
app.delete('/quotes/:id', (req, res)=> {
  const quote = getQuote(req.params.id)
  if (quote) {
    quotes = _.reject(quotes, (quote2)=> { return quote.id == quote2.id })
    res.json({status: 200})
  } else {
    res.statusCode = 404
    return res.send(RequestError(404, 'Quote not found.'))
  }
})

// have server listen on port 3000
app.listen(3000, ()=> {
  console.log('Express Quotes App listening on port 3000!')
})

// get a quote by id
function getQuote(quoteID) {
  return _.find(quotes, (quote)=> { return quote.id == quoteID })
}

// generic error wrapper
function RequestError(status, message) {
  return { status, error: {message} }
}

RequestError.prototype = Object.create(Error.prototype)
