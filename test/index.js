'use strict';

const mongoose = require('../config/mongoose');
const User    = require('../app/models/user');
const app     = require('../config/express');

const request = require('supertest');

process.env.SECRET = 'secretexample';
var testAccount = { email: 'example@email.com', password: 'test' }

// Tests

describe('App', () => {

  it('returns 404 on root', done => {
    request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect(404)
    .end(done);
  });


  describe('Authorization', () => {

    it('returns 401 when not logged in', done => {
      request(app)
        .post('/v1/contacts')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    });

    it('returns 400 on incomplete login', done => {
      request(app)
        .post('/login')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(done);
    });

    it('returns 403 on wrong login', done => {
      request(app)
        .post('/login')
        .send({ email: 'example@email.com', password: 'wrong' })
        .expect('Content-Type', /json/)
        .expect(403)
        .end(done);
    });

    it('returns token on success login', done => {
      request(app)
        .post('/login')
        .send({ email: 'example@email.com', password: 'test' })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
            if (!res.body.token) throw new Error('no token returned');
        })
        .end(done);
    });

  });


  describe('API', () => {

    var token = null;

    beforeEach(done => {
      request(app)
        .post('/login')
        .send({ email: 'example@email.com', password: 'test' })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });

    it('returns contacts', done => {
      request(app)
      .get('/v1/contacts')
      .set('x-access-token', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(res => {
        if (!res.body.contacts) throw new Error('no contacts key found');
      })
      .end(done);
    });

    it('creates a contact', done => {
      request(app)
      .post('/v1/contacts')
      .set('x-access-token', token)
      .send({ name: 'John Doe' })
      .expect('Content-Type', /json/)
      .expect(201, done);
    });

    it('returns 400 on missing name param', done => {
      request(app)
      .post('/v1/contacts')
      .set('x-access-token', token)
      .expect('Content-Type', /json/)
      .expect(400, done);
    });

  });

});
