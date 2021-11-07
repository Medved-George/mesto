let popUp = document.querySelector('.pop-up'); //Попап
let editButton = document.querySelector('.profile__edit-button'); //Кнопка редактирования профиля
let closeButton = document.querySelector('.pop-up__close-button'); //Кнопка закрытия попап

let formElement = document.querySelector('.pop-up__form'); //Форму

let nameInput = document.querySelector('.pop-up__input_type_name'); //Пле ввода имени
let jobInput = document.querySelector('.pop-up__input_type_job'); //Поле ввода профессии

let profileName = document.querySelector('.profile__name'); //Имя
let profileJob = document.querySelector('.profile__job'); //Профессия

function openPopUp() {
    popUp.classList.add('pop-up_opened'); //Открытие попап
    nameInput.value = profileName.textContent; //Записываем в поля редактирования данные из разметки
    jobInput.value = profileJob.textContent;
}

function closePopUp() {
    popUp.classList.remove('pop-up_opened'); //Скрытие попап
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value; //Записываем новые данные в разметку
    profileJob.textContent = jobInput.value;

    closePopUp();
}

editButton.addEventListener('click', openPopUp);
closeButton.addEventListener('click', closePopUp);

formElement.addEventListener('submit', formSubmitHandler);

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

const cardTemplate = document.querySelector('#card').content; //Получаем шаблон карточки
const cards = document.querySelector('.cards'); //Находим контейнер, куда попадут карточки


for (let i = 0; i <= initialCards.length; i++) {
    let cardElement = cardTemplate.querySelector('.card').cloneNode(true); //Копируем шаблон
    cardElement.querySelector('.card__photo').src = initialCards[i].link; //Записываем в атрибутты данные из массива
    cardElement.querySelector('.card__name').textContent = initialCards[i].name;
    cards.append(cardElement); //Добавляем в контейнер
}