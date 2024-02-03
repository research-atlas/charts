import Chart, { PositionType } from 'chart.js';
import { Data } from './get-data';

function getAspectRatio(data: Data) {
	return 38 / (data.labels.length + 2);
}

function getFontSize() {
	const windowWidth = Math.min(window.innerWidth, 1680);
	const statements = (windowWidth - 120) / 110;
	const legend = statements * 0.75;

	return {
		statements,
		legend
	}
}

const initialFontSize = getFontSize();

Chart.defaults.global.defaultFontFamily = "CircularStd, 'Helvetica Neue', Helvetica, Arial, sans-serif";
Chart.defaults.global.defaultFontColor = '#000';
Chart.defaults.global.defaultFontSize = initialFontSize.statements;

function getOptions(data: Data) {

	const aspectRatio = getAspectRatio(data);

	return {
		responsive: true,
		aspectRatio,
		scales: {
			xAxes: [{
				stacked: true,
			}],
			yAxes: [{
				stacked: true
			}]
		},
		legend: {
			position: 'bottom' as PositionType,
			labels: {
				fontSize: initialFontSize.legend,
				lineWidth: 0
			}
		},
		tooltips: {
			enabled: false
		},
		onResize: (chart) => {
			const fontSize = getFontSize();

			Chart.defaults.global.defaultFontSize = fontSize.statements;
			chart.options.legend.labels.fontSize = fontSize.legend;
		}
	};
}


export function createChart(data: Data) {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	const options = getOptions(data);

	const chart = new Chart(context, {
		type: 'horizontalBar',
		data,
		options,
	});

	return chart;
}
