const NumberApp = (() => {
    let numbers = [];
    let availableNumbers = Array.from({ length: 99 }, (_, i) => i + 1); // Números del 1 al 99

    const htmlElements = {
        generateBtn: document.getElementById('generateBtn'),
        ascBtn: document.getElementById('ascBtn'),
        descBtn: document.getElementById('descBtn'),
        numberGrid: document.getElementById('numberGrid')
    };

    const handlers = {
        onGenerateClick() {
            if (availableNumbers.length > 0) {
                generateNumber();
                updateNumberGrid();
            } else {
                alert("Ya se han generado todos los números.");
            }
        },
        onAscClick() {
            if (numbers.length > 0) {
                numbers.sort((a, b) => a - b);
                updateNumberGrid();
            } else {
                alert("Por favor, genera números primero.");
            }
        },
        onDescClick() {
            if (numbers.length > 0) {
                numbers.sort((a, b) => b - a);
                updateNumberGrid();
            } else {
                alert("Por favor, genera números primero.");
            }
        }
    };

    const generateNumber = () => {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const randomNum = availableNumbers.splice(randomIndex, 1)[0]; // Remueve y obtiene el número
        numbers.push(randomNum); // Lo agrega a los números generados
    };

    const updateNumberGrid = () => {
        htmlElements.numberGrid.innerHTML = ""; // Limpia la cuadrícula antes de agregar nuevos números

        numbers.forEach(num => {
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('number');
            numberDiv.textContent = num < 10 ? `0${num}` : num; // Formato de dos dígitos
            htmlElements.numberGrid.appendChild(numberDiv);
        });
    };

    const bindEvents = () => {
        htmlElements.generateBtn.addEventListener('click', handlers.onGenerateClick);
        htmlElements.ascBtn.addEventListener('click', handlers.onAscClick);
        htmlElements.descBtn.addEventListener('click', handlers.onDescClick);
    };

    return {
        init() {
            bindEvents();
        }
    };

})();

NumberApp.init();
