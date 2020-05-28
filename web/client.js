
window.onload = () => {

    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                document.getElementById('success').innerText = "Successfully logged in!";
                return true;
            },
            uiShown: function() {
                document.getElementById('loader').style.display = 'none';
            }
        },
        signInFlow: 'popup',
        // signInSuccessUrl: 'http://localhost:5555',
        signInOptions: [
            {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false
            }
        ]
    });



};