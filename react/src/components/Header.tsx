export const Header: React.FC = () => {
	return (
		<header className="header">
			<div className="header-logo">
				<img src="logo.png" alt="Today I Learned Logo" />
				<h1>Today I Learned</h1>
			</div>

			<button className="btn btn-large btn-open">Share a fact</button>
		</header>
	);
};
