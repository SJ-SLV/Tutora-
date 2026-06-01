(function() {
    // ========== CONFIGURAÇÃO DAS 18 FOTOS ==========
    // Substitua os caminhos e nomes pelos seus arquivos reais
    const photosArray = [
        { src: "IMG-20260529-WA0036.jpg", alt: "Instituto Médio Politécnico DUNO" },
        { src: "Cópia de Menção honrosa.jpg", alt: "Menção Honrosa - Melhor Tutora" },
        { src: "foto1.jpg", alt: "Momento 1" },
        { src: "foto2.jpg", alt: "Momento 2" },
        { src: "foto3.jpg", alt: "Momento 3" },
        { src: "foto4.jpg", alt: "Momento 4" },
        { src: "foto5.jpg", alt: "Momento 5" },
        { src: "foto6.jpg", alt: "Momento 6" },
        { src: "foto7.jpg", alt: "Momento 7" },
        { src: "foto8.jpg", alt: "Momento 8" },
        { src: "foto9.jpg", alt: "Momento 9" },
        { src: "foto10.jpg", alt: "Momento 10" },
        { src: "foto11.jpg", alt: "Momento 11" },
        { src: "foto12.jpg", alt: "Momento 12" },
        { src: "foto13.jpg", alt: "Momento 13" },
        { src: "foto14.jpg", alt: "Momento 14" },
        { src: "foto15.jpg", alt: "Momento 15" },
        { src: "foto16.jpg", alt: "Momento 16" }
    ];

    // Garantir que tenha 18 itens (caso falte algum)
    while(photosArray.length < 18) {
        photosArray.push({ src: "https://placehold.co/800x500?text=Foto+extra", alt: "Foto" });
    }
    if(photosArray.length > 18) photosArray.length = 18;

    // Elementos do carrossel
    const slidesContainer = document.getElementById('carouselSlides');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const counterSpan = document.getElementById('photoCounter');
    let currentIndex = 0;
    let autoInterval;
    const AUTO_INTERVAL_MS = 5000;

    function buildCarousel() {
        slidesContainer.innerHTML = '';
        dotsContainer.innerHTML = '';
        photosArray.forEach((photo, idx) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.alt;
            img.loading = 'lazy';
            img.onerror = () => {
                img.src = 'https://placehold.co/900x520?text=Imagem+não+disponível&font=Inter';
                img.alt = 'Conteúdo indisponível';
            };
            slide.appendChild(img);
            slidesContainer.appendChild(slide);

            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });
        updateCarouselUI();
        startAutoSlide();
    }

    function updateCarouselUI() {
        const offset = -currentIndex * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            if(i === currentIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
        if(counterSpan) counterSpan.innerText = `${currentIndex+1} / ${photosArray.length}`;
    }

    function goToSlide(index) {
        if(index < 0) index = photosArray.length - 1;
        if(index >= photosArray.length) index = 0;
        currentIndex = index;
        updateCarouselUI();
        resetAutoSlide();
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    function startAutoSlide() {
        if(autoInterval) clearInterval(autoInterval);
        autoInterval = setInterval(() => { nextSlide(); }, AUTO_INTERVAL_MS);
    }

    function resetAutoSlide() {
        if(autoInterval) clearInterval(autoInterval);
        startAutoSlide();
    }

    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });

    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => { if(autoInterval) clearInterval(autoInterval); });
    carouselContainer.addEventListener('mouseleave', () => { startAutoSlide(); });

    // ========== ÁUDIO ÚNICO ==========
    const audioPlayer = document.getElementById('mainAudioPlayer');
    const audioErrorDiv = document.getElementById('audioErrorMsg');

    function showAudioError(message) {
        audioErrorDiv.innerHTML = `<div class="error-msg"><i class="fas fa-exclamation-triangle"></i> ${message}</div>`;
        setTimeout(() => { audioErrorDiv.innerHTML = ''; }, 6000);
    }

    audioPlayer.addEventListener('error', () => {
        let errorMsg = "Não foi possível carregar o áudio. Verifique se o arquivo 'mensagem.mp3' está na mesma pasta.";
        if(audioPlayer.networkState === 3) errorMsg = "Falha de conexão ou arquivo não encontrado.";
        showAudioError(errorMsg);
    });

    audioPlayer.addEventListener('play', () => {
        if(audioErrorDiv.innerHTML) audioErrorDiv.innerHTML = '';
    });

    // ========== RODAPÉ COM LEGENDA ==========
    const LEGEND = "✨ para a melhor professora que já tivemos, nos agradecemos e que o senhor te abençoe ✨";
    const tickerElement = document.getElementById('tickerText');
    if(tickerElement) {
        let repeatedHTML = '';
        for(let i = 0; i < 6; i++) {
            repeatedHTML += `<span><i class="fas fa-star-of-life"></i> ${LEGEND} <i class="fas fa-hands-praying"></i> &nbsp;&nbsp;&nbsp;&nbsp;</span>`;
        }
        tickerElement.innerHTML = repeatedHTML;
    }

    // Inicializar carrossel
    buildCarousel();
    goToSlide(0);
})();