
var client = {
	displayName: "N/A",
	email: "N/A",
	uid: "N/A"
};

var uiAuthConfig = {
	callbacks: {
		signInSuccessWithAuthResult: function(authResult, redirectUrl) {
			document.getElementById('success').innerText = "Successfully logged in!";
			return false; // no redirect
		},
		uiShown: function() {
			document.getElementById('loader').style.display = 'none';
		}
	},
	signInFlow: 'popup',
	signInOptions: [
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
		}
	]
};

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
	})
}


window.onload = () => {

	initApp();

    // var authContainer = firebase.auth();
    // var ui = new firebaseui.auth.AuthUI(authContainer);

    // ui.start('#firebaseui-auth-container', authConfig);
};