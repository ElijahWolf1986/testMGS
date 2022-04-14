export class TableConstructor {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._class = document.querySelector(classSelector);
  }

  renderItems() {
    this._items.map((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._class.append(element);
  }

  addNewItem(element) {
    this._class.prepend(element);
  }
}
