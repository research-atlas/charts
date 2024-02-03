import { createChart } from './create-chart';
import { getData } from './get-data';
import results from './data.json';

const NUMBER_OF_SECTIONS = results.length;

export function createSections() {
	const root = document.getElementById('root');

	for (let i = 0; i < NUMBER_OF_SECTIONS; i++) {
		const section = createSection(i);
		root.appendChild(section);
	}
}
export function createSection(index: number) {
	const element = document.createElement('section');

	const data = getData(index);
	const chart = createChart(data);

	const header = document.createElement('h1');
	header.innerText = data.title;
	element.appendChild(header);

	const wrapper = document.createElement('div');
	wrapper.classList.add('wrapper');
	wrapper.appendChild(chart.canvas);

	element.appendChild(wrapper);

	return element;
}
