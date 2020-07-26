var url = require('url');
var http = require('http');

var server = http.createServer(function(req, res) {
  // endpoint will give you the last part of an url –– /test
  var endpoint = url.parse(req.url, true).pathname;
  if (req.method === 'POST' && endpoint === '/test') {
    // deconstructing the query
    // var { string_to_cut } = url.parse(request.url, true).query;
    // creating a body variable that would function similar to request.body
    var body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = JSON.parse(Buffer.concat(body));
      var { string_to_cut } = body;
      // checking to see if the string's length is greater than 3
      if (string_to_cut.length >= 3) {
        var responseString = '';
        // iterating through the string while starting i at the third value and incrementing i to every third value
        for (var i = 2; i < string_to_cut.length; i+=3) {
          responseString += string_to_cut[i]
        }
        res.end(JSON.stringify({return_string: responseString}))
      } else {
        // string length is less than 3
        res.statusCode = 404;
        res.end('String length too short');
      }
    });
  } else {
    // endpoint is not /test
    res.statusCode = 404;
    res.end('Please check your endpoint');
  }
});
server.listen(3000, '127.0.0.1');
console.log('Listening on port 3000!!');