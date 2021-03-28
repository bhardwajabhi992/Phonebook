let params = window.location.search.substring(1);
let key = '';
if (params.indexOf("key=") == -1) {
    alert('Invalid Request');
    $('#saveBt').prop('disabled', true);
} else {

    let index = params.indexOf("=");
    key = params.substring(index + 1);
    firebase.database().ref('contacts').child(key).once('value', (snapshot) => {
        if (snapshot.exists()) {
            $('#saveBt').prop('disabled', false);
            let contact = snapshot.val();
            $('#email').val(contact.email);
            $('#mobile').val(contact.mobile);
            $('#remark').val(contact.remark);
            $('#fullname').val(contact.fullname);
        } else {
            alert('Invalid Request');
            $('#saveBt').prop('disabled', true);
        }
    });
}

function addContact() {
    var email = $('#email').val().trim();
    var mobile = $('#mobile').val().trim();
    var remark = $('#remark').val().trim();
    var fullname = $('#fullname').val().trim();
    if (!email || !mobile || !remark || !fullname) {
        return;
    }
    firebase.database().ref().child(`contacts`).orderByChild("saved_by").equalTo(firebase.auth().currentUser.email).once('value')
        .then((snapshot) => {
            var contacts = [];
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.key != key) {
                    contacts.push(childSnapshot.val());
                }
            });
            if (contacts.findIndex(contact => contact.mobile == mobile || contact.email == email) == -1) {
                firebase.database().ref(`contacts/${key}`).set({
                    'email': email,
                    'mobile': mobile,
                    'remark': remark,
                    'fullname': fullname,
                    'saved_by': firebase.auth().currentUser.email
                }, (error) => {
                    if (error) {
                        alert(error);
                    } else {
                        alert('Contact Edited Successfully');
                        $('#email').val('');
                        $('#mobile').val('');
                        $('#remark').val('');
                        $('#fullname').val('');
                        $('#saveBt').prop('disabled', true);
                    }
                });
            } else {
                alert('A contact with either same mobile or email already exist');
            }
        });
}