import { useEffect, useState } from 'react';

import { supabase } from '../database/supabase';
import { CATEGORIES } from '../helpers/constraints';
import { FactListProps, fetchFactsProps } from '../types/props';
import { Fact } from './Fact';

type FactsResponse = Awaited<ReturnType<typeof getFacts>>;
export type FactsResponseSuccess = FactsResponse['data'];
export type FactsResponseError = FactsResponse['error'];

async function getFacts(category: string) {
	const query = supabase.from('facts').select('*').order('created_at', { ascending: false });

	return await (category !== 'all' ? query.eq('category', category) : query);
}

const buildFactList = ({
	facts,
	setShouldUpdateList,
}: {
	facts: FactsResponseSuccess;
	setShouldUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	if (!facts) return null;

	return facts.map(fact => {
		const color = CATEGORIES.find(cat => cat.name === fact.category)?.color;

		const props = { ...fact, color, setShouldUpdateList };

		return <Fact key={fact.id} {...props} />;
	});
};

const fetchFacts = async ({ setError, setFacts, factCategory }: fetchFactsProps) => {
	const response = await getFacts(factCategory);

	if (response.error) {
		setError(response.error);
		return;
	}

	if (response.data) setFacts(response.data);
};

export const FactList: React.FC<FactListProps> = ({ factCategory, shouldUpdateList, setShouldUpdateList }) => {
	const [facts, setFacts] = useState<FactsResponseSuccess>(null);
	const [error, setError] = useState<FactsResponseError>(null);

	const fetchFactsProps = { factCategory, setError, setFacts };

	useEffect(() => {
		fetchFacts(fetchFactsProps);
	}, [factCategory]);

	useEffect(() => {
		if (shouldUpdateList) {
			setShouldUpdateList(false);
			fetchFacts(fetchFactsProps);
		}
	}, [shouldUpdateList]);

	if (error) return <div>{error.message}</div>;
	if (!facts) return <div>Loading...</div>;

	const factsList = buildFactList({ facts, setShouldUpdateList });

	return <ul className="fact-list">{factsList}</ul>;
};
