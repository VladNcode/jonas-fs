import { useEffect, useState } from 'react';

import { supabase } from '../database/supabase';
import { CATEGORIES } from '../helpers/constraints';
import { FactListProps } from '../types/props';
import { Fact } from './Fact';

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

		const props = { ...fact, color };

		return <Fact key={fact.id} {...props} />;
	});
};

export const FactList: React.FC<FactListProps> = ({ factCategory, shouldUpdateList, setShouldUpdateList }) => {
	const [facts, setFacts] = useState<FactsResponseSuccess>(null);
	const [error, setError] = useState<FactsResponseError>(null);

	useEffect(() => {
		const fetchFacts = async () => {
			const response = await getFacts();

			if (response.error) {
				setError(response.error);
				return;
			}

			if (response.data) {
				setFacts(factCategory === 'all' ? response.data : response.data.filter(fact => fact.category === factCategory));
			}
		};

		fetchFacts();
	}, [factCategory]);

	useEffect(() => {
		const fetchFacts = async () => {
			const response = await getFacts();

			if (response.error) {
				setError(response.error);
				return;
			}

			if (response.data) {
				setFacts(factCategory === 'all' ? response.data : response.data.filter(fact => fact.category === factCategory));
			}
		};

		if (shouldUpdateList) {
			setShouldUpdateList(false);
			fetchFacts();
		}
	}, [shouldUpdateList]);

	if (!facts) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	const factsList = buildFactList(facts);

	return <ul className="fact-list">{factsList}</ul>;
};
