// Hide forms when click on Central Park 
function hideForms() {
    $('#user').show();
    if ($(".table").length > 0) {
        $(".table").remove();
    }
};

// ------------------------------------------------------------
// Bring Expenses and add them to Expenses Table
function showExpensesTable() {

    $('#user').hide();

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