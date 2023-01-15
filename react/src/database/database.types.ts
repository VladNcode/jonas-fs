export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			facts: {
				Row: {
					category: string | null;
					created_at: string | null;
					dislike: number | null;
					id: number;
					like: number | null;
					mindblowing: number | null;
					source: string | null;
					text: string | null;
				};
				Insert: {
					category?: string | null;
					created_at?: string | null;
					dislike?: number | null;
					id?: number;
					like?: number | null;
					mindblowing?: number | null;
					source?: string | null;
					text?: string | null;
				};
				Update: {
					category?: string | null;
					created_at?: string | null;
					dislike?: number | null;
					id?: number;
					like?: number | null;
					mindblowing?: number | null;
					source?: string | null;
					text?: string | null;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
	};
}
