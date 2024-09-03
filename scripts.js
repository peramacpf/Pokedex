let formulario = document.getElementById("formulario");

formulario.addEventListener('submit', function(event) {

    const coresPokemon = {
        "normal": "#AAAA9A",
        "fire": "#FF5031",
        "water": "#4195FB",
        "electric": "#FDCF48",
        "grass": "#73CC5D",
        "ice": "#6ACAFC",
        "fighting": "#BB5948",
        "poison": "#AB5798",
        "ground": "#DBBD5E",
        "flying": "#8D97FB",
        "psychic": "#FF5D99",
        "bug": "#A8BC36",
        "rock": "#BAAB6B",
        "ghost": "#705898",
        "dragon": "#7D63EA",
        "dark": "#775646",
        "steel": "#ABAABA",
        "fairy": "#F09AEC"
    };
    
    event.preventDefault();

    let pokemon = document.getElementById("nome_pokemon").value.toLowerCase();
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

    fetch(apiURL)
        .then(response => response.json())
        .then(dados => {
            
            const listaTipos = document.getElementById("tipos");
            listaTipos.innerHTML = "";
            const listaHabilidades = document.getElementById("habilidades");
            listaHabilidades.innerHTML = "";

            if (dados) {

                document.getElementById("pokemon").innerText = dados.name;

                dados.types.forEach(tipoPokemon => {
                    let li = document.createElement("li");
                    li.textContent = tipoPokemon.type.name;
                    li.style.cssText = `background-color: ${coresPokemon[tipoPokemon.type.name]};
                                        color: #fff; border: 1px solid #000;
                                        text-align: center; width: 50px;
                                        height: 20px; padding: 5px; 
                                        border-radius: 10px; display: 
                                        inline-block; 
                                        margin-right: 5px;`;
                    listaTipos.appendChild(li);
                });
                dados.abilities.forEach(habilidades => {
                    let li = document.createElement("li");
                    
                    fetch(habilidades.ability.url)
                    .then(response => response.json())
                    .then(dadosHabilidades => {
                        const descricaoHabilidade = dadosHabilidades.effect_entries.find(idioma => idioma.language.name === 'en'
                        );

                        li.textContent = dadosHabilidades.name + ": " + descricaoHabilidade.effect;
                    });
                listaHabilidades.appendChild(li);

                const imagem = document.getElementById("imagemPoke");

                imagem.src = dados.sprites.front_default;
                imagem.style.display = "block";
            });
            } else {
                console.log("Pokémon não encontrado!");
            }
            console.log(dados);
        })
        .catch(error => {
            console.error("Erro na requisição:", error);
        });
});

