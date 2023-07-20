const partyLogoMapping = {
    "Greens/EFA": "GREENS",
    "EPP": "EPP",
    "ECR": "ECR",
    "S&D": "S&D",
    "ID": "ID",
    "GUE/NGL": "LEFT",
    "Renew": "RENEW",
    "NI": "NI",
  };

function createTable(data, elementId){
    
    const tbody = document.getElementById(elementId);

    data.forEach(item => {

        //create a table row element in DOM
        const row = document.createElement("tr");

        //Control the order of the table colums
        const properties = ["full_name", "country", "political_group", "national_political_group", "final_grade"];
        
        //For each key, create a cell with the value of the "key" column of this item, and append it to the row
        properties.forEach(key => {
            const cell = document.createElement("td");
            if(key === "final_grade"){
                cell.textContent = item[key].toFixed(2);
            } else {
                cell.textContent = item[key];
            }
            row.appendChild(cell);
        });
        //Append the row to the body of the table
        tbody.appendChild(row);
    });
    
}

function defineColor(mep) {
    const grade = mep["final_grade"];
    if(grade <= 7) {
        return "bad";
    } else if (grade <= 14) {
        return "medium";
    }
    return "good";
}

function generateCard(mep, containerClass){

    const colorClass = defineColor(mep);

    //Select the right container and create a new card
    const container = document.querySelector(containerClass);

    //Create a new div and give it the "card" class
    const card = document.createElement('div');
    card.className = "card";

    const picture = document.createElement("img");
    picture.src = `https://www.europarl.europa.eu/mepphoto/${mep.long_id}.jpg`;
    picture.loading = "lazy";
    picture.className = `mep-image ${colorClass}-border`;
    card.appendChild(picture);

    /*Create the h3 element, assign it to the name
    of the mep, append h3 to the card */
    const name = document.createElement('h3');
    name.className = 'h4 mep-name';
    name.textContent = mep.full_name;
    card.appendChild(name);

    /*Create the list element (group and country), assign 
    it to the values for this mep, append to the card */
    const infoList = document.createElement('ul');
    infoList.className = 'mep-info';

    const groupLogo = document.createElement("img");
    groupLogo.src = `./images/group/${partyLogoMapping[mep.political_group]}.svg`;
    groupLogo.className = "group-logo";
    infoList.appendChild(groupLogo);

    const countryLogo = document.createElement("img");
    countryLogo.src = `./images/country/${[mep.code]}.svg`;
    countryLogo.className = "country-logo";
    infoList.appendChild(countryLogo);
    
    /*
    const group = document.createElement('li');
    group.textContent = mep.political_group;
    infoList.appendChild(group);

    const country = document.createElement('li');
    country.textContent = mep.country;
    infoList.appendChild(country);
    */

    card.appendChild(infoList);

    //Same for the final grade of the MEP
    const scoreDisplayer = document.createElement("div");
    scoreDisplayer.className = "score";

    const grade = document.createElement("span");
    grade.textContent = mep["final_grade"].toFixed(2);
    grade.className = `h4 extra-bold ${colorClass}-mep`

    scoreDisplayer.appendChild(grade);

    const outOf = document.createElement("span");
    outOf.textContent = "/20";
    scoreDisplayer.appendChild(outOf);

    card.appendChild(scoreDisplayer);

    container.appendChild(card);
}


function getGoodOrBadMEPs(data, count = 6, ascending = true) {
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

function sortMEPsByGrade(data, ascending = true) {
    return [...data].sort((a, b) => (ascending ? a["final_grade"] - b["final_grade"] : b["final_grade"] - a["final_grade"]));
}
