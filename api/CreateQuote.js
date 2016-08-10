import _ from 'underscore'

var quotes = [
  { id: _.uniqueId(), author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
  { id: _.uniqueId(), author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  { id: _.uniqueId(), author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
  { id: _.uniqueId(), author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
]

export default function createQuote(req, res) {
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
}
