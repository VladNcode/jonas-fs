import { config } from './config.js';

const { supabaseKey, supabaseUrl } = config;
const supab = supabase.createClient(supabaseUrl, supabaseKey);
const { data: facts, error } = await supab.from('facts').select('*');

const CATEGORIES = [
	{ name: 'technology', color: '#3b82f6' },
	{ name: 'science', color: '#16a34a' },
	{ name: 'finance', color: '#ef4444' },
	{ name: 'society', color: '#eab308' },
	{ name: 'entertainment', color: '#db2777' },
	{ name: 'health', color: '#14b8a6' },
	{ name: 'history', color: '#f97316' },
	{ name: 'news', color: '#8b5cf6' },
];

const buildFactsList = data => {
	const factsList = [];
	const emoji = [
		['👍', 'like'],
		['🤯', 'mindblowing'],
		['⛔️', 'dislike'],
	];

	data.forEach(el => {
		const fact = document.createElement('li');
		fact.className = 'fact';

		const text = document.createElement('p');
		text.innerText = el.text;

		const category = document.createElement('span');
		category.innerText = el.category;
		category.className = 'tag';

		const color = CATEGORIES.find(cat => cat.name === el.category).color;
		category.style.backgroundColor = color;

		const source = document.createElement('a');
		source.className = 'fact-link';
		source.innerText = '(Source)';
		source.href = el.source;
		source.target = '_blank';

		text.appendChild(source);
		fact.appendChild(text);
		fact.appendChild(category);

		const buttonList = document.createElement('div');
		buttonList.className = 'vote-buttons';

		const emojiButtons = emoji.map(([emoji, type]) => {
			const button = document.createElement('button');
			button.classList = 'btn-emoji';
			button.innerText = `${emoji} ${el[type]}`;

			return button;
		});

		emojiButtons.forEach(button => {
			buttonList.appendChild(button);
		});

		fact.appendChild(buttonList);

		factsList.push(fact);
	});

	return factsList;
};

const updateFactsList = category => {
	const filteredFacts = category !== 'all' ? facts.filter(fact => fact.category === category) : facts;
	const factss = buildFactsList(filteredFacts);

	const factsList = document.querySelector('.fact-list');
	factsList.innerHTML = '';

	factss.forEach(fact => factsList.appendChild(fact));
};

const buildButtonList = () => {
	const allFactsListItem = document.createElement('li');
	allFactsListItem.className = 'category';

	const button = document.createElement('button');
	button.innerText = 'All';
	button.classList = 'btn btn-all-categories';

	button.addEventListener('click', () => {
		updateFactsList('all');
	});

	allFactsListItem.appendChild(button);

	const buttons = CATEGORIES.map(({ name, color }) => {
		const listItem = document.createElement('li');
		listItem.className = 'category';

		const button = document.createElement('button');
		button.innerText = name;
		button.classList = 'btn btn-category';
		button.style.backgroundColor = color;

		button.addEventListener('click', () => {
			updateFactsList(name);
		});

		listItem.appendChild(button);

		return listItem;
	});

	return [allFactsListItem, ...buttons];
};

const shareButton = document.querySelector('.btn-open');
const form = document.querySelector('.fact-form');
const factList = document.querySelector('.fact-list');
const categoryButtons = document.querySelector('.category-buttons');

shareButton.addEventListener('click', () => {
	form.classList.toggle('hidden');
	shareButton.textContent = form.classList.contains('hidden') ? 'Share a fact' : 'Close';
});

const factsNodes = buildFactsList(facts);
const buttonList = buildButtonList();

factsNodes.forEach(node => {
	factList.appendChild(node);
});

buttonList.forEach(node => {
	categoryButtons.appendChild(node);
});
