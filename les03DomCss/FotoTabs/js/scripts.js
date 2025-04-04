function updateNumFound() {
	const numFound = document.querySelectorAll('#grid figure:not(.hidden)').length;
	document.querySelector('#numFound').textContent = numFound;
}

function toggleView(viewType) {
	document.querySelector('.header__view a.active').classList.remove('active');
	document.querySelector(`#lnkView${viewType}`).classList.add('active');
	document.querySelector('#grid').classList.remove('viewGrid', 'viewList');
	document.querySelector('#grid').classList.add(`view${viewType}`);
}

function filterPhotos(filter) {
	document.querySelectorAll('#grid figure').forEach(photo => {
		const filters = photo.dataset.filters.split(' ');
		photo.classList.toggle('hidden', !(filters.includes(filter) || filter === 'alle'));
	});
	updateNumFound();
}

// Filter buttons event listener
document.querySelectorAll('.nav__filters a').forEach(link => { 
	link.addEventListener('click', function(e) {
		e.preventDefault();
		document.querySelector('.nav__filters a.active').classList.remove('active');
		this.classList.add('active');
		filterPhotos(this.dataset.filter);
	});
});

// View switch buttons
document.querySelector('#lnkViewGrid').addEventListener('click', e => {
	e.preventDefault();
	toggleView('Grid');
});

document.querySelector('#lnkViewList').addEventListener('click', e => {
	e.preventDefault();
	toggleView('List');
});

// Initieel aantal foto's tonen
updateNumFound();