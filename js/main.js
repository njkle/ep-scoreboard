//Select the body of the MEP table
const tbody = document.querySelector("#meps-table tbody");
//console.log(tbody);

fetch('../data/individual_grades.json')
.then(response => response.json())
.then(data => {
    createTable(data, "meps-table");
})
.catch(error => console.log('Error:', error));