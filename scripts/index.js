const editButton = document.querySelector('.profile__edit-button'); //Кнопка редактирования профиля
const newCardButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточки
const page = document.querySelector('.page');
const cards = document.querySelector('.cards'); //Контейнер для карточек

//Модалка для профиля
const popupForProfile = document.querySelector('.pop-up_type_profile');
const closeButtonForProfile = popupForProfile.querySelector('.pop-up__close-button');
const formElementForProfile = popupForProfile.querySelector('.pop-up__form');
const nameInput = popupForProfile.querySelector('.pop-up__input_type_name');
const jobInput = popupForProfile.querySelector('.pop-up__input_type_job');

//Модалка для добавления карточки
const popupForCard = document.querySelector('.pop-up_type_card');
const closeButtonForCard = popupForCard.querySelector('.pop-up__close-button');
const formElementForCard = popupForCard.querySelector('.pop-up__form');
const placeInput = popupForCard.querySelector('.pop-up__input_type_place');
const linkInput = popupForCard.querySelector('.pop-up__input_type_link');

//Модалка для фото
const popupForPhoto = document.querySelector('.pop-up_type_photo');

const photoCloseBtn = popupForPhoto.querySelectorAll('.photo__close-button');

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
    element.classList.toggle('pop-up_opened');
}

function closePopup(element) {
    element.classList.toggle('pop-up_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupForProfile);
}

//Создание карточки
const getNewCard = () => {
    const createdCard = cardTemplate.querySelector('.card').cloneNode(true);
    return createdCard;
}

function photoSubmitHandler(evt) {
    evt.preventDefault();
    cards.prepend(getNewCard());
    getNewCard().querySelector('.card__photo').src = linkInput.value;
    getNewCard().querySelector('.card__name').textContent = placeInput.value;
    closePopup(popupForCard);
}

function cardsRender() {
    initialCards.forEach(item => {
        const cardElement = getNewCard();

        cardElement.querySelector('.card__photo').src = item.link;
        cardElement.querySelector('.card__name').textContent = item.name;
        cards.append(cardElement);
    });
}

function deleteCard() {
    let deleteButton = document.querySelectorAll('.card__delete-button');
    deleteButton.forEach(item => {
        item.addEventListener('click', () => {
            const deleteElement = item.closest('.card');
            deleteElement.remove();
        });
    });
}

function likeCard() {
    let likeButton = document.querySelectorAll('.card__like-button');
    likeButton.forEach(item => {
        item.addEventListener('click', () => item.classList.toggle('card__like-button_active'));
    });
}

editButton.addEventListener('click', () => {
    openPopup(popupForProfile);
    document.querySelector('.pop-up__title').textContent = 'Редактирование профиля';
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    nameInput.setAttribute('placeholder', 'Ваше имя');
    jobInput.setAttribute('placeholder', 'Ваша профессия');

    closeButtonForProfile.addEventListener('click', () => closePopup(popupForProfile));
    formElementForProfile.addEventListener('submit', formSubmitHandler);
});

newCardButton.addEventListener('click', () => {
    openPopup(popupForCard);
    popupForCard.querySelector('.pop-up__title').textContent = 'Новое место';
    placeInput.value = '';
    placeInput.setAttribute('placeholder', 'Название');
    linkInput.value = '';
    linkInput.setAttribute('placeholder', 'Ссылка на картинку');
    closeButtonForCard.addEventListener('click', () => closePopup(popupForCard));
    formElementForCard.addEventListener('submit', photoSubmitHandler);
});

cardsRender();

const card = document.querySelectorAll('.card');
const cardPhoto = document.querySelectorAll('.card__photo');
const cardName = document.querySelectorAll('.card__name');
const photoImg = document.querySelector('.photo__img');
const photoTitle = document.querySelector('.photo__title');

function previewCard(photoData) {
    openPopup(popupForPhoto);
    photoImg.src = photoData.src;
    photoTitle.textContent = photoData.parentNode.querySelector('.card__name').textContent;
}

cardPhoto.forEach(item => item.addEventListener('click', () => previewCard(item)));
photoCloseBtn.forEach(item => item.addEventListener('click', () => closePopup(popupForPhoto)));