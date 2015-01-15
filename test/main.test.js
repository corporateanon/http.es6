import chai from 'chai';
import spies from 'chai-spies';
import Api from 'Api';
import RequestTemplate from 'RequestTemplate';

var { expect } = chai;
chai.use(spies);

describe('RequestTemplate', function() {
  it('should build GET request', function() {
    var t = new RequestTemplate('GET /example/?def=100');
    var request = t.apply({foo: 'bar'});
    expect(request).to.eql({
      path: '/example/',
      verb: 'GET',
      query: {
        foo: 'bar',
        def: '100',
      },
    });
  });

  it('should build POST request', function() {
    var t = new RequestTemplate('POST /example/?:inurl');
    var request = t.apply({foo: 'bar'});
    expect(request).to.eql({
      path: '/example/',
      verb: 'POST',
      body: {
        foo: 'bar',
      },
      query: {
      },
    });
  });

  it('should build POST request with query bindings enabled', function() {
    var t = new RequestTemplate('POST /example/?:inurl');
    var request = t.apply({foo: 'bar', inurl:'100'});
    expect(request).to.eql({
      path: '/example/',
      verb: 'POST',
      body: {
        foo: 'bar',
      },
      query: {
        inurl: '100',
      },
    });
  });

  it('should build POST request with query and path bindings enabled', function() {
    var t = new RequestTemplate('POST /example/:inpath/?:inurl');
    var request = t.apply({foo: 'bar', inurl: '100', inpath: 'something'});
    expect(request).to.eql({
      path: '/example/something/',
      verb: 'POST',
      body: {
        foo: 'bar',
      },
      query: {
        inurl: '100',
      },
    });
  });

});

describe('Api', function() {
  it('should do a GET request', function(done) {
    Api('GET /get', {
      base: 'http://httpbin.org'
    })({
      foo: 'bar'
    }).then(function(res) {
      expect(res.args).to.eql({
        foo: 'bar'
      });
      done();
    }).catch(function(err) {
      done(err);
    });
  });
});
