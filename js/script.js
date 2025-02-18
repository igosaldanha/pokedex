const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonName = document.querySelector('.pokemon-name');
const pokemonImage = document.querySelector('.pokemon-image');
const form = document.querySelector('.form-search');
const input  = document.querySelector('.input-search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;



const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   
    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
   
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    //pokemonImage.src = 'https://i.gifer.com/origin/50/507070efd95d3b5c7c1ff0241e7954cf_w200.gif';

    const data = await fetchPokemon(pokemon);

    if(data) {

        pokemonImage.style.display = 'block';
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;

    } else {
        pokemonImage.style.display = 'none';
        pokemonNumber.innerHTML = "";
        pokemonName.innerHTML = "Not fund :C";
    }

   
}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());

});

btnPrev.addEventListener('click', () => {

    if(searchPokemon > 1) {
        searchPokemon--;
        renderPokemon(searchPokemon);
    }

});

btnNext.addEventListener('click', () => {

    searchPokemon += 1;
    renderPokemon(searchPokemon);

});

renderPokemon(searchPokemon);