export class CalculatorLogic
{
	public line = '';
	public history: string[] = [];

	public add(symbol: string): boolean
	{
		console.log("adding symbol: ", symbol);
		switch (symbol) {

			case 'Backspace':
				this.line = this.line.substring(0, Math.max(0, this.line.length - 1)).trimEnd();
				break;

			case 'Delete':
				this.line = '';
				break;

			case 'Enter':
				const before = this.line;

				this.line = `${this.solve()}`;
				this.line = this.line.replaceAll('.', ',');

				this.history.push(`${before} = ${this.line}`);
				return true;

			default:
				if (symbol.length === 1)
				{
					const isSpecial = /[^A-Za-z0-9,\s]/g.test(symbol);
					const newLine = isSpecial ? `${this.line.trimEnd()} ${symbol} ` : `${this.line}${symbol}`;
					this.line = newLine;
				}
		}
		return false;
	}

	public solve(): number
	{
		const ops: { [key: string]: number } =
		{
			'+': 1,
			'-': 1,
			'*': 2,
			'/': 2
		};

		const values: number[] = [];
		const operators: string[] = [];

		const applyOperation = () =>
		{
			const b = values.pop();
			const a = values.pop();
			const op = operators.pop();

			switch (op)
			{
				case '+': values.push(a + b); break;
				case '-': values.push(a - b); break;
				case '*': values.push(a * b); break;
				case '/': values.push(a / b); break;
			}
		};
		
		const replaced = this.line.replaceAll(',', '.');

		const tokens = replaced.match(/-?[\d\.]+|\S/g) || [];

		for (const token of tokens)
		{
			if (!isNaN(Number(token)))
				values.push(Number(token));
			
			else if (token === '(')
				operators.push(token);

			else if (token === ')') {
				while (operators[operators.length - 1] !== '(')
					applyOperation();
				
				operators.pop();
			}

			else if (ops[token]) {
				while (operators.length && ops[operators[operators.length - 1]] >= ops[token])
					applyOperation();
				
				operators.push(token);
			}
		}

		while (operators.length)
			applyOperation();

		return values.pop();
	}
}
