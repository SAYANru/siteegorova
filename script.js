// ЖДЕМ ПОЛНОЙ ЗАГРУЗКИ СТРАНИЦЫ
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== МОБИЛЬНОЕ МЕНЮ =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // ПЕРЕКЛЮЧАЕМ КЛАСС active
            navMenu.classList.toggle('active');
            
            // МЕНЯЕМ ИКОНКУ БУРГЕРА НА КРЕСТИК
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times'; // КРЕСТИК
            } else {
                icon.className = 'fas fa-bars'; // БУРГЕР
            }
        });
        
        // ЗАКРЫВАЕМ МЕНЮ ПРИ КЛИКЕ НА ССЫЛКУ (ТОЛЬКО НА ТЕЛЕФОНЕ)
        if (window.innerWidth <= 768) {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    menuToggle.querySelector('i').className = 'fas fa-bars';
                });
            });
        }
        
        // ЗАКРЫВАЕМ МЕНЮ ПРИ КЛИКЕ ВНЕ ЕГО (ТОЛЬКО НА ТЕЛЕФОНЕ)
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) {
                if (!navMenu.contains(event.target) && 
                    !menuToggle.contains(event.target) &&
                    navMenu.classList.contains('active')) {
                    
                    navMenu.classList.remove('active');
                    menuToggle.querySelector('i').className = 'fas fa-bars';
                }
            }
        });
    }
    
    // ===== ГАЛЕРЕЯ С КНОПКАМИ =====
    function initGallery(galleryId) {
        // НАХОДИМ ВСЕ ГАЛЕРЕИ НА СТРАНИЦЕ
        const galleryContainer = document.getElementById(galleryId);
        if (!galleryContainer) return;
        
        const images = galleryContainer.querySelectorAll('.gallery-image');
        const buttons = galleryContainer.querySelectorAll('.gallery-btn');
        
        if (images.length === 0 || buttons.length === 0) return;
        
        // ПОКАЗЫВАЕМ ПЕРВУЮ КАРТИНКУ
        images[0].classList.add('active');
        buttons[0].classList.add('active');
        
        // НАВЕШИВАЕМ СОБЫТИЯ НА КНОПКИ
        buttons.forEach((button, index) => {
            button.addEventListener('click', function() {
                // УБИРАЕМ active У ВСЕХ КАРТИНОК И КНОПОК
                images.forEach(img => img.classList.remove('active'));
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // ДОБАВЛЯЕМ active ВЫБРАННОЙ КАРТИНКЕ И КНОПКЕ
                images[index].classList.add('active');
                buttons[index].classList.add('active');
            });
        });
        
        // АВТОМАТИЧЕСКОЕ ПЕРЕКЛЮЧЕНИЕ (КАЖДЫЕ 5 СЕКУНД)
        if (images.length > 1) {
            let currentIndex = 0;
            let interval = setInterval(function() {
                // УВЕЛИЧИВАЕМ ИНДЕКС
                currentIndex = (currentIndex + 1) % images.length;
                
                // УБИРАЕМ active У ВСЕХ
                images.forEach(img => img.classList.remove('active'));
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // ДОБАВЛЯЕМ active НОВОЙ
                images[currentIndex].classList.add('active');
                buttons[currentIndex].classList.add('active');
            }, 5000);
            
            // ПАУЗА ПРИ НАВЕДЕНИИ МЫШИ
            galleryContainer.addEventListener('mouseenter', function() {
                clearInterval(interval);
            });
            
            galleryContainer.addEventListener('mouseleave', function() {
                interval = setInterval(function() {
                    currentIndex = (currentIndex + 1) % images.length;
                    images.forEach(img => img.classList.remove('active'));
                    buttons.forEach(btn => btn.classList.remove('active'));
                    images[currentIndex].classList.add('active');
                    buttons[currentIndex].classList.add('active');
                }, 5000);
            });
        }
    }
    
    // ЗАПУСКАЕМ ВСЕ ГАЛЕРЕИ НА СТРАНИЦЕ
    initGallery('gallery1'); // ПЛАН ОБУЧЕНИЯ
    initGallery('gallery2'); // ОБО МНЕ
    initGallery('gallery3'); // РЕЗУЛЬТАТЫ (фото 8-10)
    initGallery('gallery4'); // ОТЗЫВЫ
    
    // ===== АДАПТИВНОСТЬ =====
    window.addEventListener('resize', function() {
        // ЕСЛИ ПЕРЕШЛИ НА ДЕСКТОП - ЗАКРЫВАЕМ МОБИЛЬНОЕ МЕНЮ
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.querySelector('i').className = 'fas fa-bars';
            }
        }
    });
    
    // ===== ПЛАВНАЯ ПРОКРУТКА ДЛЯ ССЫЛОК =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // ЗАКРЫВАЕМ МЕНЮ НА ТЕЛЕФОНЕ
                if (window.innerWidth <= 768 && navMenu) {
                    navMenu.classList.remove('active');
                    menuToggle.querySelector('i').className = 'fas fa-bars';
                }
                
                // ПЛАВНАЯ ПРОКРУТКА
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Запрет правой кнопки мыши
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('Копирование контента запрещено');
});

// Запрет сочетаний клавиш Ctrl+C, Ctrl+U, F12
document.addEventListener('keydown', function(e) {
    // Ctrl+U (просмотр кода)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        alert('Просмотр кода страницы запрещен');
    }
    // F12 (инструменты разработчика)
    if (e.keyCode === 123) {
        e.preventDefault();
        alert('Инструменты разработчика отключены');
    }
    // Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        alert('Доступ запрещен');
    }
});
    
    console.log('✅ Сайт загружен и готов к работе!');
});
