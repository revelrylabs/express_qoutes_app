var getQuote = require('./api/GetQuote')
var getQuotes = require('./api/GetQuotes')
var createQuotes = require('./api/CreateQuotes')
var deleteQuote = require('./api/DeleteQuote')
var updateQuote = require('./api/UpdateQuote')
var randomQuote = require('./api/RandomQuote')

export default function setup(app) {
  app.get('/quotes', getQuotes)
  app.get('/quotes/random', randomQuote)
  app.post('/quotes', createQuote)
	app.get('/quotes/:id', getQuote)
	app.put('/quotes/:id', updateQuote)
	app.del('/quotes/:id', deleteQuote)
}
