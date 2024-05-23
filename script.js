// jquery call back 

// $('.search-button').on('click', function(e) {

//     $.ajax({
//         url: 'http://www.omdbapi.com/?i=tt3896198&apikey=2324ab0f&s=' + $('.input-keyword').val(),
//         success: response => {
//             const movies = response.Search;
//             let cards = '';
//             movies.forEach(m => {
//                 cards += showCards(m);
//             });
//             $('.movie-container').html(cards);
    
    
//             // getId / card details
//             $('.modal-detail').on('click', function() {
//                 $.ajax({
//                     url: 'https://www.omdbapi.com/?apikey=2324ab0f&i=' + $(this).data('id'),
//                     success: m => {
//                         const movieDetail = showMovieDetails(m);
//                         $('.modal-body').html(movieDetail);
//                     },
//                     error: (e) => {
//                         console.log(e.responseText);
//                     }
//                 });
//             });
//         },
//         error: (e) => {
//             console.log(e.responseText);
//         },
//     });

// });

function showCards(m) {
    return `<div class="col-md-4 my-3">
                <div class="card">
                <img src="${m.Poster}" alt="" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                    <a href="" class="btn btn-outline-success modal-detail" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-id="${m.imdbID}">Show Details</a>
                    <a href="" class="btn btn-outline-danger btn-sm"><i class="bi bi-heart-fill"></i></a>
                </div>
                </div>
            </div>`
}

function showMovieDetails(m) {
    return `<div class="container-fluid">
                <div class="row">
                <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                    <ul class="list-group">
                    <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                    <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                    <li class="list-group-item"><strong>Actor : </strong>${m.Actors}</li>
                    <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                    <li class="list-group-item"><strong>Plot : </strong> <br>${m.Plot}</li>
                    </ul>
                </div>
                </div>
            </div>` 
}



// fetch callback (promise)
// const buttonSearch = document.querySelector('.search-button');

// buttonSearch.addEventListener('click', function() {

//     const inputKeyword = document.querySelector('.input-keyword');
    
//     fetch('http://www.omdbapi.com/?i=tt3896198&apikey=2324ab0f&s=' + inputKeyword.value)
//         .then(m => m.json())
//         .then(m => {
//             const movie = m.Search;
//             let cards = '';
//             movie.forEach(m => cards += showCards(m));
//             const movieContainer = document.querySelector('.movie-container');
//             movieContainer.innerHTML = cards;

//             // show detail
//             const modal = document.querySelectorAll('.modal-detail');
//             modal.forEach(modal => {
//                 modal.addEventListener('click', function() {
//                     const id = this.dataset.id;
//                     fetch('https://www.omdbapi.com/?apikey=2324ab0f&i='+ id)
//                         .then(m => m.json())
//                         .then(m => {
//                             const movieDetail = showMovieDetails(m);
//                             const modalBody = document.querySelector('.modal-body');
//                             modalBody.innerHTML = movieDetail;
//                         });
//                 });
//             });
//         });
// });



// fetch refacto
const searchBtn = document.querySelector('.search-button');

searchBtn.addEventListener('click', async function() {
    try {
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovies(inputKeyword.value);
        updateUi(movies);
    } catch (err) {
        alert(err);
    }
});

// cards 
function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=2324ab0f&s=' + keyword)
        .then(response => {
            if( !response.ok ) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(response => {
            if ( response.Response === "False")
            {
                throw new Error(response.Error);
            }
            return response.Search;
        });
}

function updateUi(movie) {
    let cards = '';
    movie.forEach(m => cards += showCards(m));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}


// event binding search
document.addEventListener('click', async function(e) {
    if( e.target.classList.contains('modal-detail')) {
        const id = e.target.dataset.id;
        movieDetails = await getMovieDetails(id);
        updateUiDetails(movieDetails);
    }
});

// search
function getMovieDetails(l) {
    return fetch('https://www.omdbapi.com/?apikey=2324ab0f&i='+ l)
        .then(m => m.json())
        .then(m => m);
}

function updateUiDetails(m) {
    const movieDetail = showMovieDetails(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}