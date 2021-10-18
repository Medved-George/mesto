let popUp = document.querySelector('.pop-up');
let editButton = document.querySelector('.edit-button');
let closeButton = document.querySelector('.pop-up__close-button');

function openPopUp () {
    popUp.classList.add('pop-up_opened');
}

function closePopUp () {
    popUp.classList.remove('pop-up_opened');
}

editButton.addEventListener('click', openPopUp);
closeButton.addEventListener('click', closePopUp);

let formElement = document.querySelector('.pop-up__form');
let nameInput = formElement.querySelector('.pop-up__input_type_name');
let jobInput = formElement.querySelector('.pop-up__input_type_job');
let profileName = document.querySelector('.profile__name').textContent;
let profileJob = document.querySelector('.profile__job').textContent;

nameInput.value = profileName;
jobInput.value = profileJob;

function formSubmitHandler (evt) {
    evt.preventDefault();

    nameInput = nameInput.value;
    jobInput = jobInput.value;

    let newProfileName = document.querySelector('.profile__name');
    let newProfileJob = document.querySelector('.profile__job');

    newProfileName.textContent = nameInput;
    newProfileJob.textContent = jobInput;

    closePopUp();
}

formElement.addEventListener('submit', formSubmitHandler); 