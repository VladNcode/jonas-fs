import { useState } from 'react';

import { CATEGORIES, MAX_ALLOWED_CHARACTERS } from '../helpers/constraints';

export const NewFactForm: React.FC = () => {
	const [category, setCategory] = useState('');
	const [factText, setFactText] = useState('');
	const [source, setSource] = useState('');
	const [count, setCount] = useState(MAX_ALLOWED_CHARACTERS);

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
				onChange={e => {
					setCount(MAX_ALLOWED_CHARACTERS - e.target.value.length);
					setFactText(e.target.value);
				}}
			/>
			<span>{count}</span>
			<input
				onChange={e => {
					setSource(e.target.value);
				}}
				type="text"
				placeholder="Trustworthy source..."
			/>
			<select
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
