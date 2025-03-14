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
document.querySelectorAll('.nav__filters a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.nav__filters a.active').classList.remove('active');
        this.classList.add('active');
        const filter = this.dataset.filter;
        filterPhotos(filter);
    });
});
//if statement gedaan met chatgpt
function filterPhotos(filter) {
    const photos = document.querySelectorAll('#grid figure');
    photos.forEach(photo => {
        const filters = photo.dataset.filters.split(' ');
        if (filters.includes(filter) || filter === 'alle') {
            photo.classList.remove('hidden');
        } else {
            photo.classList.add('hidden');
        }
    });
    updateNumFound();
}
document.querySelector('#lnkViewGrid').addEventListener('click', function(e) {
    e.preventDefault();
    toggleView('Grid');
});
document.querySelector('#lnkViewList').addEventListener('click', function(e) {
    e.preventDefault();
    toggleView('List');
});
updateNumFound();