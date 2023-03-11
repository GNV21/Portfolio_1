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
