// Скрипты для меню-бургера
const navMenu = document.querySelector('.nav__menu');
const navBurger = document.querySelector('.nav__burger');
const navItem = document.querySelector('.nav__item');

document.addEventListener("click", menu);
function menu(event){
    if(event.target.closest('.nav__burger')){
        navMenu.classList.toggle('active');
        navBurger.classList.toggle('active');
        navItem.classList.toggle('active');
    }
    if(event.target.closest('.nav__item')){
        navMenu.classList.remove('active');
        navBurger.classList.remove('active');
        navItem.classList.remove('active');
    }
}

//==============================================================

// Скрипты для модального окна

const popupLinks = document.querySelectorAll('.popup__link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock__padding');
const popup = document.querySelector('.popup')

let unlock = true;

const timeOut = 800;

document.addEventListener("click", close);
function close(event){
    if(event.target.closest('.close-popup')){
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
}
// Проверка на существование объекта
if(popupLinks.length > 0){
    for(let index = 0; index < popupLinks.length; index++){
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function(e){
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup){
    if(curentPopup && unlock){
        const popupActive = document.querySelector('.popup.open');
        if(popupActive){
            popupClose(popupActive, false);
        }else{
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function(e){
            if(!e.target.closest('.popup__content')){
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true){
    if(unlock){
        popupActive.classList.remove('open');
        if(doUnlock){
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';

    if(lockPadding.length > 0){
        for(let index = 0; index < lockPadding.length; index++){
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
    unlock = false;
    setTimeout(function(){
        unlock = true;
    }, timeOut);    
}

function bodyUnLock() {
    setTimeout(function(){
        if(lockPadding.length > 0){
            for (let index = 0; index < lockPadding.length; index++){
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeOut);

    unlock = false;
    setTimeout(function(){
        unlock = true;
    },timeOut);
}

document.addEventListener("keydown", function(event){
    console.log(event.code);
    if(event.code == 'Escape'){
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

//=======================================================================================

// Инициализируем swiper 
new Swiper('.team-slider',{
    navigation: {
        nextEl: '.team-next',
        prevEl: '.team-prev'
    },
    slideToClickedSlide: true,
    simulateTouch: true,
    // Чувствительность свайпа
    touchRatio: 1,
    // Угол срабатывания свайпа/перетаскивания
    touchAngle: 45,
    // Курсор перетаскивания
    grabCursor: true,

    // Переключение при клике на слайд
    slideToClickedSlide: true,

    // Навигация по хешу
    hashNavigation: {
        // Отслеживать состояние
        watchStte: true,
    },

    // Управление клавиатурой 
    keyboard: {
        // Включить/выключить
        enabled: true,
        // Включить/выключить только когда слайдер в пределах вьюпорта
        onlyViewport: true,
        // Включить/выключить управления клавишами
        // pageUp, pageDown
        pageUpDown: true, 
    },
    // Управление колесом мыши
    mousewheel: {
        // Чувствительность колеса мыши
        sensitivity: 1,
        // Класс объекта на котором будет срабатывать прокрутка
        eventsTarget: ".team-slider",
    },
    // Автовысота
    autoHeight: false,
    // Количество слайдов для показа
    slidesPerView: 4,
    // Отключение функционала если слайдов меньше чем нужно
    watchOverflow: true,
    // Отступ между слайдами
    spaceBetween: 20,
    // Количество пролистываемых слайдов
    slidesPerGroup: 1,
    // Активный слайд по центру
    centeredSlides: false,
    // Стартовый слайд
    initialSlide: 0,    
     // Бесконечный слайдер
    loop: true,
     // Кол-во дублируемых слайдов
    loopedSlides: 0,
     // Свободный режим
    freeMode: true,
    // Брейк поинты (адаптив)
    // ширина экрана
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        480: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        }
    },
    // Отключить предзагрузку картинок
    preloadImages: false,
    // Lazy Loading (Подзагрузка картинок)
    lazy: {
        // Подгружать на старте
        // Переключения слайда
        loadOnTransitionStart: false,
        // Подгрузить картинки
        // и следующую картинку
        loadPrevNext: true,
    },
    // Слежка за видимыми слайдами
    watchSlidesProgress: true,
    // Добавление класса видимым слайдам 
    watchSlidesVisibility: true,
});