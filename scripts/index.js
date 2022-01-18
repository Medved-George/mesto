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

//Модалка для фото
export const popupForPhoto = document.querySelector('.popup_type_photo');
export const photoImg = popupForPhoto.querySelector('.photo__img');
export const photoTitle = popupForPhoto.querySelector('.photo__title');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//Массив с карточками
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupHandler);
}

function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupHandler);
}

const closePopupHandler = (evt) => {
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

function handlePhotoSubmit() {
    const newCard = new Card(linkInput.value, placeInput.value).renderCard();
    cards.prepend(newCard);
    closePopup(popupForCard);
    placeInput.value = '';
    linkInput.value = '';
    if ((placeInput.value && linkInput.value) === '') {
        submitButtonForPhoto.classList.add('popup__button_disabled');
        submitButtonForPhoto.disabled = true;
    };
}

const renderInitialCards = () => {
    initialCards.forEach(item => {
        const newInitialCard = new Card(item.link, item.name).renderCard();
        cards.append(newInitialCard);
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

const validation = new FormValidator();

validation.enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

import Card from './card.js';
import FormValidator from './formValidator.js';