import { useEffect, useState } from 'react';

import { supabase } from '../database/supabase';
import { CATEGORIES } from '../helpers/constraints';
import { FactListProps, FetchFactsProps } from '../types/props';
import { Fact } from './Fact';

type FactsResponse = Awaited<ReturnType<typeof getFacts>>;
export type FactsResponseSuccess = FactsResponse['data'];
export type FactsResponseError = FactsResponse['error'];

async function getFacts(category: string) {
	const query = supabase.from('facts').select('*').order('created_at', { ascending: false });

	return await (category !== 'all' ? query.eq('category', category) : query);
}

const buildFactList = (facts: FactsResponseSuccess) => {
	if (!facts) return null;

	return facts.map(fact => {
		const color = CATEGORIES.find(cat => cat.name === fact.category)?.color;
		const props = { ...fact, color };

		return <Fact key={fact.id} {...props} />;
	});
};

const fetchFacts = async ({ setError, setFacts, factCategory, setIsLoading }: FetchFactsProps) => {
	setIsLoading(true);

	const response = await getFacts(factCategory);

	if (response.error) {
		setError(response.error);
		setIsLoading(false);

		return;
	}

	if (response.data) setFacts(response.data);
	setIsLoading(false);
};

export const FactList: React.FC<FactListProps> = ({
	factCategory,
	shouldUpdateList,
	setShouldUpdateList,
	factListRef,
}) => {
	const [facts, setFacts] = useState<FactsResponseSuccess>(null);
	const [error, setError] = useState<FactsResponseError>(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchFactsProps = { factCategory, setError, setFacts, setIsLoading };

	useEffect(() => {
		fetchFacts(fetchFactsProps);
	}, [factCategory]);

	useEffect(() => {
		if (shouldUpdateList) {
			setShouldUpdateList(false);
			fetchFacts(fetchFactsProps);
		}
	}, [shouldUpdateList]);

	if (isLoading) return <div className="uploadingFact loading">Loading...</div>;
	if (error) return <div>{error.message}</div>;

	const factsList = buildFactList(facts);

	const factsCountMessage = `There are ${
		facts?.length ? facts?.length : 'no'
	} facts in the database for this category! Add your own!`;

	return (
		<>
			<ul ref={factListRef} className="fact-list">
				{factsList}
				<li>
					<p>{factsCountMessage}</p>
				</li>
			</ul>
		</>
	);
};
