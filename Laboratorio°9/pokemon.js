const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

const sanitizeName = (name) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z\-]/g, ''); 
};

const getPokemon = async (name) => {
  const sanitized = sanitizeName(name);
  const response = await fetch(`${POKEAPI_URL}/${sanitized}`);

  if (!response.ok) {
    throw new Error('No se pudo obtener el Pokémon');
  }

  const pokemonData = await response.json();

  return pokemonData;
};

const renderPokemon = (template, pokemon) => {
  if (template.querySelector(`#pokemon-${pokemon.id}`)) {
    return;
  }

  const { name, id, sprites, weight, height } = pokemon;

  const html = `
    <div class="pokemon-card" id="pokemon-${id}">
      <div class="pokemon-card__header">
        <h1>${name} (${id})</h1>
      </div>
      <div class="pokemon-card__body1">
        <h3>Sprites</h3>
        <p><strong>Weight/Height</strong></p>
      </div>
      <div class="pokemon-card__body4">
        <img src="${sprites.front_default}" alt="${name}" />
        <img src="${sprites.back_default}" alt="${name}" />
        <p>${weight} kg / ${height} m</p>
      </div>
    </div>
  `;

  template.innerHTML = html;
};

export {
  getPokemon,
  renderPokemon,
  sanitizeName,
};
