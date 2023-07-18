function createTable(data, elementId){
    
    const tbody = document.getElementById(elementId);

    data.forEach(item => {

        //create a table row element in DOM
        const row = document.createElement("tr");

        //Control the order of the table colums
        const properties = ["full_name", "country", "political_group", "national_political_group", "Final Grade"];
        
        //For each key, create a cell with the value of the "key" column of this item, and append it to the row
        properties.forEach(key => {
            const cell = document.createElement("td");
            cell.textContent = item[key];
            row.appendChild(cell);
        });

        //Append the row to the body of the table
        tbody.appendChild(row);
    });

}