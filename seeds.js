;
/**
 * prefix: like http://
 * postfix: like .com
 */
var Seeds = function(prefix, postfix) {
  this.chars = [];
 
  push_chars("a","z", this.chars);
  push_chars("0","9", this.chars);
  this.chars.push('-');

  this.generate = function(size) {
    return push_char([], [], size, this.chars, this.prefix, this.postfix);
  };
};

exports = module.exports = Seeds;

function push_chars(first, last, chars) {
  for(var i = first.charCodeAt(0); i <= last.charCodeAt(0); i++) {
    chars.push(String.fromCharCode(i));
  }
}

function push_char(url, urls, size, chars, prefix, postfix) {
  if (url.length >= size) {
    return urls;
  }
  
  chars.forEach(function(e) {
    url.push(e);
    if (url.length == size) {
      urls.push([prefix].concat(url, postfix).join(''));
    } else {
      push_char(url, urls, size, chars);
    }
    url.pop();
  });
  return urls;
};