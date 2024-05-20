const titleElement = document.querySelector('.container2__title');
const texts = [
    "Welcome back,", 
    "Admin!"
];

let index = 0;
let textIndex = 0;
let finalText = ''; // Variabila pentru a retine textul final

function writeText() {
    let currentText = texts[textIndex];

    if (index < currentText.length) {
        finalText += currentText[index];
        titleElement.innerHTML = finalText;
        index++;
        setTimeout(writeText, 100);
    } else {
        index = 0;
        textIndex++;
        if (textIndex < texts.length) {
            finalText += '<br>'; // Adauga <br> la finalul fiecarui text, pentru a afisa textele pe linii separate
            finalText += ' ';
            setTimeout(writeText, 100); // Adaugi un delay de 1 secundă între afișarea fiecărui text
        }
    }
}

setTimeout(writeText, 800);

function redirectTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}