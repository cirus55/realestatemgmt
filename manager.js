// Hide Forms on start
$('#createTenantForm').hide();
$('#manageExpensesContainer').hide();

//Show create tenant form
function showCreateTenantForm() {
    $('#createTenantForm').show();
    $('#manageExpensesContainer').hide();
};

function showManageExpenses() {
    $('#createTenantForm').hide();
    $('#manageExpensesContainer').show();
};

//----------------------------------------------------------
//Create Tenants
$("#createTenantForm").submit(function (event) {
    event.preventDefault();
    nameT = $("#newTenantName").val().trim();
    lastnameT = $("#newTenantLastname").val().trim();
    email = $("#newTenantEmail").val().trim();
    password = $("#newTenantPassword").val().trim();
    console.log(email, password)

    firebase.firestore().collection("tenantsDB").get().then((querySnapshot) => {
        i = 0
        querySnapshot.forEach((doc) => {
            if (email == doc.data().tenantEmail) {
                console.log('Email already registered')
            }
            else {
                i += 1
            }
        });

        if (i == querySnapshot.size) {
            // Sign up tenant
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in 
                    // ...
                    // Add a new document in collection "cities"
                    firebase.firestore().collection("tenantsDB").doc(userCredential.user.uid).set({
                        name: nameT,
                        lastname: lastnameT,
                        email: email,
                        password: password
                    })
                        .then(function () {
                            console.log("Document successfully written!");
                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                        });

                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                });
        }
    });
});


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