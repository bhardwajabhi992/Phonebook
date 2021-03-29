var contacts = [];
function getAllContacts() {
    if (firebase.auth().currentUser == null) {
        setTimeout(() => getAllContacts(), 200);
        return;
    }
    firebase.database().ref('contacts').orderByChild('saved_by').equalTo(firebase.auth().currentUser.email).on('value', (snapshot) => {
        snapshot.forEach(childSnapshot => {
            contacts.push({ 'key': childSnapshot.key, ...childSnapshot.val() });
        });
        displayData();
    });
}

function deleteContact(key) {
    if (confirm('Are you sure you want to delete ?')) {
        firebase.database().ref(`contacts/${key}`).remove();
        location.reload();
    }
}

function editContact(key) {
    window.location.href = `editcontact.html?key=${key}`;
}
$('button').click(e => {
    console.log(e.target.id);
    if (e.target.id == 'name-search') {
        $('#num').val('');
        displayData('name', $('#name').val().trim());
    } else {
        $('#name').val('');
        displayData('num', $('#num').val().trim());
    }
})

function displayData(searchBy, param) {
    $('#tBody').html('');

    contacts.filter(contact => {
        if (!param) {
            return true;
        }
        if (searchBy == 'name') {
            console.log(contact.fullname.localeCompare(param));
            return contact.fullname.indexOf(param) == -1 ? false : true;
        } else if (searchBy == 'num') {
            return contact.mobile.indexOf(param) == -1 ? false : true;
        }

    }).forEach((contact, index) => {
        console.log('in for eacth');
        $('#tBody').append(`<tr><td>${index + 1}</td>
        <td>${contact.fullname}</td>
        <td>${contact.email}</td>
        <td>${contact.mobile}</td>
        <td>${contact.remark}</td>
        <td><a onclick = 'editContact("${contact.key}")'>Edit</a></td>
        <td><a onclick = 'deleteContact("${contact.key}")'>Delete</a></td>
        </tr>`);
    });

}
