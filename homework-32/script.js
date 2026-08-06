const API_KEY = `c3af9c97`;
const elements = {
    searchInput : document.getElementById("searchInput"),
    emptyInfo : document.getElementById("emptyInfo"),
    error : document.getElementById("error"),
    loader : document.getElementById("loader"),
    output : document.getElementById("outputContainer")
};

elements.searchInput.addEventListener("input", debounce(searchHandler, 500))

function debounce(callback, delay){
    let timeoutID;
    return function(event){
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => { callback(event)
        }, delay);
    }
}
function createUrl(query) {
    return `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
}

async function searchHandler(event){
    setEmpty(false);
    setError(false);
    const input = (event.target.value || "").trim()
    if(input.length < 3)
    {
        setEmpty(true);
        setOutput(false)
        return;
    }
    const movies = await searchMovies(input);
    if (movies.length === 0) {
        elements.error.innerText = 'Movies not found';
        setOutput(false);
        setError(true);
        return;
    }  
    showMovies(movies);
   
}

 function showMovies(movies){

    const moviesSorted = movies.toSorted(
        (a,b)=> Number(a.Year)-Number(b.Year)
    );

    const html = moviesSorted.map(movie => 
        `
         <div class="movie">
            <div>${movie.Title} - ${movie.Year}</div>
            <img src="${movie.Poster}" alt="${movie.Title}">
        </div> 
        `
    ).join("");

    elements.output.innerHTML = html;
    setOutput(true);
}
    
 

async function searchMovies(query){
    setLoading(true);
    let movies = [];
    try{
        const response = await fetch(createUrl(query));
        const data = await response.json();
        if(data.Response === "False")
        {
            throw new Error(data.Error);
        }
        movies = data.Search;
    }
    catch(err)
    {
        elements.error.innerText = err.message;
        setError(true);
    }
    finally{
        setLoading(false);
    }
    return movies;
}



function setEmpty(isShown){
    elements.emptyInfo.classList.toggle("hidden", !isShown);
}

function setError(isShown){
    elements.error.classList.toggle("hidden", !isShown);
}

function setLoading(isShown){
    elements.loader.classList.toggle("hidden", !isShown);
}

function setOutput(isShown){
    elements.output.classList.toggle("hidden", !isShown);
    elements.output.classList.toggle("hidden", !isShown);
}