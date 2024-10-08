const riddlesTR = [
    { question: "En çok kardeşi olan meyve hangi meyvedir?", answer: "üzüm" },
    { question: "Dışı var, içi yok; Tekme yer, suçu yok.", answer: "top" },
    { question: "Akşam baktım çok idi, Sabah baktım yok idi.", answer: "yıldız" },
    { question: "Bir küçük fıçıcık, içi dolu turşucuk.", answer: "limon" },
    { question: "O odanın içinde, oda onun içinde.", answer: "ayna" }
];

const riddlesEN = [
    { question: "What can fill an entire room but doesn’t take up any space at all?", answer: "light" },
    { question: "You can remove its skin and it won’t cry- but you may.", answer: "onion" },
    { question: "Which word becomes shorter when you add 2 more letters to it?", answer: "short" },
    { question: "Where does Thursday come after Friday?", answer: "dictionary" },
    { question: "Where are the lakes empty, the mountains flat and the rivers still?", answer: "map" }
];

let currentLanguage = 'en';
let currentRiddle = getRandomRiddle();

document.addEventListener("DOMContentLoaded", () => {
    const englishButton = document.getElementById("english-button");
    const turkishButton = document.getElementById("turkish-button");
    const answerInput = document.getElementById('answer-input');

    const elementsToTranslate = document.querySelectorAll('[data-en]');

    const switchToEnglish = () => {
        elementsToTranslate.forEach(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.setAttribute("placeholder", el.getAttribute("data-en"));
            } else {
                el.textContent = el.getAttribute("data-en");
            }
        });
        localStorage.setItem('language', 'en');
        currentLanguage = 'en';
        updateRiddle();
    };

    const switchToTurkish = () => {
        elementsToTranslate.forEach(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.setAttribute("placeholder", el.getAttribute("data-tr"));
            } else {
                el.textContent = el.getAttribute("data-tr");
            }
        });
        localStorage.setItem('language', 'tr');
        currentLanguage = 'tr';
        updateRiddle();
    };

    englishButton.addEventListener("click", switchToEnglish);
    turkishButton.addEventListener("click", switchToTurkish);

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en') {
        switchToEnglish();
    } else if (savedLanguage === 'tr') {
        switchToTurkish();
    } else {
        switchToEnglish();
    }
});

document.getElementById('answer-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let userAnswer = event.target.value.trim().toLowerCase();
        
        if (userAnswer === currentRiddle.answer.toLowerCase()) {
            window.location.href = 'main.html';
        } else {
            alert(currentLanguage === 'tr' ? 'Yanlış cevap, tekrar deneyin!' : 'Wrong answer, try again!');
        }
    }
});

function getRandomRiddle() {
    let riddles = currentLanguage === 'tr' ? riddlesTR : riddlesEN;
    let randomIndex = Math.floor(Math.random() * riddles.length);
    return riddles[randomIndex];
}

function updateRiddle() {
    currentRiddle = getRandomRiddle();
    document.getElementById('riddle-text').textContent = currentRiddle.question;
}

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('copy', function(e) {
    e.preventDefault();
    alert('Kopyalama işlemi devre dışı bırakıldı.');
});