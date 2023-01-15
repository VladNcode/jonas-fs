import { useEffect, useState } from 'react';

import { supabase } from '../database/supabase';
import { CATEGORIES } from '../helpers/constraints';

type FactsResponse = Awaited<ReturnType<typeof getFacts>>;
export type FactsResponseSuccess = FactsResponse['data'];
export type FactsResponseError = FactsResponse['error'];

async function getFacts() {
	return await supabase.from('facts').select('*');
}

const buildFactList = (facts: FactsResponseSuccess) => {
	if (!facts) return null;

	return facts.map(fact => {
		const color = CATEGORIES.find(cat => cat.name === fact.category)?.color;

		return (
			<li key={fact.id} className="fact">
				<p>
					{fact.text}
					<a className="fact-link" href={fact.source || '#'} target="_blank">
						(Source)
					</a>
				</p>

				<span
					style={{
						backgroundColor: color || 'black',
					}}
					className="tag"
				>
					{fact.category}
				</span>

				<div className="vote-buttons">
					<button>👍 {fact.like}</button>
					<button>🤯 {fact.mindblowing}</button>
					<button>⛔️ {fact.dislike}</button>
				</div>
			</li>
		);
	});
};

export const FactList: React.FC<{
	category: string;
}> = ({ category }) => {
	const [facts, setFacts] = useState<FactsResponseSuccess>(null);
	const [error, setError] = useState<FactsResponseError>(null);

	useEffect(() => {
		const fetchFacts = async () => {
			const response = await getFacts();

			if (response.data) {
				setFacts(category === 'all' ? response.data : response.data.filter(fact => fact.category === category));
			}

			if (response.error) {
				setError(response.error);
			}
		};

		fetchFacts();
	}, [category]);

	if (!facts) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	const factsList = buildFactList(facts);

	return <ul className="fact-list">{factsList}</ul>;
};
