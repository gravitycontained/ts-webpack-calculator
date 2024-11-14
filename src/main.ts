import { TitleComponent } from './app/title/title.component';
import { CalculatorComponent } from './app/calculator/calculator';

// import global style
import '../html/style.scss';

function main()
{
	const app = document.getElementById("app");
	
	const titleComponent = new TitleComponent();
	titleComponent.render(app);

	const calculator = new CalculatorComponent();
	calculator.render(app);
}

main();
