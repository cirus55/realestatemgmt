// Hide Forms on start
$('#createTenantForm').hide();
$('#registerExpensesForm').hide();

// Hide forms when click on Central Park 
function hideForms() {
    $('#manages').show();
    $('#createTenantForm').hide();
    $('#registerExpensesForm').hide();
    if ($(".table").length > 0) {
        $(".table").remove();
    }
};

//Show create tenant form
function showCreateTenantForm() {
    $('#manages').hide();
    $('#createTenantForm').show();
    $('#registerExpensesForm').hide();

    if ($(".table").length > 0) {
        $(".table").remove();
    }
};

function showRegisterExpenses() {
    $('#manages').hide();
    $('#createTenantForm').hide();
    $('#registerExpensesForm').show();

    if ($(".table").length > 0) {
        $(".table").remove();
    }
};

$( "#dateExpense" ).on( "click", function() {
    $( "#dateExpense" ).datepicker();
  });

  $("#dateExpense").datepicker({
    firstDay: 1,
    onSelect: function (date) {
        $("#dateExpense").val(date)
    },
    });

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

// ------------------------------------------------------------
// Bring tenants and add them to Tenants Table
function showTenantsTable() {

    $('#manages').hide();
    $('#createTenantForm').hide();
    $('#registerExpensesForm').hide();

    if ($(".table").length > 0) {
        $(".table").remove();
    }

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

//----------------------------------------------------------
//Register Expenses
$("#registerExpensesForm").submit(function (event) {
    event.preventDefault();
    dateObj = new Date($("#dateExpense").val().trim())

    dateE = dateObj.getTime();
    conceptE = $("#conceptExpense").val().trim();
    typeE = $("#typeExpense").val().trim();
    amountE = $("#amountExpense").val().trim();
    descriptionE = $("#descriptionExpense").val().trim();

    // Add a new document with a generated id.
    firebase.firestore().collection("expensesDB").add({
        date: dateE,
        concept: conceptE,
        type: typeE,
        amount: amountE,
        description: descriptionE
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
});

// ------------------------------------------------------------
// Bring Expenses and add them to Expenses Table
function showExpensesTable() {

    $('#manages').hide();
    $('#createTenantForm').hide();
    $('#registerExpensesForm').hide();

    if ($(".table").length > 0) {
        $(".table").remove();
    }

    newTable = $("<table>");
    newTable.addClass("table")
    newThead = $("<thead>");
    newTable.append(newThead)

    newTr = $("<tr>");
    newThead.append(newTr)

    newTh1 = $("<th>");
    newTh1.attr("scope", "col");
    newTh1.text("Date");
    newTr.append(newTh1)

    newTh2 = $("<th>");
    newTh2.attr("scope", "col");
    newTh2.text("Concept");
    newTr.append(newTh2)

    newTh3 = $("<th>");
    newTh3.attr("scope", "col");
    newTh3.text("Type");
    newTr.append(newTh3)

    newTh4 = $("<th>");
    newTh4.attr("scope", "col");
    newTh4.text("Amount");
    newTr.append(newTh4)

    newTh5 = $("<th>");
    newTh5.attr("scope", "col");
    newTh5.text("Description");
    newTr.append(newTh5)

    newTbody = $("<tbody>")
    newTable.append(newTbody)

    console.log("antes de firestore")

    firebase.firestore().collection("expensesDB").get().then((querySnapshot) => {
        console.log("despues de firestore")

        querySnapshot.forEach((doc) => {

            newTr = $("<tr>");
            newTd1 = $("<td>");
            newTd1.text(doc.data().date.toDate().toDateString())
            newTr.append(newTd1)

            newTd2 = $("<td>");
            newTd2.text(doc.data().concept)
            newTr.append(newTd2)

            newTd3 = $("<td>");
            newTd3.text(doc.data().type)
            newTr.append(newTd3)

            newTd4 = $("<td>");
            newTd4.text(doc.data().amount)
            newTr.append(newTd4)

            newTd5 = $("<td>");
            newTd5.text(doc.data().description)
            newTr.append(newTd5)

            newTbody.append(newTr)
        });
    });


    $("#expensesTable").append(newTable);
}

//---------------------------------------------------------------

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