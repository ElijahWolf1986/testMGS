export class Popup {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._container.classList.add('popup_state_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListenerEsc() {
    document.addEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    const closeButton = this._container.querySelector('.popup__close-icon');
    const overlay = this._container.querySelector('.popup__overlay');
    overlay.addEventListener('click', () => this.close());
    closeButton.addEventListener('click', () => this.close());
    this.setEventListenerEsc();
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._container.classList.remove('popup_state_opened');
    this._removeEventListeners();
  }
}
