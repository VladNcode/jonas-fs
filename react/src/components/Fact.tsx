import { supabase } from '../database/supabase';
import { FactElementProps } from '../types/props';

export const Fact: React.FC<FactElementProps> = ({
	text,
	source,
	color,
	category,
	like,
	mindblowing,
	dislike,
	id,
	setShouldUpdateList,
}) => {
	const style = {
		backgroundColor: color || 'black',
	};

	const updateLikes = async () => {
		const { data, error } = await supabase
			.from('facts')
			.update({ like: like ? like + 1 : 1 })
			.eq('id', id);

		if (!error) {
			setShouldUpdateList(true);
		}
	};

	const updateMindblowing = async () => {
		const { data, error } = await supabase
			.from('facts')
			.update({ mindblowing: mindblowing ? mindblowing + 1 : 1 })
			.eq('id', id);

		if (!error) {
			setShouldUpdateList(true);
		}
	};

	const updateDislikes = async () => {
		const { data, error } = await supabase
			.from('facts')
			.update({ dislike: dislike ? dislike + 1 : 1 })
			.eq('id', id);

		if (!error) {
			setShouldUpdateList(true);
		}
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
				<button onClick={updateLikes}>👍 {like}</button>
				<button onClick={updateMindblowing}>🤯 {mindblowing}</button>
				<button onClick={updateDislikes}>⛔️ {dislike}</button>
			</div>
		</li>
	);
};
