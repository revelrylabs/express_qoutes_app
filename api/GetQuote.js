import _ from 'underscore'

var quotes = [
  { id: _.uniqueId(), author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
  { id: _.uniqueId(), author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  { id: _.uniqueId(), author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
  { id: _.uniqueId(), author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
]

export default function getQuote(req, res) {
  var quote = _.find(quotes, (quote)=> { return quote.id == quoteID })
  if(quote) {
    res.json(quote)
  } else {
    res.status(404)
    res.json({error: 'Quote not found.'})
  }
}
