const editButton = document.querySelector('.profile__edit-button'); //Кнопка редактирования профиля
const newCardButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточки
const page = document.querySelector('.page');
const cards = document.querySelector('.cards'); //Контейнер для карточек
const popupTemplate = document.querySelector('#popup').content;
const popupElementForProfile = popupTemplate.querySelector('.pop-up').cloneNode(true);
page.appendChild(popupElementForProfile);
const closeButtonForProfile = popupElementForProfile.querySelector('.pop-up__close-button');
const formElementForProfile = popupElementForProfile.querySelector('.pop-up__form');
let nameInput = popupElementForProfile.querySelector('.pop-up__input_type_name');
let jobInput = popupElementForProfile.querySelector('.pop-up__input_type_job');
const popupElementForCard = popupTemplate.querySelector('.pop-up').cloneNode(true);
page.appendChild(popupElementForCard);
const closeButtonForCard = popupElementForCard.querySelector('.pop-up__close-button'); //Кнопка закрытия попап
const formElementForCard = popupElementForCard.querySelector('.pop-up__form');
let placeInput = popupElementForCard.querySelector('.pop-up__input_type_place');
let linkInput = popupElementForCard.querySelector('.pop-up__input_type_link');
const cardTemplate = document.querySelector('#card').content; //Шаблон карточки
const photoTemplate = document.querySelector('#photo').content;
const photoElement = photoTemplate.querySelector('.photo').cloneNode(true);
page.appendChild(photoElement);
let photoImg = photoElement.querySelector('.photo__img');
let photoTitle = photoElement.querySelector('.photo__title');
const photoCloseBtn = photoElement.querySelector('.photo__close-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

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

function openPopupForProfile() {
    popupElementForProfile.classList.toggle('pop-up_opened');
}

function openPopupForCard() {
    popupElementForCard.classList.toggle('pop-up_opened');
}

function closePopupForProfile() {
    popupElementForProfile.classList.toggle('pop-up_opened');
}

function closePopupForCard() {
    popupElementForCard.classList.toggle('pop-up_opened')
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopupForProfile();
}

function photoSubmitHandler(evt) {
    evt.preventDefault();
    const newCardElement = cardTemplate.querySelector('.card').cloneNode(true);
    newCardElement.querySelector('.card__photo').src = linkInput.value;
    newCardElement.querySelector('.card__name').textContent = placeInput.value;
    cards.prepend(newCardElement);
    closePopupForCard();
    deleteCard();
    likeCard();
    initialCards.push({
        name: placeInput.value,
        link: linkInput.value
    })
}

function cardsRender() {
    initialCards.forEach(item => {
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
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

function getCards() {
    card.forEach(elem => {
        const cardPhotoActive = elem.querySelectorAll('.card__photo');
        let cardPhoto = elem.querySelectorAll('.card__photo');
        let cardName = elem.querySelectorAll('.card__name');

        cardPhoto.forEach(photo => {
            cardPhoto = photo.getAttribute('src');
        })
        cardName.forEach(name => {
            cardName = name.textContent;
        })

        function showPhoto() {
            cardPhotoActive.forEach(item => {
                item.addEventListener('click', () => {
                    photoElement.classList.toggle('photo_opened');
                    photoImg.src = cardPhoto;
                    photoTitle.textContent = cardName;
                })
            })
        }
        showPhoto();
    })
    photoCloseBtn.addEventListener('click', () => photoElement.classList.toggle('photo_opened'));
}

cardsRender();
deleteCard();
likeCard();

let card = document.querySelectorAll('.card');

getCards();

editButton.addEventListener('click', () => {
    openPopupForProfile();
    document.querySelector('.pop-up__title').textContent = 'Редактирование профиля';
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    nameInput.setAttribute('placeholder', 'Ваше имя');
    jobInput.setAttribute('placeholder', 'Ваша профессия');

    closeButtonForProfile.addEventListener('click', closePopupForProfile);
    formElementForProfile.addEventListener('submit', formSubmitHandler);
});
newCardButton.addEventListener('click', () => {
    openPopupForCard();
    popupElementForCard.querySelector('.pop-up__title').textContent = 'Новое место';
    placeInput.value = '';
    placeInput.setAttribute('placeholder', 'Название');
    linkInput.value = '';
    linkInput.setAttribute('placeholder', 'Ссылка на картинку');
    closeButtonForCard.addEventListener('click', closePopupForCard);
    formElementForCard.addEventListener('submit', photoSubmitHandler);
});