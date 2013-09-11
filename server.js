// change url_length to generate different sites titles.

;var url_length = 1;

var Crawler = require("crawler").Crawler,
    fs = require("fs"),
    seeds = require("./seeds.js"),
    dataset = [];
var c = new Crawler({
  "maxConnections":10,

  // This will be called for each crawled page
  "callback":function(error,response,$) {
    var data={"uri": this.uri};
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
    });
  }
});
seeds.generate(url_length).forEach(function(url){
  c.queue('http://'+url+'.com');
});
