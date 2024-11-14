import axios from 'axios';

const getPokemonById = async (id) => {
    const response = await axios.get(`http://localhost:3000/pokemons/${id}`);
    return response.data;
};
export const getLineaEvolutiva = async (idPokemonActual) => {
    const linea = [];
    let pokemonActual = await getPokemonById(idPokemonActual);

    while (pokemonActual.idEvPrevia !== null) {
        pokemonActual = await getPokemonById(pokemonActual.idEvPrevia);
        linea.unshift(pokemonActual);
    }

    pokemonActual = await getPokemonById(idPokemonActual);
    linea.push(pokemonActual);

    while (pokemonActual.idEvSiguiente !== null) {
        pokemonActual = await getPokemonById(pokemonActual.idEvSiguiente);
        linea.push(pokemonActual);
    }

    return linea;
};
