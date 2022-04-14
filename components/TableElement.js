export class TableElement {
  constructor(item, tableTemplate, { handleButtonClick }) {
    this._id = item.id;
    this._name = item.name;
    this._location = item.inputLocation;
    this._likesOwners = item.likes;
    this._type = item.type;
    this._status = item.status;
    this._comment = item.comment;
    this._tableTemplate = tableTemplate;
    this.handleButtonClick = handleButtonClick;
  }

  _getTemplate() {
    const tableElement = document
      .querySelector(this._tableTemplate)
      .content.cloneNode(true);

    return tableElement;
  }

  _buttonClick(evt) {
    this.handleButtonClick(evt);
  }

  _setEventListeners() {
    this._element
      .querySelector('.template_button')
      .addEventListener('click', (evt) => this._buttonClick(evt));
  }

  createNewTableElement() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const id = this._element.querySelector('#template_id');
    const name = this._element.querySelector('#template_name');
    const location = this._element.querySelector('#template_location');
    const status = this._element.querySelector('#template_status');
    const comment = this._element.querySelector('#template_comment');
    // const button = this._element.querySelector('#template_button');
    const type = this._element.querySelector('.template_select');
    const valueoftype = this._element.querySelector('.valueoftype');
    id.value = this._id;
    name.value = this._name;
    location.value = this._location;
    status.value = this._status;
    comment.value = this._comment;

    location.addEventListener('input', (evt) => {
      const refreshingInput = document.querySelector('.refresh_input_value');
      const refreshingId = document.querySelector('.refresh_input_id');
      refreshingInput.value = location.value;
      refreshingId.value = this._id;
    });

    this._type.map((item) => {
      const typeOption = document.createElement('option');
      typeOption.classList.add('template_option');
      typeOption.value = item.selectType;
      typeOption.innerHTML = item.selectType;
      type.append(typeOption);
      if (this._type.indexOf(item) === 0) {
        const valueOfType = document.createElement('input');
        valueOfType.classList.add('template_input');
        valueOfType.setAttribute('name', 'valueType');
        valueOfType.setAttribute('readonly', 1);
        valueOfType.value = item.valueType;
        valueoftype.append(valueOfType);
      }
    });

    type.onchange = (evt) => {
      const currentSelect = evt.target.closest('.template_select');
      this._type.map((item) => {
        if (currentSelect.value === item.selectType) {
          const currentValue = valueoftype.querySelector('.template_input');
          currentValue && currentValue.remove();
          const valueOfType = document.createElement('input');
          valueOfType.classList.add('template_input');
          valueOfType.setAttribute('name', 'valueType');
          valueOfType.setAttribute('readonly', 1);
          valueOfType.value = item.valueType;
          valueoftype.append(valueOfType);
        }
      });
    };

    return this._element;
  }
}
