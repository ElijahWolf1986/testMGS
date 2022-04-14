import { Popup } from './Popup.js';

export class PopupWithAnswer extends Popup {
  constructor(containerSelector) {
    super(containerSelector);
    this._container = document.querySelector(containerSelector);
    this._textarea = this._container.querySelector('.answer_textarea');
  }

  open() {
    super.open();
    super.setEventListeners();
  }

  setValue(answer) {
    this._textarea.value = answer;
  }

  close() {
    super.close();
    this._textarea.value = '';
  }
}
