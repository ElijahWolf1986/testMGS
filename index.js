import { TableConstructor } from './components/TableConstructor.js';
import { TableElement } from './components/TableElement.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithAnswer } from './components/PopupWithAnswer.js';

const ws = new WebSocket('ws://185.246.65.199:8080');
ws.onopen = () => {
  ws.send(JSON.stringify({ operation: 'getData' }));
};

ws.onmessage = (event) => {
  if (event.data.length > 162) {
    const { data } = JSON.parse(
      event.data.replace(/(\r\n|\n|\r|\s)/gm, '').replace(/\,]/gm, ']')
    );
    renderTable(data);
    popupAnswer.setValue(event.data);
  } else {
    const data = JSON.parse(event.data);
    popupAnswer.setValue(event.data);
  }
};

const popupAnswer = new PopupWithAnswer('#answer');
const popupAddData = new PopupWithForm('#addData', {
  handleFormSubmit: (newData) => {
    ws.send(JSON.stringify({ operation: 'sendNewData', data: newData }));
    popupAddData.close();
    popupAnswer.open();
  },
});
popupAddData.setEventListeners();
const renderTable = (data) => {
  const wsTable = new TableConstructor(
    {
      items: data,
      renderer: (item) => {
        const tableElement = new TableElement(item, '#tableRow', {
          handleButtonClick: (evt) => {
            popupAddData.open(evt);
          },
        });
        const newTableElement = tableElement.createNewTableElement();
        wsTable.addItem(newTableElement);
      },
    },
    'table'
  );
  wsTable.renderItems();
};
