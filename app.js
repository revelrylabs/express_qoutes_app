var express = require('express')
var bodyParser = require('body-parser')
var _ = require('underscore')
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))

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
  var id = Math.floor(Math.random() * quotes.length)
  var q = quotes[id]
  res.json(q)
})

// SHOW a quote
app.get('/quotes/:id', (req, res)=> {
  var quote = getQuote(req.params.id)
  if(quote) {
    res.json(quote)
  } else {
    res.status(404)
    res.json({error: 'Quote not found.'})
  }
})

// CREATE a quote
app.post('/quotes', (req, res)=> {
  if(!req.body.hasOwnProperty('author')) {
    res.status(400)
    res.json({error: 'Please provide an author for the quote.'})
  } else if (!req.body.hasOwnProperty('text')) {
    res.status(400)
    res.json({error: 'Please provide text for the quote.'})
  }
  var newQuote = {
    id: _.uniqueId(),
    author: req.body.author,
    text: req.body.text,
  }
  quotes.push(newQuote)
  res.json(newQuote)
})

// UPDATE a quote
app.put('/quotes/:id', (req, res)=> {
  var quote = getQuote(req.params.id)
  if(quote) {
    if (req.body.hasOwnProperty('text')) { quote.text = req.body.text }
    if (req.body.hasOwnProperty('author')) { quote.author = req.body.author }
    // remove old quote
    quotes = _.reject(quotes, (quote2)=> { return quote2.id === quote.id })
    // prepend updated quote to quotes list
    quotes.unshift(quote)
    // respond with updated quote
    res.json(quote)
  } else {
    res.status(404)
    res.json({error: 'Quote not found.'})
  }
})

// DELETE a quote
app.delete('/quotes/:id', (req, res)=> {
  var quote = getQuote(req.params.id)
  if (quote) {
    quotes = _.reject(quotes, (quote2)=> { return quote.id == quote2.id })
    res.send(true)
  } else {
    res.status(404)
    res.json({error: 'Quote not found.'})
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

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) { return next(err) }
  res.status(500)
  res.json({error: 'Something went wrong.'})
}

app.use(logErrors)
app.use(errorHandler)
