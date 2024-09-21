const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
  try {
    const inputKeyword = document.querySelector('.input-keyword');
    const film = await getFilm(inputKeyword.value);
    updateUI(film);
  } catch (err) {
    // console.log(err);
    alert(err);
  }
});

function getFilm(keyword) {
  return fetch('http://www.omdbapi.com/?apikey=daae6649&s=' + keyword)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response.Search;
    });
}

function updateUI(film) {
  let cards = '';
  film.forEach((m) => (cards += showCards(m)));
  const filmContainer = document.querySelector('.film-container');
  filmContainer.innerHTML = cards;
}

// event binding
document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('modal-detail-button')) {
    const imdbid = e.target.dataset.imdbid;
    const filmDetail = await getFilmDetail(imdbid);
    updateUIDetail(filmDetail);
  }
});

function getFilmDetail(imdbid) {
  return fetch('http://www.omdbapi.com/?apikey=daae6649&i=' + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  const filmDetail = showFilmDetail(m);
  const filmBody = document.querySelector('.modal-body');
  filmBody.innerHTML = filmDetail;
}

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
