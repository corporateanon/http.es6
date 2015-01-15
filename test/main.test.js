import chai from 'chai';
import spies from 'chai-spies';
import Api from 'Api';

var { expect } = chai;
chai.use(spies);

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
