var http = require('http');
var identicon = require('identicon');
var url = require('url');

var port = process.env.PORT || 3000;

http.createServer(function(req, res) {
  var parsedUrl = url.parse(req.url);
  var pathname = parsedUrl.pathname;
  var parts = pathname.substr(1).split('/');
  var str = parts[0];
  var size = parseInt(parts[1]);

  if (isNaN(size) || size <= 0 || size > 1024) {
    res.writeHead(400);
    res.write('Invalid size');
    return res.end();
  }

  identicon.generate(str, size, function(err, buffer) {
    if (err) {
      res.writeHead(500);
      res.write('Internal Server Error');
      return res.end();
    }
    res.writeHead(200, {
      'Cache-Control': 'max-age=86400',
      'Content-Type': 'image/png'
    });
    res.write(buffer);
    res.end();
  });
}).listen(port);

