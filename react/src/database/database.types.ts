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
			incrementlikes(Args: { Args: { row_id: number } }): void;
			incrementmindblowing(Args: { Args: { row_id: number } }): void;
			incrementdislikes(Args: { Args: { row_id: number } }): void;
			// [_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
	};
}

export type FunctionNames = keyof Database['public']['Functions'];
export type FunctionArgs = Parameters<Database['public']['Functions'][FunctionNames]>[0];
