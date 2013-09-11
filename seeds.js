;/*function Seeds(){
  this.chars = [];
 
  push_chars("a","z", this.chars);
  push_chars("0","9", this.chars);
  this.chars.push('-');

  //console.log(chars);
  this.generate = function(size) {
    var urls = push_char([], [], size, this.chars);
    
    return urls;
  };
};

*/
exports = module.exports = Seeds = function() {
  this.chars = [];
 
  push_chars("a","z", this.chars);
  push_chars("0","9", this.chars);
  this.chars.push('-');

  this.generate = function(size) {
    return push_char([], [], size, this.chars);
  };
};


function push_chars(first, last, chars) {
  for(var i = first.charCodeAt(0); i <= last.charCodeAt(0); i++) {
    chars.push(String.fromCharCode(i));
  }
}

function push_char(url, urls, size, chars) {
  if (url.length >= size) {
    return urls;
  }
  
  chars.forEach(function(e) {
    url.push(e);
    if (url.length == size) {
      urls.push(url.join(''));
    } else {
      push_char(url, urls, size, chars);
    }
    url.pop();
  });
  return urls;
};