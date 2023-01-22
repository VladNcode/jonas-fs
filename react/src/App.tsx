import { useRef, useState } from 'react';

import { CategoryFilter } from './components/CategoryFilters';
import { FactList } from './components/FactList';
import { Header } from './components/Header';
import { NewFactForm } from './components/NewFactForm';
import './css/style.css';

function App() {
	const [factCategory, setFactCategory] = useState('all');
	const [showForm, setShowForm] = useState(false);
	const [shouldUpdateList, setShouldUpdateList] = useState(false);

	const factListRef = useRef<HTMLUListElement>(null);

	return (
		<>
			<Header showForm={showForm} setShowForm={setShowForm} />
			{showForm && <NewFactForm setShowForm={setShowForm} setShouldUpdateList={setShouldUpdateList} />}
			<main className="main">
				<CategoryFilter factListRef={factListRef} setFactCategory={setFactCategory} />
				<FactList
					factListRef={factListRef}
					factCategory={factCategory}
					shouldUpdateList={shouldUpdateList}
					setShouldUpdateList={setShouldUpdateList}
				/>
			</main>
		</>
	);
}

export default App;
