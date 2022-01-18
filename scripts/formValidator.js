class FormValidator {
    constructor(selector) {
        this._selector = selector;
    }
    enableValidation({
        formSelector,
        ...other
    }) {
        const forms = Array.from(document.querySelectorAll(formSelector));
        forms.forEach((form) => {
            form.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setInputValidation(form, other);
        });
    };
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
                this._checkIfInputIsValid(form, input, other);
                this._toggleButtonError(inputs, submitButton, inactiveButtonClass);
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

export default FormValidator;