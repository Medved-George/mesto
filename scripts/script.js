let popUp = document.querySelector('.pop-up');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.pop-up__close-button');
let pageOverlay = document.querySelector('.page');

function openPopUp () {
    popUp.classList.add('pop-up_opened');
}

function closePopUp () {
    popUp.classList.remove('pop-up_opened');
}

let page = document.querySelector('.page');
let overlay = document.querySelector('.overlay');

function openPopUp () {
    popUp.classList.add('pop-up_opened');
    overlay.classList.add('overlay_active');
}

function closePopUp () {
    popUp.classList.remove('pop-up_opened');
    overlay.classList.remove('overlay_active');
}

editButton.addEventListener('click', openPopUp);
closeButton.addEventListener('click', closePopUp);


let formElement = document.querySelector('.pop-up__form');

let nameInput = document.querySelector('.pop-up__input_type_name');
let jobInput = document.querySelector('.pop-up__input_type_job');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault();

    let newProfileName = nameInput.value;
    let newProfileJob = jobInput.value;

    profileName.textContent = newProfileName;
    profileJob.textContent = newProfileJob;

    closePopUp();
}

formElement.addEventListener('submit', formSubmitHandler); 