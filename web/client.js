
window.onload = () => {

    var authContainer = firebase.auth();
    var ui = new firebaseui.auth.AuthUI(authContainer);

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
        signInSuccessUrl: 'https://cse405-chat-test.herokuapp.com/',
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            }
        ]
    });



};