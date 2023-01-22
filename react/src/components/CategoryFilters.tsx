import { CATEGORIES } from '../helpers/constraints';
import { CategoryFilterProps } from '../types/props';

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ setFactCategory, factListRef }) => {
	const scrollToFacts = () => {
		factListRef.current?.scrollIntoView();
	};

	const scrollToFactsTimeout = setTimeout.bind(null, scrollToFacts, 500);

	const selectCategory = (name = 'all') => {
		setFactCategory(name);
		scrollToFactsTimeout();
	};

	const buttons = CATEGORIES.map(({ name, color }) => {
		const style = {
			backgroundColor: color,
		};

		return (
			<li key={name} className="category">
				<button
					onClick={() => {
						selectCategory(name);
					}}
					style={style}
					className="btn btn-category"
				>
					{name.toUpperCase()}
				</button>
			</li>
		);
	});

	return (
		<aside>
			<ul className="category-buttons">
				<li className="category">
					<button
						className="btn btn-all-categories"
						onClick={() => {
							selectCategory();
						}}
					>
						All
					</button>
				</li>

				{buttons}
			</ul>
		</aside>
	);
};
