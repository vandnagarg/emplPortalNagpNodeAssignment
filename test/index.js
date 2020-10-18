const expect = require('chai').expect;
const sinon = require('sinon');

const AuthRouter = require('../routes/auth');
const OpeningRouter = require('../routes/opening');
const Opening = require('../models/opening')

describe("auth Router", function () {

  it('should render register', function () {
    const res = {
      render: function (body) {
        return body
      }
    };
    AuthRouter.get('/', (res, req, next) => {
      expect(res.render.called).to.be.true;
      expect(res.render.called).to.be.with('register');
    });
  });
  it('should render signup', function () {
    const res = {
      render: function (body) {
        return body
      }
    };
    AuthRouter.get('/signup', (res, req, next) => {
      expect(res.render.called).to.be.true;
      expect(res.render.called).to.be.with('register');
    });
  });
  it('should render login', function () {
    const res = {
      render: function (body) {
        return body
      }
    };
    AuthRouter.get('/login', (res, req, next) => {
      expect(res.render.called).to.be.true;
      expect(res.render.called).to.be.with('login');
    });
  });
  it('should render logout', function () {
    const res = {
      render: function (body) {
        return body
      }
    };
    AuthRouter.get('/logout', (res, req, next) => {
      expect(res.render.called).to.be.true;
      expect(res.render.called).to.be.with('logout');
    });
  });
});

describe("opening Router", function () {

  it('should render register', function () {
    const res = {
      render: function (body) {
        return body
      }
    };
    OpeningRouter.get('/', (res, req, next) => {
      expect(res.render.called).to.be.true;
      expect(res.render.called).to.be.with('openings');
    });
  });
  it('should render addNew', function () {
    const res = {
      render: function (body) {
        return body
      }
    };
    AuthRouter.get('/addNew', (res, req, next) => {
      expect(res.render.called).to.be.true;
      expect(res.render.called).to.be.with('addNew');
    });
  });
  it('should render getDetail', function () {
    const res = {
      render: function (body) {
        return body
      }
    };
    AuthRouter.get('/getDetail/1', (res, req, next) => {
      expect(res.render.called).to.be.true;
      expect(res.render.called).to.be.with('getDetail');
    });
  });
  it('should render update', function () {
    const res = {
      render: function (body) {
        return body
      }
    };
    AuthRouter.get('/update', (res, req, next) => {
      expect(res.render.called).to.be.true;
      expect(res.render.called).to.be.with('update');
    });
  });
  it('should get all openings', function () {
    const opening = {
      _id:1,
      projname:"dsf",
      clientname:"fgfg",
      technologies:"sdsd",
      role:"Dfdf",
      jobDesc:"fgfg",
      status:"fgf",
      createdBy:"Ddfdf"
    };
    sinon.stub(Opening, 'find');
    Opening.find.returns(opening);

    const res = {
      json: function (body) {
        return body
      }
    };
    AuthRouter.get('/getDetail/1', (res, req, next) => {
      expect(res.json.called).to.be.true;
      expect(res.json.calledWith(opening)).to.be.true;
    });
  });
});


describe("opening jobapply", function () {

  it('should render apply', function () {
    const res = {
      render: function (body) {
        return body
      }
    };
    OpeningRouter.post('/apply/1', (res, req, next) => {
      expect(res.render.called).to.be.true;
      expect(res.render.called).to.be.with('/');
    });
  });
});