/**
 * A simple chat application for CSE 405.
 * 
 * To install:
 *  npm install
 * 
 * To test:
 *  npm test
 * 
 * To run:
 *  npm run
 */

// Do not use ExpressJS anymore!
// require("./static_server");

const WebSocket = require('ws');

const admin = require('firebase-admin');
const serviceAccount = require("../chat-test-credentials.json");
// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// 	databaseURL: "https://chat-test-bfb79.firebaseio.com"
// });
admin.initializeApp({
	credentials: admin.credential.cert({
		"private_key": process.env.FIREBASE_PRIVATE_KEY,
		"client_email": process.env.FIREBASE_CLIENT_EMAIL,
		"project_id": process.env.FIREBASE_PROJECT_ID,
		"client_id": process.env.FIREBASE_CLIENT_ID,
	}),
	databaseURL: "https://chat-test-bfb79.firebaseio.com"
});

const auth = admin.auth();
const db = admin.firestore();

const server = new WebSocket.Server({port: 5555}, () => {
	console.log("Running!");
});

server.on('connection', function connection(ws) {
	
	ws.on('message', async message => {
		message = JSON.parse(message);

		if(message.content) {
			const user = await auth.getUser(message.uid);
			server.clients.forEach(client => {
				client.send(JSON.stringify({
					'displayName': user.displayName,
					'content': message.content
				}));
			});
			db.collection('chat').doc().set({
				'displayName': user.displayName,
				'content': message.content
			});
		
		} else if(message.getMsgs) {
			let snapshots = await db.collection('chat').get();
			let response = {
				msgs: []
			};

			snapshots.forEach(doc => {
				response.msgs.push(doc.data());
			});

			ws.send(JSON.stringify(response));
		}
	});
});