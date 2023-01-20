import { PostgrestError } from '@supabase/supabase-js';

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

export interface fetchFactsProps {
	factCategory: string;
	setError: React.Dispatch<React.SetStateAction<PostgrestError | null>>;
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
