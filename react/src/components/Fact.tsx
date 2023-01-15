import { FactProps } from '../types/props';

export const Fact: React.FC<FactProps & { color: string | undefined }> = ({
	text,
	source,
	color,
	category,
	like,
	mindblowing,
	dislike,
}) => {
	const style = {
		backgroundColor: color || 'black',
	};

	return (
		<li className="fact">
			<p>
				{text}
				<a className="fact-link" href={source || '#'} target="_blank">
					(Source)
				</a>
			</p>

			<span style={style} className="tag">
				{category}
			</span>

			<div className="vote-buttons">
				<button>👍 {like}</button>
				<button>🤯 {mindblowing}</button>
				<button>⛔️ {dislike}</button>
			</div>
		</li>
	);
};
