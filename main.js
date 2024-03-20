
const root = document.getElementById('root');

class MovieDisplay {
    constructor(movie){
        root.style.display = 'block';
        root.style.height = '100dvh';
    
       root.innerHTML = `<div id="display-container">
            <div id="display-title">Title: ${movie.Title}</div>
            <img id="display-poster" src="${movie.Poster}" alt="movie poster" />
            <div id="plot" >Plot: ${movie.Plot}</div>
            <div id="genre" >Genre: ${movie.Genre}</div>
            <div id="released" >Released: ${movie.Released}</div>
            <div id="runtime" >Runtime: ${movie.Runtime}</div>
            <div id="actors" >Actors: ${movie.Actors}</div>
            </div>`;
    }
}
class Movie {
    constructor(data){
        root.style.display = 'grid';
        root.style.height = 'fit-content';

        root.innerHTML += `<div class="movie-containers" >
                    <div class="title" >${data.Title}</div> 
                    <img class="posters" src="${data.Poster}" alt="movie poster" />
                    <div class="year" >${data.Year}</div>
                    </div>`;
    }
}

function getDisplay(title){
    root.innerHTML = "";
    fetch(`http://www.omdbapi.com/?t=${title}&apikey=9ac09008`)
    .then(res => res.json())
    .then(data => new MovieDisplay(data))
    .catch(err=> console.error(err));

}

const initialize = () => {
    const samples = ['batman', 'iron man', 'pirates of the caribbean'];

    samples.forEach(item =>{
        fetch(`http://www.omdbapi.com/?s=${item}&apikey=9ac09008`)
        .then(res => res.json())
        .then(data => Array(data)[0].Search)
        .then(arr => {
            arr.forEach(e=>{
                if(e.Poster!=="N/A") new Movie(e);
            });
        })
        .catch(err => console.error(err))
        .finally(()=>{
            const movies = root.childNodes;
            movies.forEach(movie =>{
                movie.addEventListener('click', (event)=>{
                    const title = event.target.childNodes[0].textContent;
                    getDisplay(title);
                });
            });
        });
    });  
}
initialize();

document.getElementById('submit').onclick = async function(){
    root.innerHTML = "";
    const text = document.getElementById('searchbox').value;
    const uri = `http://www.omdbapi.com/?s=${text}&apikey=9ac09008`;

    const res = await fetch(uri);
    const data = await res.json();
    const movies = Array(data)[0].Search;

    movies.forEach(e => {
            if(e.Poster!=="N/A") new Movie(e);
    });

    root.childNodes.forEach(node => {
        node.addEventListener('click', event =>{
            const title = event.target.childNodes[0].textContent;
            getDisplay(title);
        });
    });
}
