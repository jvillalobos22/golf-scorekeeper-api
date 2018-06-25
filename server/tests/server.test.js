const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Match } = require('../models/match');

const { matches, newMatch, populateMatches } = require('./seed/seed');

beforeEach(populateMatches);

describe('Canary Test', () => {
  it('should pass a canary test', () => {
    expect(1).toBe(1);
  });
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
            expect(matches.length).toBe(3);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('GET /matches', () => {
  it('should get all matches', done => {
    request(app)
      .get('/matches')
      .expect(200)
      .expect(res => {
        expect(res.body.matches.length).toBe(2);
      })
      .end(done);
  });
});

describe('DELETE /matches/:id', () => {
  it('should delete a match', done => {
    const hexId = matches[0]._id.toHexString();

    request(app)
      .delete(`/matches/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.match._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) return done(err);

        Match.findById(hexId)
          .then(match => {
            expect(match).toBe(null);
            done();
          })
          .catch(e => done(e));
      });
  });
});
