//TODO
var fs = require("fs"),
    assert = require("assert");

describe('Crawl', function() {
  describe('saved file', function() {
    it('should have value', function() {
      fs.readFile("../data/1.json", function(err, data){
        var json = JSON.parse(data);
        assert.ok(json.results, "should be valid");
        assert.equal(json.results.length, 38);
        assert.ok(json.status, "should be valid");
      });
    })
  })
})