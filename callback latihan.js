// $('.search-button').on('click', function () {
//   $.ajax({
//     url: 'http://www.omdbapi.com/?apikey=daae6649&s=' + $('.input-keyword').val(),
//     success: (results) => {
//       const film = results.Search;
//       let cards = '';
//       film.forEach((m) => {
//         cards += showCards(m);
//       });

//       $('.film-container').html(cards);

//       // ketika tombol di klik
//       $('.modal-detail-button').on('click', function () {
//         $.ajax({
//           url: 'http://www.omdbapi.com/?apikey=daae6649&i=' + $(this).data('imdbid'),
//           success: (m) => {
//             const filmDetail = showfilmDetail(m);
//             $('.modal-body').html(filmDetail);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

// fetch
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function () {
  const inputKeyword = document.querySelector('.input-keyword');
  fetch('http://www.omdbapi.com/?apikey=daae6649&s=' + inputKeyword.value)
    .then((response) => response.json())
    .then((response) => {
      const film = response.Search;
      let cards = '';
      film.forEach((m) => {
        cards += showCards(m);
      });
      const filmContainer = document.querySelector('.film-container');
      filmContainer.innerHTML = cards;

      // ketika tombol di klik
      const modalDetailButton = document.querySelectorAll('.modal-detail-button');
      modalDetailButton.forEach((btn) => {
        btn.addEventListener('click', function () {
          const imdbid = this.dataset.imdbid;
          fetch('http://www.omdbapi.com/?apikey=daae6649&i=' + imdbid)
            .then((response) => response.json())
            .then((m) => {
              const filmDetail = showFilmDetail(m);
              const filmBody = document.querySelector('.modal-body');
              filmBody.innerHTML = filmDetail;
            });
        });
      });
    });
});

function showCards(m) {
  return `<div class="col-md-4 my-5">
    <div class="card" >
        <img src="${m.Poster}" class="card-img-top" >
        <div class="card-body">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#filmDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
        </div>
    </div>
</div>`;
}
function showFilmDetail(m) {
  return `<div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${m.Poster}" class="img-fluid" />
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item"><strong>Title:</strong> ${m.Title} (${m.Year})</li>
          <li class="list-group-item"><strong>Released:</strong> ${m.Released}</li>
          <li class="list-group-item"><strong>Genre:</strong> ${m.Genre}</li>
          <li class="list-group-item"><strong>Writer:</strong> ${m.Writer}</li>
          <li class="list-group-item"><strong>Plot:</strong> ${m.Plot}</li>
        </ul>
      </div>
    </div>
  </div>`;
}
