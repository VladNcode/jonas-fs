import { useCallback, useState } from 'react';

import { FunctionArgs, FunctionNames } from '../database/database.types';
import { supabase } from '../database/supabase';
import { FactElementProps, UpdateVotesArgs } from '../types/props';

const updateVotes = async ({ functionName, functionArgs, updateCount, setIsDisabled }: UpdateVotesArgs) => {
	try {
		setIsDisabled(true);
		const { error } = await supabase.rpc<FunctionNames, FunctionArgs>(functionName, functionArgs);

		if (!error) updateCount(c => (c || 0) + 1);
		else alert('Something went wrong while uploading your vote. Please try again!');
	} catch (error) {
		console.error(error);
	} finally {
		setIsDisabled(false);
	}
};

export const Fact: React.FC<FactElementProps> = ({ text, source, color, category, like, mindblowing, dislike, id }) => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [likes, setLikes] = useState(like);
	const [mindblowings, setMindblowings] = useState(mindblowing);
	const [dislikes, setDislikes] = useState(dislike);

	let isDisputed = false;

	if (likes + mindblowings < dislikes) {
		isDisputed = true;
	}

	const style = {
		backgroundColor: color || 'black',
	};

	const getFunctionArgs = useCallback(
		(name: FunctionNames, updateCount: React.Dispatch<React.SetStateAction<number>>) => {
			return {
				functionArgs: { row_id: id },
				functionName: name,
				updateCount,
				setIsDisabled,
			};
		},
		[id],
	);

	return (
		<li className="fact">
			<p>
				{isDisputed && <span className="disputed">[⛔DISPUTED] </span>}
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
					disabled={isDisabled}
					onClick={() => {
						updateVotes(getFunctionArgs('incrementlikes', setLikes));
					}}
				>
					👍 {likes}
				</button>
				<button
					disabled={isDisabled}
					onClick={() => {
						updateVotes(getFunctionArgs('incrementmindblowing', setMindblowings));
					}}
				>
					🤯 {mindblowings}
				</button>
				<button
					disabled={isDisabled}
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
