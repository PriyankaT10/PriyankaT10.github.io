var loginBtn = document.getElementById('login-btn');
// var logoutBtn = document.getElementById('logout-btn');

loginBtn.onclick = function(){
    userLogin();
}

// logoutBtn.onclick = function () {
//     userLogout();
// }

var config = {
    apiKey: "AIzaSyBC2zvuRSI1g_neggPiPoYS-aOBi1z4ENQ",
    authDomain: "user-login-67207.firebaseapp.com",
    databaseURL: "https://user-login-67207.firebaseio.com",
    projectId: "user-login-67207",
    storageBucket: "user-login-67207.appspot.com",
    messagingSenderId: "700678040183"
};

firebase.initializeApp(config);
// logoutBtn.style.display = "none";
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// button click login
function userLogin(){

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        if(user){
            console.log("Do something after login");
            // logoutBtn.style.display = "block";
            loginBtn.style.display = "none";
        }
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        console.log(error)
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        if(errorCode){
            console.log("Do something for error");
        }

    });
}


function userLogout(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.

        console.log("Show login form");

        // logoutBtn.style.display = "none";
        loginBtn.style.display = "block";

    }).catch(function(error) {
        // An error happened.
    });
}