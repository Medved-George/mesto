const hasInvalidInput = (inputs) => {
    return Array.from(inputs).some((element) => !element.validity.valid);
}

const toggleButtonError = (inputs, button, inactiveButtonClass) => {
    if (hasInvalidInput(inputs)) {
        button.classList.add(inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(inactiveButtonClass);
        button.disabled = false;
    }
};

const showError = (form, input, inputErrorMessage, inputErrorClass, errorClass) => {
    const errorMessage = form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = inputErrorMessage;
    input.classList.add(inputErrorClass);
    errorMessage.classList.add(errorClass);
};

const hideError = (form, input, inputErrorClass, errorClass) => {
    const errorMessage = form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = '';
    input.classList.remove(inputErrorClass);
    errorMessage.classList.remove(errorClass);
};

const checkIfInputIsValid = (form, input, {
    inputErrorClass,
    errorClass
}) => {
    if (!input.validity.valid) showError(form, input, input.validationMessage, inputErrorClass, errorClass);
    else hideError(form, input, inputErrorClass, errorClass);
};

const setInputValidation = (form, {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    ...rest
}) => {
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const submitButton = form.querySelector(submitButtonSelector);
    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            toggleButtonError(inputs, submitButton, inactiveButtonClass);
            checkIfInputIsValid(form, input, rest);
        });
    });
};

const enableValidation = ({
    formSelector,
    ...other
}) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setInputValidation(form, other);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});