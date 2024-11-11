const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';
const ABILITY_API_URL = 'https://pokeapi.co/api/v2/ability/';

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
    throw new Error(`No se pudo obtener el Pokémon: ${name}`);
  }

  const pokemonData = await response.json();

  const speciesResponse = await fetch(pokemonData.species.url);
  if (!speciesResponse.ok) {
    throw new Error('No se pudo obtener los datos de la especie');
  }
  const speciesData = await speciesResponse.json();

  const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
  if (!evolutionChainResponse.ok) {
    throw new Error('No se pudo obtener la cadena de evolución');
  }
  const evolutionChainData = await evolutionChainResponse.json();

  return {
    ...pokemonData,
    evolutionChain: evolutionChainData.chain
  };
};

const getAbility = async (abilityName) => {
  const sanitized = sanitizeName(abilityName);
  const response = await fetch(`${ABILITY_API_URL}${sanitized}`);

  if (!response.ok) {
    throw new Error('No se pudo obtener la habilidad');
  }

  const abilityData = await response.json();
  return abilityData;
};

const renderPokemon = (template, pokemon) => {
  if (template.querySelector(`#pokemon-${pokemon.id}`)) {
    return;
  }

  const { name, id, sprites, abilities, weight, height, evolutionChain } = pokemon;

  const evolutionList = [];
  let currentEvolution = evolutionChain;
  while (currentEvolution) {
    evolutionList.push(currentEvolution.species.name);
    currentEvolution = currentEvolution.evolves_to[0];
  }

  const abilitiesList = abilities.map(({ ability }) => ability.name);

  const html = `
    <div class="pokemon-card" id="pokemon-${id}">
      <div class="pokemon-card__header">
        <h1>${name} (#${id})</h1>
      </div>
      <div class="pokemon-card__body1">
        <h3>Sprites</h3>        
        <p><strong>Weight/Height</strong></p>
      </div>
      <div class="pokemon-card__body4">
        <img src="${sprites.front_default}" alt="${name}" />
        <img src="${sprites.back_default}" alt="${name}" />
        ${weight / 10} kg / ${height / 10} m
      </div>    
      <div class="pokemon-card__body2">
        <h3>Evolution Chain</h3>
        <h3>Abilities</h3>
      </div>
      <div class="pokemon-card__body3">
        <ul>${evolutionList.map(evo => `<li>${evo}</li>`).join('')}</ul>
        <ul>${abilitiesList.map(ability => `<li>${ability}</li>`).join('')}</ul>
      </div>
    </div>
  `;

  const div = document.createElement('div');
  div.innerHTML = html;
  template.appendChild(div.firstChild);
};

export {
  getPokemon,
  renderPokemon,
  sanitizeName,
  getAbility,
};
