fetch('../data/individual_grades.json')
.then(response => response.json())
.then(data => {
    data.forEach(mep => generateCard(mep, ".gallery"));
})
.catch(error => console.log('Error:', error));