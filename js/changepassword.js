
firebase.auth().onAuthStateChanged((u) => {
    if (u) {
        $('#changeBt').prop('disabled', false);
    } else {
        $('#changeBt').prop('disabled', true);
    }
});
function changePassword() {

    var password = $('#password').val();
    var cnfPasswod = $('#conpassword').val();
    var oldpassword = $('#oldpassword').val();
    if (!oldpassword || !password || !cnfPasswod) {
        return;
    }
    if (password == cnfPasswod) {
        reauth();
    } else {
        alert('Please check new passwords');
    }
}

function reauth() {
    var oldpassword = $('#oldpassword').val();
    if (oldpassword) {
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            oldpassword
        );
        firebase.auth().currentUser.reauthenticateWithCredential(credential).then(function () {
            // User re-authenticated.
            user.updatePassword($('#password').val().trim()).then(function () {
                // Update successful.
                $('#password').val('');
                $('#conpassword').val('');
                $('#oldpassword').val('');
            }).catch(function (error) {
                // An error happened.
                alert(error);
            });

        }).catch(function (error) {
            alert(error);
            // An error happened.
        });

    } else {
        alert('Please check old password');
    }
}