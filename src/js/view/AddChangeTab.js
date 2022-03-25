import selectDom from '../utils/selectDom';
import { addChangeTemplate } from './template';

export default class AddChangeTab {
  #vendingMachine;
  #addChangeContainer;
  #addChangeForm;
  #moneyInput;
  #totalChange;
  #coinStatusTable;

  constructor(machine) {
    this.#vendingMachine = machine;

    this.#addChangeContainer = document.createElement('main');
    this.#addChangeContainer.insertAdjacentHTML('beforeend', addChangeTemplate);
    this.#addChangeForm = selectDom('#add-change-form', this.#addChangeContainer);
    this.#moneyInput = selectDom('#money-input', this.#addChangeContainer);
    this.#totalChange = selectDom('#total-change', this.#addChangeContainer);
    this.#coinStatusTable = selectDom('#coin-status-table', this.#addChangeContainer);

    this.#addChangeForm.addEventListener('submit', this.handleAddChange);
  }

  get tabElements() {
    return this.#addChangeContainer;
  }

  handleAddChange = (e) => {
    e.preventDefault();
    const money = this.#moneyInput.valueAsNumber;

    try {
      this.#vendingMachine.addChange(money);
      this.renderCoinStatus();
    } catch ({ message }) {
      alert(message);
    }
  };

  renderCoinStatus() {
    this.#totalChange.textContent = this.#vendingMachine.totalChange;

    const coinCountElements = this.#coinStatusTable.querySelectorAll('td[data-coin-name]');
    const { coinStatus } = this.#vendingMachine;

    coinCountElements.forEach((element) => {
      element.textContent = `${coinStatus[element.dataset.coinName]}개`;
    });
  }
}
