// change url_length to generate different sites titles.

;var url_length = 1;

var Crawler = require("crawler").Crawler,
    fs      = require("fs"),
    Seeds   = require("./seeds.js"),
    seeds   = new Seeds("http://", ".com"),
    dataset = [],
    start   = new Date();
var c = new Crawler({
  "maxConnections":10,
  "timeout":5000,
  // This will be called for each crawled page
  "callback":function(error,response,$) {
    var data={"uri": this.uri, "keywords": [this.uri.substr(7, url_length)]};
    dataset.push(data);
    if (error) {
      data.error = error.toString();
      data.success = false;
      return;
    }

    //have no head title.
    if ($("head title").length == 0) {
      data.success=true;
      return;
    }

    //TODO keywords description meta, ico
    $("head title").each(function(index,a) {
        if (a.childNodes.length > 0) {
          data.title = a.childNodes[0].nodeValue;
          data.success = true;
          data.keywords = data.keywords
            .concat(data.title.split(/\s+/))
            .filter(function(e){return e.length>1});
        }
    });

  },
  "onDrain": function() { 
    var file = './data/'+url_length+'.json';
    fs.writeFile(file, JSON.stringify(dataset, null, 4), function(err){
      if (err) {
        throw err;
      }
      console.log(file + ' is saved');
      var time = (new Date().getTime() - start.getTime())/1000;
      console.log('took ' + time + ' seconds');
    });
  }
});
seeds.generate(url_length).forEach(function(url){
  c.queue('http://'+url+'.com');
});

//c.queue('http://www.github.com');