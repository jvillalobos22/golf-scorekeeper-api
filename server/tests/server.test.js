const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Match } = require('../models/match');

const { newMatch } = require('./test-data');

beforeEach(done => {
  Match.remove({}).then(() => done());
});

describe('POST /matches', () => {
  it('should create a new match', done => {
    request(app)
      .post('/matches')
      .send(newMatch)
      .expect(200)
      .expect(res => {
        expect(res.body.course).toEqual(newMatch.course);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Match.find()
          .then(matches => {
            expect(matches.length).toBe(1);
            done();
          })
          .catch(e => done(e));
      });
  });
});
