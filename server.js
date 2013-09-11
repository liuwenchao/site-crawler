// change url_length to generate different sites titles.
// 2.json took  825.978 seconds.
;var 
    url_length = 1,
    prefix  = "http://",
    postfix = ".com",
    file    = './data/'+url_length+'.json';

var Crawler = require("crawler").Crawler,
    fs      = require("fs"),
    Seeds   = require("./seeds.js"),
    seeds   = new Seeds(prefix, postfix),
    //dataset = [],
    start   = new Date();

//clean up the target file.
fs.truncate(file);
fs.appendFile(file, "{\"results\":[\n");

var c = new Crawler({
  "maxConnections":10,
  "timeout":5000,
  // This will be called for each crawled page
  "callback":function(error,response,$) {
    var data={"uri": this.uri, "keywords": [this.uri.substr(7, url_length)]};
    //dataset.push(data);
    if (error) {
      data.error = error.toString();
      data.success = false;
      save(data);
      return;
    }

    //have no head title.
    if (!$ || $("head title").length === 0) {
      data.success=true;
      save(data);
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

    var time = (new Date().getTime() - start.getTime())/1000;
    console.log(time + " seconds passed");
    save(data);
  },
  "onDrain": function() { 
    console.log(file + ' was saved');
    var time = (new Date().getTime() - start.getTime())/1000;
    fs.appendFile(file, "{}],\"status\":"+JSON.stringify({
      "url_length": url_length, 
      "start": start, 
      "time": time}, null, 4)+"}", function(err){
      if (err) {
        throw err;
      }
    });
    console.log('took ' + time + ' seconds');
  }
});
seeds.generate(url_length).forEach(function(url){
  c.queue(url);
});

function save(data) { 
  fs.appendFile(file, JSON.stringify(data, null, 0)+",\n", function(err){
    if (err) {
      throw err;
    }
  });
}

//c.queue('http://www.github.com');