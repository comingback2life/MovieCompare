//making a network request
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '914ea9ef',
            s: searchTerm
        },
    });
    if (response.data.Error) {
        return false;
    }
    return response.data.Search;
};
const root = document.querySelector('.autocomplete');
root.innerHTML = `<label><b>Search for a Movie</b></label>
<input class="input" id="searchOne"/>
<div class="dropdown">
<div class="dropdown-menu">
<div class="dropdown-content results"></div>
</div>
</div>
`;
const firstSearchBar = document.querySelector('#searchOne');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');
const onInput = async event => {
    const movies = await fetchData(event.target.value);
    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }
    resultsWrapper.innerHTML = "";
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const option = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        option.classList.add('dropdown-item');
        option.innerHTML = `<img src = "${imgSrc}"/>
            <h1>${movie.Title}</h1>`;

        resultsWrapper.appendChild(option);

    }

};
firstSearchBar.addEventListener('input', debounce(onInput, 500));
document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
});