import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(containerSelector, { handleFormSubmit }) {
    super(containerSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._container = document.querySelector(containerSelector);
  }

  open(evt) {
    super.open();
    this._tableRow = evt.target.closest('.template_tr');
    this._valuesTableRow = this._tableRow.querySelectorAll('.template_input');
    this._rowValues = {};
    this._valuesTableRow.forEach((input) => {
      this._rowValues[input.name] = input.value;
    });
    return this._rowValues;
  }

  _getInputValues() {
    this._inputList = this._container.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._container.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(
        Object.assign(this._rowValues, this._getInputValues())
      );
    });
  }

  _setInputValuesEmpty() {
    this._inputList = this._container.querySelectorAll('.popup__input');
    this._inputList.forEach((input) => {
      input.value = '';
    });
  }

  setButtonState(state) {
    this._container.querySelector('.popup__button-save').textContent = state;
  }

  close() {
    super.close();
    this._setInputValuesEmpty();
  }
}
