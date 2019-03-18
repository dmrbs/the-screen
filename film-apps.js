function Movie() {
    this.title;
    this.description;
    this.img;
    this.url;
    this.rating;
    this.year;
}

$(document).ready(function () {
    var eMoviesPanel = $(".movies-panel");

    var eMovieSearch = $("#search");
    var ebtnSearch = $("#btnSearch");
    ebtnSearch.click(function () {
        var searchingText = eMovieSearch.val();


        $.ajax({
            dataType: 'json',
            url: 'http://www.omdbapi.com/?apikey=df357c6e&s=' + searchingText,
            success: function (data, textStatus, jqXHR) {
                // When AJAX call is successfuly
                console.log('AJAX call successful.');
                var array = [];
                for (let i = 0; i < data.Search.length; i++) {
                    var item = data.Search[i];

                    var movie = new Movie();
                    movie.title = item.Title;
                    movie.img = item.Poster;
                    movie.url = "https://www.imdb.com/title/" + item.imdbID;
                    movie.year = item.Year;

                    array.push(movie);




                }
                ShowMovies(array);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // When AJAX call has failed
                console.log('AJAX call failed.');
                console.log(textStatus + ': ' + errorThrown);
            },
            complete: function () {
                // When AJAX call is complete, will fire upon success or when error is thrown
                console.log('AJAX call completed');
            }
        });
    })












    function ShowMovies(movies) {
        eMoviesPanel.html("");
        for (var i = 0; i < movies.length; i++) {
            createMovie(movies[i]);
        }


    }











    function createMovie(movie) {
        var eMovie = $("<div class='movie'></div>");

        eMovie.click(function () {
            window.location.href= movie.url;
        });
        var eMoviePanel = $("<div class='movie-panel'></div>");

        var eMovieFront = $("<div class='movie-front'></div>");
        var eMovieImg = $("<img class='movie-img'>");
        eMovieImg.attr("src", movie.img);
        eMovieFront.append(eMovieImg);
        var eMovieBack = $("<div class='movie-back'></div>");
        var eMovieTitle = $("<h1></h1>");
        eMovieTitle.html(movie.title);
        var eMovieYear = $("<p></p>");
        eMovieYear.html(movie.year);
        var eMovieDescription = $("<p></p>");
        eMovieDescription.html(movie.description);
        var eMovieStarPanel = $("<div class='movie-star-panel'></div>");
        var eMovieStarRating = $("<div class='movie-star-rating'></div>")
        var eMovieStarIcon = $("<img class='movie-star'>");
        eMovieStarIcon.attr("src", "media/star-icon.png");


        eMovieStarRating.append(eMovieStarIcon);
        eMovieStarRating.append($("<span></span>").html(movie.rating))
        eMovieStarPanel.append(eMovieStarRating);

        eMovieBack.append(eMovieTitle, eMovieYear, eMovieDescription, eMovieStarPanel);

        eMoviePanel.append(eMovieFront);
        eMoviePanel.append(eMovieBack);


        eMovie.append(eMoviePanel);

        eMoviesPanel.append(eMovie);
    }
});