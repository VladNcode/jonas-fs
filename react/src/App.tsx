import { useState } from 'react';

import { CategoryFilter } from './components/CategoryFilters';
import { FactList } from './components/FactList';
import { Header } from './components/Header';
import { NewFactForm } from './components/NewFactForm';
import './css/style.css';

function App() {
	const [category, setCategory] = useState('all');
	const [showForm, setShowForm] = useState(false);

	return (
		<>
			<Header showForm={showForm} setShowForm={setShowForm} />
			{showForm && <NewFactForm />}
			<main className="main">
				<CategoryFilter setCategory={setCategory} />
				<FactList category={category} />
			</main>
		</>
	);
}

export default App;
