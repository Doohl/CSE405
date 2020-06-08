
var client = {
	displayName: "N/A",
	email: "N/A",
	uid: "N/A"
};

var uiAuthConfig = {
	callbacks: {
		signInSuccessWithAuthResult: function(authResult) {
			// document.getElementById('success').innerText = "Successfully logged in!";
			return false;
		},
		uiShown: function() {
			// document.getElementById('loader').style.display = 'none';
		}
	},
	credentialHelper: firebaseui.auth.CredentialHelper.NONE,
	signInFlow: 'popup',
	//signInSuccessUrl: 'https://chat-test-bfb79.web.app/',
	signInOptions: [
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
		}
	]
};

var socketConnection;

var addMsg = (content, displayName, customClass) => {
	let html;
	if(!customClass) customClass = "message";

	if(displayName) html = `<div class='${customClass}'>@<b>${displayName}</b>: ${content}</div>`;
	else 			html = `<div class='${customClass}'>${content}</div>`;

	document.getElementById('messages-container').innerHTML += html;
}

var initApp = () => {

	firebase.auth().onAuthStateChanged(user => {
		if(user) {
			client.displayName = user.displayName;
			client.email = user.email;
			client.uid = user.uid;

			// Open socket when the user has been authenticated only
			socketConnection = new WebSocket("ws://cse405-chat-test.herokuapp.com:5555");
			// socketConnection = new WebSocket("ws://localhost:5555");
			socketConnection.onopen = event => {
				socketConnection.send(JSON.stringify({'getMsgs': true}));
			};
			socketConnection.onmessage = event => {
				const data = JSON.parse(event.data);
				
				if(data.content) {
					addMsg(data.content, data.displayName);
				} else if(data.msgs) {
					data.msgs.forEach(msg => {
						addMsg(msg.content, msg.displayName);
					});
					document.getElementById('loading-msg').remove();
				}
			};
			socketConnection.onerror = e => {
				console.log(e);
			};
		} else {
			let ui = new firebaseui.auth.AuthUI(firebase.auth());
			ui.start('#firebaseui-auth-container', uiAuthConfig);
		}
		console.log(client);
	});
}

var sendMessage = () => {
	if(client.displayName == 'N/A') {
		document.getElementById('messages-container').innerHTML += 
			"<div class='message system'>ERROR: NOT LOGGED IN!</div>";
		return;
	}
	let content = document.getElementById('input-box').innerText;
	socketConnection.send(JSON.stringify({
		'uid': client.uid,
		'content': content
	}));
	document.getElementById('input-box').innerHTML = "";
}

var initUI = () => {
	document.getElementById('input-box').addEventListener('keypress', event => {
		if(event.which == 13) {
			event.preventDefault();
			sendMessage();
			return false;
		}
	});
	document.getElementById('input-button').onclick = sendMessage;
}

window.onload = () => {
	initApp();
	initUI();
};