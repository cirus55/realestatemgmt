firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // window.location.replace("manager.html");
    } else {
        window.location.replace("index.html");
    }
  });

//----------------------------------------------

$(document).on("click", "#logout", logout);

// function to logout
function logout() {

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location.assign("index.html");
    }).catch(function (error) {
        // An error happened.
    });
}