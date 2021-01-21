$('#managerForm').hide();
$('#userForm').hide();

//-----------------------------------------------

$(document).on("click", "#centralpark", hideForms);

// function to create user
function hideForms() {
    $('#managerForm').hide();
    $('#userForm').hide();
};

$(document).on("click", "#manager", showManagerForm);

// function to create user
function showManagerForm() {
    $('#managerForm').show();
    $('#userForm').hide();
};

$(document).on("click", "#user", showUserForm);

// function to create user
function showUserForm() {
    $('#managerForm').hide();
    $('#userForm').show();
};

//-----------------------------------------------

$(document).on("submit", "#managerForm", managerLogin);

function managerLogin() {
    email = $("#managerEmail").val().trim();
    password = $("#managerPassword").val().trim();
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in 
    // ...
    console.log("sign in!!!")
  })
  .catch((error) => {
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
  });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("entro")
        window.location.replace("manager.html");
    } else {
        // window.location.replace("index.html");
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