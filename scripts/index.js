const editButton = document.querySelector('.profile__edit-button'); //Кнопка редактирования профиля
const newCardButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточки
const page = document.querySelector('.page');
const cards = document.querySelector('.cards'); //Контейнер для карточек
const popups = document.querySelectorAll('.popup');
const forms = document.querySelectorAll('.popup__form');

//Модалка для профиля
const popupForProfile = document.querySelector('.popup_type_profile');
const nameInput = popupForProfile.querySelector('.popup__input_type_name');
const jobInput = popupForProfile.querySelector('.popup__input_type_job');

//Модалка для добавления карточки
const popupForCard = document.querySelector('.popup_type_card');
const placeInput = popupForCard.querySelector('.popup__input_type_place');
const linkInput = popupForCard.querySelector('.popup__input_type_link');

//Модалка для фото
const popupForPhoto = document.querySelector('.popup_type_photo');
const photoImg = popupForPhoto.querySelector('.photo__img');
const photoTitle = popupForPhoto.querySelector('.photo__title');

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
    document.addEventListener('keydown', closePopupHandler);
    element.addEventListener('click', (evt) => {
        if (evt.target === element) {
            closePopup(element)
        };
    });
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
    cards.prepend(createCard());
    closePopup(popupForCard);
}

const createCard = () => {
    const createdCard = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = createdCard.querySelector('.card__delete-button');
    const likeButton = createdCard.querySelector('.card__like-button');
    const cardPhoto = createdCard.querySelector('.card__photo');


    createdCard.querySelector('.card__photo').src = linkInput.value;
    createdCard.querySelector('.card__name').textContent = placeInput.value;
    createdCard.querySelector('.card__photo').alt = createdCard.querySelector('.card__name').textContent;

    deleteButton.addEventListener('click', () => deleteCard(deleteButton));
    likeButton.addEventListener('click', () => likeCard(likeButton));
    cardPhoto.addEventListener('click', () => previewCard(cardPhoto));
    return createdCard;
};

const createInitialCards = (item) => {
    const cardElement = createCard();
    cardElement.querySelector('.card__photo').src = item.link;
    cardElement.querySelector('.card__name').textContent = item.name;
    cardElement.querySelector('.card__photo').alt = cardElement.querySelector('.card__name').textContent;
    return cardElement;
};

const initialCardsRender = () => {
    initialCards.forEach(item => cards.append(createInitialCards(item)));
};

function previewCard(photoData) {
    const photoCloseBtn = popupForPhoto.querySelector('.popup__close-button');

    openPopup(popupForPhoto);
    photoImg.src = photoData.src;
    photoTitle.textContent = photoData.parentNode.querySelector('.card__name').textContent;
    photoImg.alt = photoTitle.textContent;

    photoCloseBtn.addEventListener('click', () => closePopup(popupForPhoto));
}

function deleteCard(deleteButton) {
    deleteButton.closest('.card').remove();
}

function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_active');
}

popups.forEach(popup => {
    popup.addEventListener('click', evt => {
        if (evt.target.classList.contains('popup_opened')) closePopup(popup);
        else if (evt.target.classList.contains('popup__close-button')) closePopup(popup);
    });
});

forms.forEach(form => {
    form.addEventListener('submit', evt => {
        if (evt.target.classList.contains('popup__form_type_profile')) handleProfileSubmit();
        else if (evt.target.classList.contains('popup__form_type_card')) handlePhotoSubmit();
    });
});

editButton.addEventListener('click', () => {

    openPopup(popupForProfile);

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

newCardButton.addEventListener('click', () => {

    openPopup(popupForCard);

    placeInput.value = '';
    linkInput.value = '';
});

initialCardsRender();