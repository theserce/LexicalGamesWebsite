document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.querySelector('#lightbox');
    const lightboxImage = document.querySelector('#lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');

    let currentUrl = '';

    function openModal(title, descriptionEN, descriptionTR, images, url) {
        const modal = document.querySelector('#modal-2');
        modal.querySelector('#modal-title2').textContent = title;

        const description = currentLanguage === 'tr' ? descriptionTR : descriptionEN;
        modal.querySelector('#modal-description2').textContent = description;

        const carouselContainer = modal.querySelector('.carousel-container');
        carouselContainer.innerHTML = '';

        images.forEach((imageSrc, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = imageSrc;
            imgElement.classList.add('carousel-slide');
            if (index === 0) imgElement.classList.add('active');
            imgElement.addEventListener('click', () => {
                lightboxImage.src = imageSrc;
                lightbox.classList.add('show');
            });
            carouselContainer.appendChild(imgElement);
        });

        const goButton = document.querySelector('#go-button');
    
        if (url) {
            goButton.style.display = 'block';
            currentUrl = url;
        } else {
            goButton.style.display = 'none';
        }

        modal.classList.add('show');

    }

    function closeModal() {
        const modal = document.querySelector('#modal-2');
        modal.classList.remove('show');
    }

    function closeLightbox() {
        lightbox.classList.remove('show');
    }

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.project-name').textContent;
            const descriptionEN = card.getAttribute('data-description-en');
            const descriptionTR = card.getAttribute('data-description-tr');
            const imageSrcList = card.getAttribute('data-images').split(',').map(src => src.trim());
            const url = card.getAttribute('data-url');
            openModal(title, descriptionEN, descriptionTR, imageSrcList, url);
        });
    });

    document.querySelector('.modal-close2').addEventListener('click', closeModal);

    document.querySelector('#modal-2').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    });

    const goButton = document.querySelector('#go-button');
    goButton.addEventListener('click', () => {
        if (currentUrl) {
            window.location.href = currentUrl;
        }
    });

    let currentSlide = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.carousel-slide');
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;

        slides.forEach((slide, idx) => {
            slide.classList.remove('active');
            if (idx === currentSlide) slide.classList.add('active');
        });
    }

    document.querySelector('.carousel-button.prev').addEventListener('click', () => {
        currentSlide--;
        showSlide(currentSlide);
    });

    document.querySelector('.carousel-button.next').addEventListener('click', () => {
        currentSlide++;
        showSlide(currentSlide);
    });

    const englishButton = document.getElementById("english-button");
    const turkishButton = document.getElementById("turkish-button");

    englishButton.addEventListener("click", switchToEnglish);
    turkishButton.addEventListener("click", switchToTurkish);

    function switchToEnglish() {
        currentLanguage = 'en';
        localStorage.setItem('language', 'en');
    }

    function switchToTurkish() {
        currentLanguage = 'tr';
        localStorage.setItem('language', 'tr');
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en') {
        switchToEnglish();
    } else {
        switchToTurkish();
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeLightbox();
        }
    });
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('copy', function(e) {
    e.preventDefault();
    alert('Kopyalama işlemi devre dışı bırakıldı.');
});