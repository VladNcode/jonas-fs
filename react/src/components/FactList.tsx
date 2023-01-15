import { PostgrestError } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { supabase } from '../database/supabase';
import { CATEGORIES } from '../helpers/constraints';
import { FactListProps, fetchFactsProps } from '../types/props';
import { Fact } from './Fact';

type FactsResponse = Awaited<ReturnType<typeof getFacts>>;
export type FactsResponseSuccess = FactsResponse['data'];
export type FactsResponseError = FactsResponse['error'];

async function getFacts() {
	return await supabase.from('facts').select('*').order('created_at', { ascending: false });
}

const buildFactList = (facts: FactsResponseSuccess) => {
	if (!facts) return null;

	return facts.map(fact => {
		const color = CATEGORIES.find(cat => cat.name === fact.category)?.color;

		const props = { ...fact, color };

		return <Fact key={fact.id} {...props} />;
	});
};

const fetchFacts = async ({ factCategory, setError, setFacts }: fetchFactsProps) => {
	const response = await getFacts();

	if (response.error) {
		setError(response.error);
		return;
	}

	if (response.data) {
		setFacts(factCategory === 'all' ? response.data : response.data.filter(fact => fact.category === factCategory));
	}
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

	if (!facts) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	const factsList = buildFactList(facts);

	return <ul className="fact-list">{factsList}</ul>;
};
