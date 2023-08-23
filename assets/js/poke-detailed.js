const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToDetailedLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type} child">
        <span class="name">${pokemon.name}</span>                
        <span class="number">#${pokemon.number}</span>
            <div class="detail">    
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            
            <p>About</p>
                <span>Height: ${pokemon.height}</span>
                <span>Weight: ${pokemon.weight}</span>
            <p>Abilities:</p> 
                <ol>
                    ${pokemon.abilities.map((ability) => `<li class="abilities" ${ability}">${ability}</li>`).join('')}
                </ol>    
            </div>
        </li>
    `
}

function loadDetailedPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToDetailedLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadDetailedPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadDetailedPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadDetailedPokemonItens(offset, limit)
    }
})