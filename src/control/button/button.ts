import { Subject } from 'rxjs';
import { BaseComponent, UniqueIdElement } from '../../util';

// import HTML and Style for component
import template from './button.html';
import './button.scss';

export class ButtonComponent
extends BaseComponent
{
	protected readonly button: UniqueIdElement<HTMLButtonElement>;
	protected readonly label: UniqueIdElement<HTMLLabelElement>;
	public readonly clicked = new Subject<string>();

	public constructor()
	{
    super('button-component', template);

		this.button = new UniqueIdElement(this.element, 'button');
		this.label = new UniqueIdElement(this.element, 'label');

		this.button.get().addEventListener('click', () => this.clicked.next(this.label.get().innerHTML));
	}

	public setLabel(label: string)
	{
		this.label.get().innerHTML = label;
	}
}
