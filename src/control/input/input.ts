import { Subject } from 'rxjs';
import { BaseComponent, Nullable, UniqueIdElement } from '../../util';

import template from './input.html';
import './input.scss';

export class InputComponent
extends BaseComponent
{
	protected readonly label: UniqueIdElement<HTMLLabelElement>;
	protected readonly input: UniqueIdElement<HTMLInputElement>;

	public readonly onInput = new Subject<Nullable<string>>();

	public constructor()
	{
		super('input-component', template);

		this.element.innerHTML = template;

		this.label = new UniqueIdElement(this.element, 'label');
		this.input = new UniqueIdElement(this.element, 'input');

		this.onInput.next('');
		this.input.get().addEventListener('keydown', () =>
			setTimeout(() => this.onInput.next(this.input.get().value), 1
		));
	}

	public setLabel(text: string)
	{
		this.label.get().innerHTML = text;
	}
}
