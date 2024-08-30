let formulario = document.getElementById("formulario");

formulario.addEventListener('submit', function(event) {
    
    event.preventDefault();

    let pokemon = document.getElementById("nome").value;
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokemon}/` ;

    fetch(apiURL).then(response => response.json()).then(data => {
        console.log(data);
    })

});
