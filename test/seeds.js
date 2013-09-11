var assert = require("assert"),
    Seeds  = require("../seeds.js"),
    seeds  = new Seeds();
    
describe('Seeds', function() {
  describe('size of', function() {
    var chars_length = 37;//a-z0-9-

    it('chars should return '+chars_length, function() {
      assert.equal(chars_length, seeds.chars.length);
    });

    for (var size = 6; size > 1; size--) {
      it('urls should return '+Math.pow(chars_length, size)+' when the size is '+size, function() {
        var urls = seeds.generate(size);
        assert.equal(Math.pow(chars_length, size), urls.length);
        urls.forEach(function(url){
          assert.equal(size, url.length);
        });
      });
    };
    /*it('should return 37 when the size is 1', function() {
      var size = 1, urls = seeds.generate(size);
      
      assert.equal(37, urls.length);
      urls.forEach(function(url){
        assert.equal(size, url.length);
      });
    });
    it('should return 1369 when the size is 2', function() {
      var size = 2, urls = seeds.generate(size);
      assert.equal(1369, urls.length);
      urls.forEach(function(url){
        assert.equal(size, url.length);
      });
    });
    it('should return 50653 when the size is 3', function() {
      var size = 3, urls = seeds.generate(size);
      assert.equal(50653, urls.length);
      urls.forEach(function(url){
        assert.equal(size, url.length);
      });
    });*/
  })
})