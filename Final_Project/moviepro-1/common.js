$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    e.preventDefault();
    getMovies($("#searchText").val());
  });
});

function getMovies(searchText) {
  //alert(searchText)
  $.get("https://www.omdbapi.com?apikey=262717a3&s=" + searchText)
    .then(response => {
      let movies = response.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        if (movie.Poster == "N/A")
          movie.Poster = "https://s22.postimg.cc/y52d2xp01/noimg.png";

        output += `
          
                 <div class="col-md-3 col-sm-4 col-xs-6 mobwidth">
                    <div class="well text-center">
                    <div class="img-wrap"><img src="${movie.Poster}"></div>
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-info"
                    href="#">Movie Details</a>
                    </div>
                 </div>
                `;
      });

      $("#movies").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

function movieSelected(id) {
  //alert(id);
  sessionStorage.setItem("movieID", id);
  $("#movies").hide();
  $("#movie").show();
  getMovie();
}

function backToMainPage() {
  $("#movies").show();
  $("#movie").hide();
}

function getMovie() {
  let movieID = sessionStorage.getItem("movieID");

  $.get("https://www.omdbapi.com?apikey=bc667289&i=" + movieID)
    .then(response => {
      let movie = response;
      if (movie.Poster == "N/A")
        movie.Poster = "https://s5.postimg.org/4woi1dzbr/th_N9_G6_IL17.jpg";
      let output = `
        <div class="row">
            <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbmail">
            </div>
            <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
            </div>
        </div>
        <div class="row">
            <div class="well">
            <h3>Plot</h3>
             ${movie.Plot}
             <hr>
             <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-info">View IMDB</a>
             <a onclick="backToMainPage()" class="btn btn-success">Go Back To Search</a>

        </div>
        </div>
        `;

      $("#movie").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}
