
var firebaseConfig = {
    apiKey: "AIzaSyCvf1--8_-qLj5NzNBV3VE8UBN6xD5nqYg",
    authDomain: "contact-manager-8cc54.firebaseapp.com",
    databaseURL: "https://contact-manager-8cc54-default-rtdb.firebaseio.com",
    projectId: "contact-manager-8cc54",
    storageBucket: "contact-manager-8cc54.appspot.com",
    messagingSenderId: "941852268715",
    appId: "1:941852268715:web:0ce6c4fc7d410958787fee",
    measurementId: "G-317P3C09G1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    let index = window.location.pathname.lastIndexOf('/');
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        if (['/userlogin.html', '/usersignup.html'].indexOf(window.location.pathname.substring(index)) != -1) {
            window.location.href = 'userhome.html';
        }
        
        $('#dname').html(firebase.auth().currentUser.displayName);
    } else {
        if (['/userlogin.html', '/usersignup.html'].indexOf(window.location.pathname.substring(index)) == -1) {
            window.location.href = 'userlogin.html';
        }
        //logged out
        // window.location.href = 'userlogin.html';
    }
});