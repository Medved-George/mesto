export class FormValidator {
    constructor(formSelector, selectors) {
        this._formSelector = formSelector;
        this._selectors = selectors;
    }
    enableValidation() {
        this._formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setInputValidation(this._formSelector, this._selectors);
    };
    disableSubmitBtn() {
        const popupForCard = document.querySelector('.popup_type_card');
        const placeInput = popupForCard.querySelector('.popup__input_type_place');
        const linkInput = popupForCard.querySelector('.popup__input_type_link');
        const submitButtonForPhoto = popupForCard.querySelector('.popup__button');

        if ((placeInput.value && linkInput.value) === '') {
            submitButtonForPhoto.classList.add(this._selectors.inactiveButtonClass);
            submitButtonForPhoto.disabled = true;
        };
    }
    _setInputValidation(form, {
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        ...other
    }) {
        const inputs = Array.from(form.querySelectorAll(inputSelector));
        const submitButton = form.querySelector(submitButtonSelector);

        this._toggleButtonError(inputs, submitButton, inactiveButtonClass);

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._toggleButtonError(inputs, submitButton, inactiveButtonClass);
                this._checkIfInputIsValid(form, input, other);
            });
        });
    };
    _checkIfInputIsValid(form, input, {
        inputErrorClass,
        errorClass
    }) {
        if (!input.validity.valid) this._showError(form, input, input.validationMessage, inputErrorClass, errorClass);
        else this._hideError(form, input, inputErrorClass, errorClass);
    };
    _toggleButtonError(inputs, button, inactiveButtonClass) {
        if (this._hasInvalidInput(inputs)) {
            button.classList.add(inactiveButtonClass);
            button.disabled = true;
        } else {
            button.classList.remove(inactiveButtonClass);
            button.disabled = false;
        }
    };
    _hasInvalidInput(inputs) {
        return Array.from(inputs).some((element) => !element.validity.valid);
    }
    _showError = (form, input, inputErrorMessage, inputErrorClass, errorClass) => {
        const errorMessage = form.querySelector(`#${input.id}-error`);
        errorMessage.textContent = inputErrorMessage;
        input.classList.add(inputErrorClass);
        errorMessage.classList.add(errorClass);
    };
    _hideError = (form, input, inputErrorClass, errorClass) => {
        const errorMessage = form.querySelector(`#${input.id}-error`);
        errorMessage.textContent = '';
        input.classList.remove(inputErrorClass);
        errorMessage.classList.remove(errorClass);
    };
}