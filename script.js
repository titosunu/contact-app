$('.search-button').on('click', function(e) {

    $.ajax({
        url: 'http://www.omdbapi.com/?i=tt3896198&apikey=2324ab0f&s=' + $('.input-keyword').val(),
        success: response => {
            const movies = response.Search;
            let cards = '';
            movies.forEach(m => {
                cards += showCards(m);
            });
            $('.movie-container').html(cards);
    
    
            // getId
            $('.modal-detail').on('click', function() {
                $.ajax({
                    url: 'https://www.omdbapi.com/?apikey=2324ab0f&i=' + $(this).data('id'),
                    success: m => {
                        const movieDetail = showMovieDetails(m);
                        $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                });
            });
        },
        error: (e) => {
            console.log(e.responseText);
        },
    });

});

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