import { HeaderProps } from '../types/props';

export const Header: React.FC<HeaderProps> = ({ showForm, setShowForm }) => {
	const toggleForm = () => {
		setShowForm(f => !f);
	};

	const buttonText = showForm ? 'Close' : 'Share a fact';

	return (
		<header className="header">
			<div className="header-logo">
				<img src="logo.png" alt="Today I Learned Logo" />
				<h1>Today I Learned</h1>
			</div>

			<button onClick={toggleForm} className="btn btn-large btn-open">
				{buttonText}
			</button>
		</header>
	);
};
