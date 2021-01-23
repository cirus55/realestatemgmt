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

    firebase.firestore().collection("tenantsDB").get().then((querySnapshot) => {
        i = 0
        querySnapshot.forEach((doc) => {
            if (email == doc.data().email) {
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

// Bring Users and add them to Tenants Table
function showTenantsTable(){
    newTable = $("<table>");
    newTable.addClass("table")
    newThead = $("<thead>");
    newTable.append(newThead)

    newTr = $("<tr>");
    newThead.append(newTr)

    newTh1 = $("<th>");
    newTh1.attr("scope", "col");
    newTh1.text("Name");
    newTr.append(newTh1)

    newTh2 = $("<th>");
    newTh2.attr("scope", "col");
    newTh2.text("Last Name");
    newTr.append(newTh2)

    newTh3 = $("<th>");
    newTh3.attr("scope", "col");
    newTh3.text("Email");
    newTr.append(newTh3)

    newTh4 = $("<th>");
    newTh4.attr("scope", "col");
    newTh4.text("Password");
    newTr.append(newTh4)

    newTbody = $("<tbody>")
    newTable.append(newTbody)

    console.log("antes de firestore")

    firebase.firestore().collection("tenantsDB").get().then((querySnapshot) => {
        console.log("despues de firestore")
        
        querySnapshot.forEach((doc) => {

            newTr = $("<tr>");
            newTd1 = $("<td>");
            newTd1.text(doc.data().name)
            newTr.append(newTd1)

            newTd2 = $("<td>");
            newTd2.text(doc.data().lastname)
            newTr.append(newTd2)

            newTd3 = $("<td>");
            newTd3.text(doc.data().email)
            newTr.append(newTd3)

            newTd4 = $("<td>");
            newTd4.text(doc.data().password)
            newTr.append(newTd4)

            newTbody.append(newTr)
        });
    });


    $("#tenantsTable").append(newTable);
}


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