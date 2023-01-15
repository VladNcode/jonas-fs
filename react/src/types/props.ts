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
	setCategory: React.Dispatch<React.SetStateAction<string>>;
}
