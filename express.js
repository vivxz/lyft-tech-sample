const express = require('express');
const bodyParser = require('body-parser');

// initalizing express server and setting up a port
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/test', (request, response) => {
  const {string_to_cut} = request.body;
  // checking to see if string exists and is a string
  if (string_to_cut && typeof string_to_cut === 'string'){
    var responseString = '';
// iterating through the string while starting i at the third value and incrementing i to every third value
    for (var i = 2; i < string_to_cut.length; i+=3) {
      responseString += string_to_cut[i]
    }
    // response.end(responseString);
    response.end(JSON.stringify({'return_string': responseString}));
  } else {
    response.statusCode = 404;
    response.end('Something went wrong, please check your input');
  }
})

app.listen(port, () => console.log(`Listening on port ${port}!!`));