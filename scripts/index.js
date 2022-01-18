import {
    initialCards
} from './initial-cards.js';
import {
    Card
} from './card.js';
import {
    FormValidator
} from './formValidator.js';

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
export const placeInput = popupForCard.querySelector('.popup__input_type_place');
export const linkInput = popupForCard.querySelector('.popup__input_type_link');
export const submitButtonForPhoto = popupForCard.querySelector('.popup__button');

//Модалка для фото
export const popupForPhoto = document.querySelector('.popup_type_photo');
export const photoImg = popupForPhoto.querySelector('.photo__img');
export const photoTitle = popupForPhoto.querySelector('.photo__title');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

export function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
};

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
});

renderInitialCards();

const selectorsForValidation = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const addValidator = (form, selectors) => {
    const newValidator = new FormValidator(form, selectors);
    newValidator.enableValidation();
    newValidator.disableSubmitBtn();
    return newValidator;
}

const addCardFormValidator = addValidator(popupFormForCard, selectorsForValidation);
const editProfileFormValidator = addValidator(popupFormForProfile, selectorsForValidation);