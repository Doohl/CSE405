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

const sampleObject = {
	subObject: {
		value: "hello",
	},
	subArray: [
		"world"
	]
};

const getHelloWorld = () => {
	return `${sampleObject.subObject.value} ${sampleObject.subArray[0]}`;
};

const port = 8000;

var http = require('http');

http.createServer((request, response) => {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end(getHelloWorld());
}).listen(port);

console.log(`Hello World server is running on port ${port}`);