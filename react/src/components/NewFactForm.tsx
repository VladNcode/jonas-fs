import { useState } from 'react';

import { CATEGORIES, MAX_ALLOWED_CHARACTERS } from '../helpers/constraints';

export const NewFactForm: React.FC = () => {
	const [category, setCategory] = useState('');
	const [factText, setFactText] = useState('');
	const [source, setSource] = useState('');

	const selectOptions = [
		<option key="none" value="">
			Choose category:
		</option>,
	];

	CATEGORIES.forEach(({ name }) => {
		selectOptions.push(
			<option key={name} value={name}>
				{name[0].toUpperCase() + name.substring(1)}
			</option>,
		);
	});

	return (
		<form className="fact-form">
			<input
				type="text"
				placeholder="Share a fact with the world..."
				value={factText}
				onChange={e => {
					setFactText(e.target.value);
				}}
			/>
			<span>{MAX_ALLOWED_CHARACTERS - factText.length}</span>
			<input
				onChange={e => {
					setSource(e.target.value);
				}}
				value={source}
				type="text"
				placeholder="Trustworthy source..."
			/>
			<select
				value={category}
				onChange={e => {
					setCategory(e.target.value);
				}}
			>
				{selectOptions}
			</select>
			<button
				onClick={e => {
					e.preventDefault();
					console.log({ category, factText, source });
				}}
				className="btn btn-large"
			>
				Post
			</button>
		</form>
	);
};
