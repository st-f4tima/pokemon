
// ERROR IN SEARCHING...
const imgElement = document.getElementById("pokemon_sprite");
const pokemonInfoElement = document.querySelector(".pokemon-info");
const nameElement = document.querySelector(".name"); 
const heightElement = document.querySelector(".height");
const typeElement = document.querySelector(".type");
const statsElement = document.querySelector(".stats");
const searchBtn = document.querySelector(".button-10"); 
const pokemonNameInput = document.getElementById("pokemonName");


searchBtn.addEventListener('click', () => {
    const pokemonName = pokemonNameInput.value.trim().toLowerCase();
    if (pokemonName !== '') {
        fetchData(pokemonName);
        pokemonNameInput.value = '';
        pokemonNameInput.blur();
    }
});

pokemonNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const pokemonName = pokemonNameInput.value.trim().toLowerCase();
        if (pokemonName !== '') {
            fetchData(pokemonName);
            pokemonNameInput.value = ''; 
            pokemonNameInput.blur();
        }
    }
});

async function fetchData(pokemonName) {
    try {
        if (!pokemonName) {
            alert("Please enter a Pokémon name!");
            return;
        }

        imgElement.style.display = "none";  
        nameElement.textContent = "Loading...";  
        heightElement.textContent = "-";
        typeElement.textContent = "-";
        statsElement.textContent = "-";
        pokemonInfoElement.style.display = "none";  

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;

        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        nameElement.textContent = data.name.toUpperCase(); 
        pokemonInfoElement.style.display = "flex"; 

        heightElement.textContent = `${data.height / 10}m`; 
        typeElement.textContent = data.types.map(t => t.type.name).join(", "); 
        statsElement.textContent = data.stats[0].base_stat;
    } 
    catch (error) {
        console.error(error);
        alert("Pokémon not found! Try another name.");
    }
}


