/**
 * A simple 'hello world' web application that demonstrates understanding of both NodeJS and JavaScript Object Notation.
 * 
 * To run:
 * 	node test_server.js
 * Then:
 * 	navigate to localhost:8000 in a browser
 * 
 * Should print "hello world" on the browser!
 * 
 */

var mainObject = JSON.parse(`
{
	"counter": 0,
	"hello": "world",
	"some_array": [
		1, "hello", {"name": "object"}
	],
	"some_object": {
		"reverse_counter": 0
	}
}
`);

var counter = 0;

const getMessage = () => {
	++mainObject.counter;
	--mainObject.some_object.reverse_counter;
	return JSON.stringify(mainObject); 
};

const port = 8000;

var http = require('http');

http.createServer((request, response) => {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end(getMessage());
}).listen(port);

console.log(`Hello World server is running on port ${port}`);