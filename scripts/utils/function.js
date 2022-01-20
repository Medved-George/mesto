export function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

export function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
};