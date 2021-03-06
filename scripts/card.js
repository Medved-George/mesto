import {
    openPopup
} from "./utils/utils.js";

export class Card {
    constructor(link, name, selector) {
        this._link = link;
        this._name = name;
        this._selector = selector;
    }
    _getTemplate() {
        return this._selector;
    }
    _getCard() {
        this._card = this._getTemplate();
        this._setEventListeners();

        const cardPhoto = this._card.querySelector('.card__photo');
        const cardName = this._card.querySelector('.card__name');

        cardPhoto.src = this._link;
        cardPhoto.alt = this._name;
        cardName.textContent = this._name;

        return this._card;
    }
    _deleteCard() {
        this._card.querySelector('.card__delete-button').closest('.card').remove();
    }
    _likeCard() {
        this._card.querySelector('.card__like-button').classList.toggle('card__like-button_active');
    }
    _previewCard(photo) {
        const popupForPhoto = document.querySelector('.popup_type_photo');
        const photoImg = popupForPhoto.querySelector('.photo__img');
        const photoTitle = popupForPhoto.querySelector('.photo__title');

        openPopup(popupForPhoto);

        photoImg.src = photo.src;
        photoTitle.textContent = photo.alt;
        photoImg.alt = photo.alt;
    }
    _setEventListeners() {
        const cardPhoto = this._card.querySelector('.card__photo');

        this._card.querySelector('.card__delete-button').addEventListener('click', () => this._deleteCard());
        this._card.querySelector('.card__like-button').addEventListener('click', () => this._likeCard());
        cardPhoto.addEventListener('click', () => this._previewCard(cardPhoto));
    }
    renderCard() {
        return this._getCard();
    }
}