/* eslint-disable */

const globby = require('globby');
const Papa = require('papaparse');
const { join, resolve } = require('path');
const fs = require('fs-extra');

const DATA_DIR = resolve('./data/');

async function run () {
	const files = await globby('*.csv', { cwd: DATA_DIR })
	const categories = [];

	console.log('files', files);

	const results = await Promise.all(files.map(getFormattedData));

	await fs.outputJSON('./src/data.json', results);
}

async function getFormattedData(file) {
	const results = await readCsv(file);

	const header = results.data.shift();
	const title = header.shift();

	// Ignore total column
	header.pop();

	const groups = header.map(toCamelCase)

	console.log('title', title);
	console.log('groups', groups);

	const scores = groups.reduce((previous, group) => ({ ...previous, [group]: [] }), {});

	const start = {
		title,
		statements: [],
		scores,
	};

	const formattedData = results.data.reduce((previous, row) => {
		const statement = row.shift();

		const statements = previous.statements.concat(statement);

		const scores = groups.reduce((previousScores, group, index) => {
			const value = parseInt(row[index], 10);
			const newScores = previousScores[group].concat(value);

			return {
				...previousScores,
				[group]: newScores,
			};
		}, previous.scores);

		return {
			...previous,
			statements,
			scores
		}
	}, start)

	return formattedData;
}

async function readCsv(file) {
	const path = `${ join(DATA_DIR, file) }`;
	const data = await fs.readFile(path, 'utf8');

	return new Promise((resolve, reject) => {
		Papa.parse(data, {
			complete: (results) => {
				resolve(results);
			},
		});
	});
}

function toCamelCase(input) {
	console.log('input', input);
	return input.trim().toLowerCase().replace(/\s(\w)/g, (match, letter) => {
		return letter.toUpperCase()
	});
}

run().catch((e) => {
	console.error(e);
	process.exit(1);
});
