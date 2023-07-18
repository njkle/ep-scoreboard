/* 

Generates a div element of class "card"
that contains all the relevant info about a MEP.

Input:
- a "mep" object
- the relevant ID of the container, in that case
#loser-gallery (for the worst MEPs) and #leader-gallery
(for the best MEPs)

Output:
- appends a new card to the gallery

*/

function generateCard(mep, containerID){
    //Select the right container and create a new card
    const container = document.querySelector(containerID);
    const card = document.createElement('div');
    card.className = 'card';

    /*Create the h3 element, assign it to the name
    of the mep, append h3 to the card */
    const name = document.createElement('h3');
    name.className = 'mep-name';
    name.textContent = mep.full_name;
    card.appendChild(name);

    /*Create the list element (group and country), assign 
    it to the values for this mep, append to the card */
    const infoList = document.createElement('ul');
    infoList.className = 'mep-info';
    const group = document.createElement('li');
    group.textContent = mep.political_group;
    infoList.appendChild(group);
    const country = document.createElement('li');
    country.textContent = mep.country;
    infoList.appendChild(country);
    card.appendChild(infoList);

    //Same for the final grade of the MEP
    const score = document.createElement('div');
    score.className = 'score';
    const grade = document.createElement('h3');
    grade.className = 'mep-grade-title';
    grade.textContent = mep["final_grade"].toFixed(2);

    const normalizedGrade = grade.textContent/20;

    score.appendChild(grade);
    const totalScore = document.createElement('p');
    totalScore.className = 'mep-grade-title';
    totalScore.textContent = '/20';
    score.appendChild(totalScore);
    card.appendChild(score);
    container.appendChild(card);
}

/* 
Sorts the list of MEPs.

Input: 
- the array we want to sort by grades
- ascending (true, default) or descending (false)

Ouput:
- sorted array
*/

function sortMEPsByGrade(data, ascending = true) {
    return [...data].sort((a, b) => (ascending ? a["final_grade"] - b["final_grade"] : b["final_grade"] - a["final_grade"]));
}

function getMEPs(data, count = 6, ascending = true) {
    const includedGroups = new Set();
    const sortedData = sortMEPsByGrade(data, ascending);
    const selectedMEPs = [];
    for (let mep of sortedData) {
        if (selectedMEPs.length >= count) {
            break;
        }
        if (!includedGroups.has(mep.political_group)) {
            selectedMEPs.push(mep);
            includedGroups.add(mep.political_group);
        }
    }
    return selectedMEPs;
}

/*
Fetches the individual grades, sorts the table
ascending and descending, slices it to keep the
first 3 MEPs, generates cards for the 3 best and
3 worst MEPs.
*/

fetch('../data/individual_grades.json')
.then(response => response.json())
.then(data => {
    const top3MEPs = getMEPs(data, 6, false); // Best MEPs (false for descending sorting)
    top3MEPs.forEach(mep => generateCard(mep, "#leader-gallery"));
    const worst3MEPs = getMEPs(data, 6, true); // Worst MEPs (true for ascending sorting)
    worst3MEPs.forEach(mep => generateCard(mep, "#loser-gallery"));
})
.catch(error => console.log('Error:', error));