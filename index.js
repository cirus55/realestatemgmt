// Hide Forms on start

$('#managerForm').hide();
$('#tenantForm').hide();
$('#contactCard').hide();

// Hide forms when click on Central Park 
function hideForms() {
    $('#managerForm').hide();
    $('#tenantForm').hide();
    $('#contactCard').hide();
};

//Show manager login form
function showManagerForm() {
    $('#managerForm').show();
    $('#tenantForm').hide();
    $('#contactCard').hide();
};

//Show tenants login form
function showTenantForm() {
    $('#managerForm').hide();
    $('#tenantForm').show();
    $('#contactCard').hide();
};

//Show contact card
function showContactCard() {
    $('#managerForm').hide();
    $('#tenantForm').hide();
    $('#contactCard').show();
};

//----------------------------------------------------------
//Manager Authentication
$( "#managerForm" ).submit(function( event ) {
    event.preventDefault();
    email = $("#managerEmail").val().trim();
    password = $("#managerPassword").val().trim();
    console.log(email, password)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in 
        })
        .catch((error) => {
            var errorMessage = error.message;
            window.alert("Error : " + errorMessage);
        });
  });

  //Tenant Authentication
$( "#tenantForm" ).submit(function( event ) {
    event.preventDefault();
    email = $("#tenantEmail").val().trim();
    password = $("#tenantPassword").val().trim();
    console.log(email, password)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in 
        })
        .catch((error) => {
            var errorMessage = error.message;
            window.alert("Error : " + errorMessage);
        });
  });

  firebase.auth().onAuthStateChanged(function (user) {
    console.log(user)
    if (user && user.uid == 'zyvGEjwvfzPCqVJzcZx2VfXaa3p1') {
        window.location.replace("manager.html");
    } 
    else if (user && user.uid != 'zyvGEjwvfzPCqVJzcZx2VfXaa3p1'){
        localStorage.setItem('uid', user.uid);
        window.location.replace("tenant.html");
    }
    else {
        // window.location.replace("index.html");
    }
});