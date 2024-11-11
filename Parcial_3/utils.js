import { getPokemon, renderPokemon, sanitizeName, getAbility, renderAbility } from './pokemon.js';

const htmlElements = {
  form: document.querySelector('#pokemon-form'),
  details: document.querySelector('#pokemon-details'),
  abilities: document.querySelector('#pokemon-abilities'),
  clearButton: document.querySelector('#clear-btn'),
  pokemonNameInput: document.querySelector('[name="pokemon-name"]'),
};

const getFormData = (form) => {
  const formData = new FormData(form);
  return formData.get('pokemon-name');
};

const handleError = () => {
  alert('Por favor, ingrese un nombre válido de un Pokémon');
};

const handleFormSubmission = async (event) => {
  event.preventDefault();

  const pokemonName = getFormData(event.target);
  const sanitizedName = sanitizeName(pokemonName);

  if (!sanitizedName) {
    handleError();
    return;
  }

  try {
    const pokemon = await getPokemon(sanitizedName);
    renderPokemon(htmlElements.details, pokemon);
    htmlElements.clearButton.style.display = 'inline-block';

    const abilities = pokemon.abilities;
    htmlElements.abilities.innerHTML = '';

    for (const { ability } of abilities) {
      const abilityData = await getAbility(ability.name);
      renderAbility(htmlElements.abilities, abilityData);
    }

  } catch (error) {
    handleError();
  }
};

const clearResults = () => {
  htmlElements.details.innerHTML = '';
  htmlElements.abilities.innerHTML = '';
  htmlElements.pokemonNameInput.value = '';
  htmlElements.clearButton.style.display = 'none';
};

const bindEvents = () => {
  htmlElements.form.addEventListener('submit', handleFormSubmission);
  htmlElements.clearButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearResults();
  });
};

const init = () => {
  bindEvents();
};

init();
