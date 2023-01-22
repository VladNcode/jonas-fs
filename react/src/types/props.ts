import { PostgrestError } from '@supabase/supabase-js';
import { FunctionArgs, FunctionNames } from '../database/database.types';

export interface FactProps {
	category: string;
	created_at: string;
	dislike: number;
	id: number;
	like: number;
	mindblowing: number;
	source: string;
	text: string;
}

export interface HeaderProps {
	showForm: boolean;
	setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CategoryFilterProps {
	factListRef: React.RefObject<HTMLUListElement>;
	setFactCategory: React.Dispatch<React.SetStateAction<string>>;
}

export interface FactListProps {
	factListRef: React.RefObject<HTMLUListElement>;
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
					category: string;
					created_at: string;
					dislike: number;
					id: number;
					like: number;
					mindblowing: number;
					source: string;
					text: string;
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
	updateCount: React.Dispatch<React.SetStateAction<number>>;
	setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
