import { PostgrestError } from '@supabase/supabase-js';
import { FunctionArgs, FunctionNames } from '../database/database.types';

export interface FactProps {
	category: string | null;
	created_at: string | null;
	dislike: number | null;
	id: number;
	like: number | null;
	mindblowing: number | null;
	source: string | null;
	text: string | null;
}

export interface HeaderProps {
	showForm: boolean;
	setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CategoryFilterProps {
	setFactCategory: React.Dispatch<React.SetStateAction<string>>;
}

export interface FactListProps {
	factCategory: string;
	shouldUpdateList: boolean;
	setShouldUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NewFactFormProps {
	setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
	setShouldUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FetchFactsProps {
	factCategory: string;
	setError: React.Dispatch<React.SetStateAction<PostgrestError | null>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setFacts: React.Dispatch<
		React.SetStateAction<
			| {
					category: string | null;
					created_at: string | null;
					dislike: number | null;
					id: number;
					like: number | null;
					mindblowing: number | null;
					source: string | null;
					text: string | null;
			  }[]
			| null
		>
	>;
}

export type FactElementProps = FactProps & {
	color: string | undefined;
	setShouldUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface UpdateVotesArgs {
	functionName: FunctionNames;
	functionArgs: FunctionArgs['Args'];
	updateCount: React.Dispatch<React.SetStateAction<number | null>>;
}
