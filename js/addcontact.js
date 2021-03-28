function addContact() {
    var email = $('#email').val();
    var mobile = $('#mobile').val();
    var remark = $('#remark').val();
    var fullname = $('#fullname').val();

    firebase.database().ref().child('contacts').orderByChild("saved_by").equalTo(firebase.auth().currentUser.email).once('value')
        .then((snapshot) => {
            var contacts = [];
            snapshot.forEach((childSnapshot) => {
                contacts.push(childSnapshot.val());
            });
            console.log(contacts);
            if (contacts.findIndex(contact => contact.mobile == mobile || contact.email == email) == -1) {
                firebase.database().ref('contacts').child(firebase.database().ref('contacts').push().key).set({
                    'email': email,
                    'mobile': mobile,
                    'remark': remark,
                    'fullname': fullname,
                    'saved_by' : firebase.auth().currentUser.email
                }, (error) => {
                    if (error) {
                        alert(error);
                    } else {
                        alert('Contact Saved');
                        $('#email').val('');
                        $('#mobile').val('');
                        $('#remark').val('');
                        $('#fullname').val('');
                    }
                });
            } else {
                alert('A contact with either same mobile or email already exist');
            }
        });
}