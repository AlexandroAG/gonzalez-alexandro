import { getPokemon, renderPokemon, sanitizeName } from './pokemon.js';

const htmlElements = {
  form: document.querySelector('#pokemon-form'),
  details: document.querySelector('#pokemon-details'),
  clearButton: document.querySelector('#clear-btn'), 
  pokemonNameInput: document.querySelector('[name="pokemon-name"]'), 
};

const getFormData = (form) => {
  const formData = new FormData(form);
  return formData.get('pokemon-name');
};

const handleError = () => {
  alert('Por favor, ingrese un nombre válido');
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

  } catch (error) {
    handleError();
  }
};

const clearResults = () => {
  htmlElements.details.innerHTML = '';
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