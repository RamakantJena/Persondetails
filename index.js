
var people = [];

function handleSubmit() {
    let fName = $("#f_name").val();
    let lName = $("#l_name").val();
    let contact = $("#number").val();
    console.log(typeof(fName) + typeof(lName) + typeof(contact));

    var person = {
        pName : null,
        contact : null
    }

    if (fName == "" || lName == "" || contact == "") {
        
        alert("Please enter required details.");
    } else {
        let fullName = fName + " " + lName;
        let found = false;
        
        if (people.length == 0) {
            person.pName = fullName;
            person.contact = contact;
            people.push(person);
            $("#f_name").val();
            $("#l_name").val();
            $("#number").val();
            populate(people);
        } else {
            for (var i = 0; i < people.length; i++) {
                if (fullName === people[i].pName) {
                    found = true;
                    alert(`Person '${fullName}' exist please enter new name.`);
                    return;
                }
                if (contact === people[i].contact) {
                    found = true;
                    alert(`Person '${contact}' exist please enter new contact.`);
                    return;
                }
            }
    
            if (!found) {
                person.pName = fullName;
                person.contact = contact;
                people = [...people, person];
                populate(people);
                
            }
        }
    }
}

function populate(people) {
    $(".row").remove();
    people.forEach((e, ind) => {

        let content = `
        <tr class='row'>
        <td class='culumn'>${ind+1}</td>
        <td> ${e.pName}</td>
        <td> ${e.contact}</td>
        <td class='delete' onclick='erase(${ind})'> X </td>
        </tr>
        `;

        $(content).insertBefore("#end_row");
    });
}

function erase (i) {
    if (i == 0) {
        people.shift();
    } else people.splice(i,i);
    populate(people);
    alert("The information successfully deleted.");
}

function sortByName () {

    people.sort((a, b) => {
        if (a.pName < b.pName) return -1;
        else if (a.pName > b.pName) return 1;
        return 0;
    })
    populate(people);
}

document.addEventListener("keypress", (e) => {
    let newPeople = [];
    let ind = null;
    if (e.key === "Enter") {
        for (let i = 0; i < people.length; i++) {
            if (e.target.value == people[i].pName) {
                newPeople.push(people[i]);
                populate(newPeople);
            }
        }
    }
});