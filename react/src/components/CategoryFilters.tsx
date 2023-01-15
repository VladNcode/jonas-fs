import { useState } from 'react';
import { CATEGORIES } from '../helpers/constraints';

export const CategoryFilter: React.FC<{
	category: string;
	setCategory: React.Dispatch<React.SetStateAction<string>>;
}> = ({ category, setCategory }) => {
	const buttons = [];

	const allCategoriesButton = (
		<li key="all" className="category">
			<button
				className="btn btn-all-categories"
				onClick={() => {
					setCategory('all');
				}}
			>
				All
			</button>
		</li>
	);

	buttons.push(allCategoriesButton);

	const categoryButtons = CATEGORIES.map(({ name, color }) => {
		return (
			<li key={name} className="category">
				<button
					onClick={() => {
						setCategory(name);
					}}
					style={{
						backgroundColor: color,
					}}
					className="btn btn-category"
				>
					{name.toUpperCase()}
				</button>
			</li>
		);
	});

	buttons.push(...categoryButtons);

	return (
		<aside>
			<ul className="category-buttons">{buttons}</ul>
		</aside>
	);
};
