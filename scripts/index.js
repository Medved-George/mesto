import {
    initialCards
} from './initial-cards.js';
import {
    Card
} from './card.js';
import {
    FormValidator
} from './formValidator.js';
import {
    openPopup,
    closePopup
} from "./utils/utils.js";

const editButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const cards = document.querySelector('.cards');
const popups = document.querySelectorAll('.popup');

//Модалка для профиля
const popupForProfile = document.querySelector('.popup_type_profile');
const popupFormForProfile = popupForProfile.querySelector('.popup__form');
const nameInput = popupForProfile.querySelector('.popup__input_type_name');
const jobInput = popupForProfile.querySelector('.popup__input_type_job');

//Модалка для добавления карточки
const popupForCard = document.querySelector('.popup_type_card');
const popupFormForCard = popupForCard.querySelector('.popup__form');
const placeInput = popupForCard.querySelector('.popup__input_type_place');
const linkInput = popupForCard.querySelector('.popup__input_type_link');
const submitButtonForPhoto = popupForCard.querySelector('.popup__button');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const selectorsForValidation = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const addCardFormValidator = new FormValidator(popupFormForCard, selectorsForValidation);
const editProfileFormValidator = new FormValidator(popupFormForProfile, selectorsForValidation);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

function handleProfileSubmit() {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupForProfile);
}

const createCard = (link, name) => {
    const templateCard = document.querySelector('#card').content.querySelector('.card').cloneNode(true);
    const newCard = new Card(link, name, templateCard).renderCard();
    return newCard;
}

function handlePhotoSubmit() {
    cards.prepend(createCard(linkInput.value, placeInput.value));
    closePopup(popupForCard);
    placeInput.value = '';
    linkInput.value = '';
}

const renderInitialCards = () => {
    initialCards.forEach(item => {
        cards.append(createCard(item.link, item.name));
    })
};

popups.forEach(popup => {
    popup.addEventListener('click', evt => {
        if (evt.target.classList.contains('popup_opened')) closePopup(popup);
        else if (evt.target.classList.contains('popup__close-button')) closePopup(popup);
    });
});

popupFormForProfile.addEventListener('submit', handleProfileSubmit);

popupFormForCard.addEventListener('submit', handlePhotoSubmit);

editButton.addEventListener('click', () => {

    openPopup(popupForProfile);

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

newCardButton.addEventListener('click', () => {
    openPopup(popupForCard);

    if ((placeInput.value && linkInput.value) === '') {
        addCardFormValidator.disableSubmitBtn(submitButtonForPhoto);
    };
});

renderInitialCards();