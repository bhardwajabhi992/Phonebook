


function signup() {
    var email = $('#email').val();
    var password = $('#password').val();
    unsubscribe();
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(uc => {
            let user = uc.user;
            user.updateProfile({
                displayName: $('#fullname').val(),
            }).then(function () {
                let key = firebase.database().ref().child('users').push().key;
                firebase.database().ref().child(`users/${key}`).set({
                    "username": $('#username').val(),
                    "fullname": $('#fullname').val(),
                    "address": $('#address').val(),
                    "mobile": $('#mobile').val(),
                    "email": email
                }, (error) => {
                    if (error) {
                        alert(error);
                    }else
                    {
                        window.location.href = 'userhome.html';
                    }
                });
            }).catch(function (error) {
                alert(error);
            });
        })
        .catch(error => {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    alert(`Email address ${email} already in use.`);
                    break;
                case 'auth/invalid-email':
                    alert(`Email address ${email} is invalid.`);
                    break;
                case 'auth/operation-not-allowed':
                    alert(`Error during sign up.`);
                    break;
                case 'auth/weak-password':
                    alert('Password is not strong enough. Add additional characters including special characters and numbers.');
                    break;
                default:
                    alert(error.message);
                    break;
            }
        });
}