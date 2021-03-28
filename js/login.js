

function login() {
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            window.location.href = 'userhome.html';
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });

}