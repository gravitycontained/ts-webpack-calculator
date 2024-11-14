import { ButtonComponent } from '../../control/button/button';
import { BaseComponent, Nullable, UniqueIdElement } from '../../util';

// import HTML and Style for component
import template from './calculator.html';
import './calculator.scss';
import { CalculatorLogic } from './logic';

export interface Button
{
	symbol: string;
	button: ButtonComponent;
}

export class CalculatorComponent
extends BaseComponent
{
	protected readonly logic = new CalculatorLogic();
	protected readonly buttons: Button[] = [];

	protected readonly input: UniqueIdElement<HTMLInputElement>;
	protected readonly digitsElement: UniqueIdElement<HTMLDivElement>;
	protected readonly operationsElement: UniqueIdElement<HTMLDivElement>;
	protected readonly actionsElement: UniqueIdElement<HTMLDivElement>;

	protected readonly history: UniqueIdElement<HTMLInputElement>;

	protected inputFocus: boolean = false;

	public constructor()
	{
    super('calculator-component', template);

		this.input = new UniqueIdElement(this.element, 'input');

		this.digitsElement = new UniqueIdElement(this.element, 'digits');
		this.operationsElement = new UniqueIdElement(this.element, 'operations');
		this.actionsElement = new UniqueIdElement(this.element, 'actions');

		this.history = new UniqueIdElement(this.element, 'history');

		document.addEventListener('keydown', event =>
		{
			if (!this.inputFocus || event.key === 'Enter')
				this.addSymbol(event.key);
		});

		this.input.get().addEventListener('focus', () => this.inputFocus = true);
		this.input.get().addEventListener('blur', () => this.inputFocus = false);
		this.input.get().addEventListener('input', () => this.logic.line = this.input.get().value);

		this.addButtons();
	}

	protected addButtons()
	{
		for (let i = 1; i <= 9; ++i)
		{
			this.addButton(`${i}`);
		}
		this.addButton('0');
		this.addButton(',');

		this.addButton('+', 'operations');
		this.addButton('-', 'operations');
		this.addButton('*', 'operations');
		this.addButton('/', 'operations');
		this.addButton('(', 'operations');
		this.addButton(')', 'operations');

		this.addButton('BACK', 'actions', 'Backspace');
		this.addButton('DEL', 'actions', 'Delete');
		this.addButton('SOLVE', 'actions', 'Enter');

		for (const button of this.buttons)
			button.button.clicked.subscribe(() => this.addSymbol(button.symbol));
	}

	protected addButton(label: string, target: 'digits' | 'operations' | 'actions' = 'digits', key?: Nullable<string>)
	{
		this.buttons.push(
		{
			symbol: key ?? label,
			button: new ButtonComponent()
		});

		const button = this.buttons[this.buttons.length - 1].button;
		button.element.id = `button-${label}`;

		button.setLabel(label);

		let element: HTMLDivElement;
		switch (target)
		{
			case 'digits': element = this.digitsElement.get(); break;
			case 'operations': element = this.operationsElement.get(); break;
			case 'actions': element = this.actionsElement.get(); break;
		}
		button.render(element);
	}

	protected addSymbol(value: string)
	{
		const solved = this.logic.add(value);
		if (solved)
		{
			this.history.get().innerHTML = this.logic.history.join('<br>');
		}
		this.input.get().value = this.logic.line;
	}
}
