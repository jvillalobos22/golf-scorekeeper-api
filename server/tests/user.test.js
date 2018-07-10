const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Match } = require('../models/match');
const { User } = require('../models/user');

const {
  users,
  matches,
  badMatch,
  newMatch,
  populateMatches,
  populateUsers
} = require('./seed/seed');

beforeEach(populateMatches);
beforeEach(populateUsers);

describe('User Canary Test', () => {
  it('should pass a canary test', () => {
    expect(1).toBe(1);
  });
});

describe('GET /user', () => {
  it('should return user if authenticated', done => {
    request(app)
      .get('/user')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', done => {
    request(app)
      .get('/user')
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /user', () => {
  it('should create a user', done => {
    var username = 'example@example.com';
    var password = '123mnb!';
    var displayName = 'Example';

    request(app)
      .post('/user')
      .send({ username, password, displayName })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.username).toBe(username);
      })
      .end(err => {
        if (err) return done(err);
        User.findOne({ username })
          .then(user => {
            expect(user).toBeTruthy();
            expect(user.password).not.toBe(password);
            done();
          })
          .catch(e => done(e));
      });
  });

  xit('should return validation errors if request invalid', done => {
    var email = 'bademail';
    var password = '22';

    request(app)
      .post('/user')
      .send({ email, password })
      .expect(400)
      .expect(res => {
        expect(res.headers['x-auth']).toBeFalsy();
        // expect(res.body).toEqual({});
      })
      .end(done);
  });

  it('should not create user if email already in use', done => {
    request(app)
      .post('/user')
      .send(users[0].email, 'password')
      .expect(400)
      .expect(res => {
        expect(res.headers['x-auth']).toBeFalsy();
      })
      .end(done);
  });
});

describe('POST /user/login', () => {
  it('should login user and return auth token', done => {
    request(app)
      .post('/user/login')
      .send({
        username: users[1].username,
        password: users[1].password
      })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body.username).toBe(users[1].username);
        expect(res.body._id).toBe(users[1]._id.toHexString());
      })
      .end((err, res) => {
        if (err) return done(err);
        User.findById(users[1]._id)
          .then(user => {
            expect(user).toBeTruthy();
            expect(user.tokens[1]).toHaveProperty('access', 'auth');
            expect(user.tokens[1]).toHaveProperty(
              'token',
              res.headers['x-auth']
            );
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should reject invalid login', done => {
    request(app)
      .post('/user/login')
      .send({
        username: users[1].username,
        password: 'notpassword'
      })
      .expect(401)
      .expect(res => {
        expect(res.headers['x-auth']).toBeFalsy();
        expect(res.body).toEqual({});
      })
      .end((err, res) => {
        if (err) return done(err);

        User.findOne({ username: users[1].username })
          .then(user => {
            expect(user.tokens.length).toBe(1);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('DELETE /user/logout', () => {
  it('should remove auth token on logout', done => {
    request(app)
      .delete('/user/logout')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end(err => {
        if (err) return done(err);

        User.findById(users[0]._id)
          .then(user => {
            expect(user.tokens.length).toBe(0);
            done();
          })
          .catch(e => done(e));
      });
  });
});
