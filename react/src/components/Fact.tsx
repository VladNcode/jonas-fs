import { useCallback, useState } from 'react';

import { FunctionArgs, FunctionNames } from '../database/database.types';
import { supabase } from '../database/supabase';
import { FactElementProps, UpdateVotesArgs } from '../types/props';

const updateVotes = async ({ functionName, functionArgs, updateCount }: UpdateVotesArgs) => {
	const { error } = await supabase.rpc<FunctionNames, FunctionArgs>(functionName, functionArgs);

	console.log(error);

	if (!error) {
		updateCount(c => (c || 0) + 1);
	}
};

export const Fact: React.FC<FactElementProps> = ({ text, source, color, category, like, mindblowing, dislike, id }) => {
	const [likes, setLikes] = useState(like);
	const [mindblowings, setMindblowings] = useState(mindblowing);
	const [dislikes, setDislikes] = useState(dislike);

	const style = {
		backgroundColor: color || 'black',
	};

	const getFunctionArgs = useCallback(
		(name: FunctionNames, updateCount: React.Dispatch<React.SetStateAction<number | null>>) => {
			return {
				functionArgs: { row_id: id },
				functionName: name,
				updateCount,
			};
		},
		[id],
	);

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
				<button
					onClick={() => {
						updateVotes(getFunctionArgs('incrementlikes', setLikes));
					}}
				>
					👍 {likes}
				</button>
				<button
					onClick={() => {
						updateVotes(getFunctionArgs('incrementmindblowing', setMindblowings));
					}}
				>
					🤯 {mindblowings}
				</button>
				<button
					onClick={() => {
						updateVotes(getFunctionArgs('incrementdislikes', setDislikes));
					}}
				>
					⛔️ {dislikes}
				</button>
			</div>
		</li>
	);
};
