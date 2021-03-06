var client = {
	displayName: "N/A",
	email: "N/A",
	uid: "N/A"
};

var uiAuthConfig = {
	callbacks: {
		signInSuccessWithAuthResult: function(authResult) {
			return false;
		},
		uiShown: function() {
		}
	},
	credentialHelper: firebaseui.auth.CredentialHelper.NONE,
	signInFlow: 'popup',
	signInOptions: [
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
		}
	]
};

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
		} else {
			let ui = new firebaseui.auth.AuthUI(firebase.auth());
			ui.start('#firebaseui-auth-container', uiAuthConfig);
		}
		console.log(client);
	});

	const messagesRef = firebase.database().ref('messages');
	messagesRef.on('child_added', event => {
		const msg = event.val();
		addMsg(msg.content, msg.displayName);
	});
}

var sendMessage = () => {
	if(client.displayName == 'N/A') {
		document.getElementById('messages-container').innerHTML += 
			"<div class='message system'>ERROR: NOT LOGGED IN!</div>";
		return;
	}
	let content = document.getElementById('input-box').innerText;
	document.getElementById('input-box').innerHTML = "";

	let newMsgRef = firebase.database().ref('messages').push();
	newMsgRef.set({
		'displayName': client.displayName,
		'content': content
	});
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