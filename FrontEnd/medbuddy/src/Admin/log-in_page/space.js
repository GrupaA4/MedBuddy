window.addEventListener('resize', function() {
    var screenWidth = window.innerWidth;
    var textContent1 = document.querySelector('.square__form__button2');
    var textContent2 = document.querySelector('.square__form__button3');
    
    if (screenWidth < 940) {
        // Adaugă <br> între paragrafe
        textContent1.innerHTML = textContent1.innerHTML.replace('SIGN-UP AS PACIENT', 'SIGN-UP AS <br> PACIENT');
        textContent2.innerHTML = textContent2.innerHTML.replace('SIGN-UP AS DOCTOR', 'SIGN-UP AS <br> DOCTOR');
    } else {
        // Elimină <br> între paragrafe
        textContent1.innerHTML = textContent1.innerHTML.replace('SIGN-UP AS <br> PACIENT', 'SIGN-UP AS PACIENT');
        textContent2.innerHTML = textContent2.innerHTML.replace('SIGN-UP AS <br> DOCTOR', 'SIGN-UP AS DOCTOR');
    }
});