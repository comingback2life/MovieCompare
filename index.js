//making a network request
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '[APIKEY]',
            s: searchTerm
        },
    });
    console.log(response.data);
};

const firstSearchBar = document.querySelector('#searchOne');
const debounce = (func, delay = 1000) => {
    let timeOutId;
    return (...args) => {
        if (timeOutId) {
            clearTimeout(timeOutId);
        }
        timeOutId = setTimeout(() => {
            func.apply(null, args); //take all the arguments and pass it to the function(func)
        }, delay);
    };
};
const onInput = event => {
    fetchData(event.target.value);
};
firstSearchBar.addEventListener('input', debounce(onInput, 500));