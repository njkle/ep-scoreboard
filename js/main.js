let data;

//Fetch data and build gallery
fetch("data/individual_grades0.json")
.then(response => response.json())
.then(responseData => {
    data = responseData;
    data.forEach(mep => generateCard(mep, ".gallery"));
})
.catch(error => console.log("Error:", error));

//Search bar
const searchInput = document.querySelector('.input');
searchInput.addEventListener(
    'input', (e) => {
        let input = e.target.value;
        if(input && input.trim().length > 0){
            input = input.trim().toLowerCase();
            const filteredMeps = data.filter(
                mep => {
                    return mep.full_name.toLowerCase().includes(input)
                }
            );

            document.querySelector(".gallery").innerHTML = "";
            filteredMeps.forEach(mep => generateCard(mep, ".gallery"));
        }
        else {
            document.querySelector(".gallery").innerHTML = "";  // Clear gallery
            data.forEach(mep => generateCard(mep, ".gallery"));  // Regenerate gallery with all MEPs
        }
    }
);