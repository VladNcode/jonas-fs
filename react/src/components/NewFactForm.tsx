import { useState } from 'react';
import * as yup from 'yup';

import { supabase } from '../database/supabase';
import { CATEGORIES, MAX_ALLOWED_CHARACTERS } from '../helpers/constraints';
import { FactProps, NewFactFormProps } from '../types/props';

const schema = yup.object().shape({
	text: yup.string().max(200).required(),
	category: yup
		.string()
		.oneOf(CATEGORIES.map(cat => cat.name))
		.required(),
	source: yup.string().url().required(),
});

const errorCSS = { color: 'red', marginBottom: '20px', display: 'flex', justifyContent: 'center' };

export const NewFactForm: React.FC<NewFactFormProps> = ({ setShowForm, setShouldUpdateList }) => {
	const [category, setCategory] = useState('');
	const [factText, setFactText] = useState('');
	const [source, setSource] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isUploading, setIsUploading] = useState(false);

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

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFactText(e.target.value);
	};

	const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSource(e.target.value);
	};

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value);
	};

	const resetForm = () => {
		setFactText('');
		setSource('');
		setCategory('');
		setErrorMessage('');
		setShowForm(false);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsUploading(true);

		const fact: Pick<FactProps, 'category' | 'text' | 'source'> = { category, text: factText, source };

		try {
			await schema.validate(fact);
			await supabase.from('facts').insert(fact);

			resetForm();
			setShouldUpdateList(true);
		} catch (error) {
			setErrorMessage(error instanceof Error ? error.message : 'Something went wrong!');
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<>
			{isUploading && <div className="uploadingFact">Uploading fact...</div>}
			{errorMessage && <div style={errorCSS}>{errorMessage}</div>}
			<form className="fact-form" onSubmit={handleSubmit}>
				<input
					disabled={isUploading}
					type="text"
					placeholder="Share a fact with the world..."
					value={factText}
					onChange={handleTextChange}
				/>
				<span>{MAX_ALLOWED_CHARACTERS - factText.length}</span>
				<input
					disabled={isUploading}
					onChange={handleSourceChange}
					value={source}
					type="text"
					placeholder="Trustworthy source..."
				/>
				<select disabled={isUploading} value={category} onChange={handleCategoryChange}>
					{selectOptions}
				</select>
				<button disabled={isUploading} className="btn btn-large">
					Post
				</button>
			</form>
		</>
	);
};
