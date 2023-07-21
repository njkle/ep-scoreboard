fetch("data/eu_groups0.json")
.then(response => response.json())
.then(data => {
    data = sortGroups(data);
    data.forEach(group => generateGroupInfo(group, ".group-insights"));
})
.catch(error => console.log("Error:", error));

function defineColor(group) {
    const grade = group["Mean(final_grade)"];
    if(grade <= 7) {
        return "bad";
    } else if (grade <= 14) {
        return "medium";
    }
    return "good";
}

function sortGroups(data) {
    return [...data].sort((a, b) => (b["Mean(final_grade)"] - a["Mean(final_grade)"]));
}

function generateGroupInfo(group, container){
    const colorClass = defineColor(group);
    const groupContainer = document.querySelector(container);
    
    const groupCard = document.createElement("div");
    groupCard.className = "group-card white-bg border-light-gray"

    const groupLogo = document.createElement("img");
    groupLogo.src = `./images/group/${partyLogoMapping[group.political_group]}.svg`;
    groupLogo.className = "group-logo";
    groupCard.appendChild(groupLogo);

    const groupName = document.createElement("h4");
    groupName.className = "h4 extra-bold"
    groupName.textContent = group["political_group"];
    groupCard.appendChild(groupName);

    const groupAverageGrade = document.createElement("span");
    groupAverageGrade.textContent = group["Mean(final_grade)"].toFixed(2);
    groupAverageGrade.className = `text-big bold ${colorClass}-mep`
    groupCard.appendChild(groupAverageGrade);

    groupContainer.appendChild(groupCard);
}