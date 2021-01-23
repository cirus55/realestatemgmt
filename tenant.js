$(document).on("click", "#logout", logout);

// function to logout
function logout() {

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log('signed out')
        //window.location.assign("index.html");
    }).catch(function (error) {
        // An error happened.
    });
}

firebase.auth().onAuthStateChanged(function (user) {
    console.log(user)
    if (user) {

    } 
    else {
        window.location.replace("index.html");
    }
});