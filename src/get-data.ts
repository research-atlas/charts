import results from './data.json';

const colors = {
	institute: '#41AD49',
	firstYear: '#D2232A',
	secondYear: '#F58220',
	alumnus: '#25408F',
	feedbackProvider: '#EEDC00',
};

const titles = {
	institute: 'Institute (3)',
	firstYear: 'First Year Researcher',
	secondYear: 'Second Year Researcher',
	alumnus: 'Alumnus',
	feedbackProvider: 'Feedback Provider',
};

export function getData(index: number) {
	const result = results[index];

	const data = {
		title: result.title,
		labels: result.statements,
		datasets: Object.entries(result.scores).map(([group, values]) => {
			return {
				label: titles[group] as string,
				backgroundColor: colors[group] as string,
				borderColor: colors[group] as string,
				hoverBackgroundColor: colors[group] as string,
				hoverBorderColor: colors[group] as string,
				data: values,
			}
		})
	}

	return data;
}

export type Data = ReturnType<typeof getData>;

