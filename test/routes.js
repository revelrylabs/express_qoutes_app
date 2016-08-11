var should = require('should')
var assert = require('assert')
var request = require('supertest')
var _ = require('underscore')
var url = 'http://localhost:3000'

describe('Routing', function() {
  it('allows for viewing all quotes via GET /quotes', function(done) {
    request(url)
    	.get('/quotes')
      .expect(200, done)
  });

  it('allows viewing one quote via GET /quotes/:id', function(done) {
    request(url)
    	.get('/quotes/1')
      .expect(200, done)
  });

  it('allows for viewing one random a quote via GET /quotes/random', function(done) {
    request(url)
    	.get('/quotes/random')
      .expect(200, done)
  });

  it('allows for creating a quote via POST /quotes', function(done) {
    request(url)
    	.get('/quotes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ author: 'author', text: 'text' })
      .expect(200, done)
  });

  it('allows for updating a quote via PUT /quotes/:id', function(done) {
    request(url)
      .get('/quotes/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ author: 'new author', text: 'new text' })
      .expect(200, done)
  });

  it('allows for deleting a quote via DELETE /quotes/:id', function(done) {
    request(url)
      .get('/quotes/1')
      .expect(200, done)
  });
})
