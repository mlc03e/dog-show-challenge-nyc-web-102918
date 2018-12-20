document.addEventListener('DOMContentLoaded', () => {
  let allDogs = []
  const tableBody = document.getElementById("table-body")
  const dogForm = document.querySelector("#dog-form")

  function fetchDogs() {
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(dogs => {
      allDogs = dogs
      console.log(allDogs);
      tableBody.innerHTML = ''
      dogs.forEach((dog) =>{
        // allDogs.push(dog)
        // console.log(allDogs)
        tableBody.innerHTML += `
                            <tr>
                              <td>Dog ${dog.name}</td>
                              <td>${dog.breed}</td>
                              <td>${dog.sex}</td>
                              <td><button data-id='${dog.id}' data-action="edit-dog">Edit</button></td>
                            </tr>`
      })
    });
  }
  fetchDogs()

  tableBody.addEventListener("click", (event) => {
    if (event.target.dataset.action === "edit-dog") {

      const dogId = parseInt(event.target.dataset.id)
      const foundDog = allDogs.find(dog => dog.id === dogId)

      dogForm.name.value = foundDog.name
      dogForm.breed.value = foundDog.breed
      dogForm.sex.value = foundDog.sex

      dogForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const body = { name: event.target.name.value,
                      breed:event.target.breed.value,
                      sex: event.target.sex.value}

        const config = {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"},
          body: JSON.stringify(body)
        }
        fetch(`http://localhost:3000/dogs/${dogId}`, config)
        .then(() => {

          //clear the form
          dogForm.name.value = ""
          dogForm.breed.value = ""
          dogForm.sex.value = ""

          fetchDogs()
        })
      })
    }
  })


})
