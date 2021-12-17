const editButton = document.querySelector('.profile__edit-button'); //Кнопка редактирования профиля
const newCardButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточки
const page = document.querySelector('.page');
const cards = document.querySelector('.cards'); //Контейнер для карточек

//Модалка для профиля
const popupForProfile = document.querySelector('.popup_type_profile');
const closeButtonForProfile = popupForProfile.querySelector('.popup__close-button');
const formElementForProfile = popupForProfile.querySelector('.popup__form');
const nameInput = popupForProfile.querySelector('.popup__input_type_name');
const jobInput = popupForProfile.querySelector('.popup__input_type_job');

//Модалка для добавления карточки
const popupForCard = document.querySelector('.popup_type_card');
const closeButtonForCard = popupForCard.querySelector('.popup__close-button');
const formElementForCard = popupForCard.querySelector('.popup__form');
const placeInput = popupForCard.querySelector('.popup__input_type_place');
const linkInput = popupForCard.querySelector('.popup__input_type_link');

//Модалка для фото
const popupForPhoto = document.querySelector('.pop-up_type_photo');
const photoImg = popupForPhoto.querySelector('.photo__img');
const photoTitle = popupForPhoto.querySelector('.photo__title');
const photoCloseBtn = popupForPhoto.querySelector('.photo__close-button');

const cardTemplate = document.querySelector('#card').content; //Шаблон карточки

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

function openPopup(element) {
    element.classList.add('popup_opened');
    element.childNodes[1].classList.add('popup__overlay_active');
    document.addEventListener('keydown', closePopupHandler);
}

function closePopup(element) {
    element.classList.remove('popup_opened');
    element.childNodes[1].classList.remove('popup__overlay_active');
    document.removeEventListener('keydown', closePopupHandler);
}

const closePopupHandler = (evt) => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
};

function formSubmitHandler() {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupForProfile);
}

//Создание карточки
const getNewCard = () => {
    const createdCard = cardTemplate.querySelector('.card').cloneNode(true);
    cards.append(createdCard);
    const deleteButton = createdCard.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(deleteButton));
    const likeButton = createdCard.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => likeCard(likeButton));
    const cardPhoto = createdCard.querySelector('.card__photo');
    cardPhoto.addEventListener('click', () => previewCard(cardPhoto));
    return createdCard;
}

function photoSubmitHandler() {
    const newCard = getNewCard();
    cards.prepend(newCard);
    newCard.querySelector('.card__photo').src = linkInput.value;
    newCard.querySelector('.card__name').textContent = placeInput.value;
    newCard.querySelector('.card__photo').alt = newCard.querySelector('.card__name').textContent;
    closePopup(popupForCard);
}

function cardsRender() {
    initialCards.forEach(item => {
        const cardElement = getNewCard();
        cardElement.querySelector('.card__photo').src = item.link;
        cardElement.querySelector('.card__name').textContent = item.name;
        cardElement.querySelector('.card__photo').alt = cardElement.querySelector('.card__name').textContent;
    });
}

function previewCard(photoData) {
    const overlay = popupForPhoto.querySelector('.popup__overlay');

    openPopup(popupForPhoto);
    photoImg.src = photoData.src;
    photoTitle.textContent = photoData.parentNode.querySelector('.card__name').textContent;
    photoImg.alt = photoTitle.textContent;

    overlay.addEventListener('click', () => closePopup(popupForPhoto));
}

function deleteCard(deleteButton) {
    deleteButton.closest('.card').remove();
}

function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_active');
}

editButton.addEventListener('click', () => {
    const overlay = popupForProfile.querySelector('.popup__overlay');

    openPopup(popupForProfile);

    document.querySelector('.popup__title').textContent = 'Редактирование профиля';
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    nameInput.setAttribute('placeholder', 'Ваше имя');
    jobInput.setAttribute('placeholder', 'Ваша профессия');

    closeButtonForProfile.addEventListener('click', () => closePopup(popupForProfile));
    overlay.addEventListener('click', () => closePopup(popupForProfile));
    formElementForProfile.addEventListener('submit', formSubmitHandler);
});

newCardButton.addEventListener('click', () => {
    const overlay = popupForCard.querySelector('.popup__overlay');

    openPopup(popupForCard);

    popupForCard.querySelector('.popup__title').textContent = 'Новое место';
    placeInput.value = '';
    placeInput.setAttribute('placeholder', 'Название');
    linkInput.value = '';
    linkInput.setAttribute('placeholder', 'Ссылка на картинку');

    closeButtonForCard.addEventListener('click', () => closePopup(popupForCard));
    overlay.addEventListener('click', () => closePopup(popupForCard));
    formElementForCard.addEventListener('submit', photoSubmitHandler);
});

cardsRender();

photoCloseBtn.forEach(item => item.addEventListener('click', () => closePopup(popupForPhoto)));