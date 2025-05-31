class MovieWatchlist {
    constructor() {
      this.movies = [];
      this.idCounter = 1;
      this.searchTerm = '';
      this.selectedCategory = 'all';
      this.omdbApiKey = '8f829a5b'; 
  
      this.initializeElements();
      this.attachEventListeners();
      this.updateDisplay();
    }
  
    initializeElements() {
      this.searchInput = document.getElementById('searchInput');
      this.categorySelect = document.getElementById('categorySelect');
      this.movieTitleInput = document.getElementById('movieTitle');
      this.addMovieBtn = document.getElementById('addMovieBtn');
      this.moviesGrid = document.getElementById('moviesGrid');
      this.emptyState = document.getElementById('emptyState');
      this.emptyMessage = document.getElementById('emptyMessage');
      this.searchResults = document.getElementById('searchResults');
    }
  
    attachEventListeners() {
      this.searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value;
        this.updateDisplay();
      });
  
      this.categorySelect.addEventListener('change', (e) => {
        this.selectedCategory = e.target.value;
        this.updateDisplay();
      });
  
      this.addMovieBtn.addEventListener('click', () => {
        this.fetchMovieSuggestions(this.movieTitleInput.value.trim());
      });
    }
  
    fetchMovieSuggestions(title) {
      if (!title) return;
  
      fetch(`https://www.omdbapi.com/?apikey=${this.omdbApiKey}&s=${encodeURIComponent(title)}`)
        .then(res => res.json())
        .then(data => {
          this.searchResults.innerHTML = '';
  
          if (data.Search) {
            data.Search.forEach(movie => {
              const resultItem = document.createElement('div');
              resultItem.textContent = `${movie.Title} (${movie.Year})`;
              resultItem.addEventListener('click', () => {
                this.fetchMovieDetailsById(movie.imdbID);
                this.searchResults.innerHTML = '';
                this.movieTitleInput.value = '';
              });
              this.searchResults.appendChild(resultItem);
            });
          } else {
            const noResult = document.createElement('div');
            noResult.textContent = 'No results found.';
            this.searchResults.appendChild(noResult);
          }
        });
    }
  
    fetchMovieDetailsById(imdbID) {
        fetch(`https://www.omdbapi.com/?apikey=${this.omdbApiKey}&i=${imdbID}`)
          .then(res => res.json())
          .then(data => {
            if (data.Title && data.Genre) {
              const movie = {
                id: this.idCounter++,
                title: data.Title,
                genre: data.Genre,
                year: data.Year,
                director: data.Director,
                actors: data.Actors,
                plot: data.Plot,
                poster: data.Poster,
                watched: false
              };
              this.movies.push(movie);
              this.updateDisplay();
            }
          });
      }
      
  
    deleteMovie(id) {
      this.movies = this.movies.filter(movie => movie.id !== id);
      this.updateDisplay();
    }
  
    toggleWatched(id) {
      const movie = this.movies.find(m => m.id === id);
      if (movie) {
        movie.watched = !movie.watched;
        this.updateDisplay();
      }
    }
  
    setWatchedStatus(id, status) {
      const movie = this.movies.find(m => m.id === id);
      if (movie) {
        movie.watched = status;
        this.updateDisplay();
      }
    }
  
    getFilteredMovies() {
      return this.movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesCategory =
          this.selectedCategory === 'all' ||
          (this.selectedCategory === 'watched' && movie.watched) ||
          (this.selectedCategory === 'to-watch' && !movie.watched);
        return matchesSearch && matchesCategory;
      });
    }
  
    updateDisplay() {
      const filteredMovies = this.getFilteredMovies();
  
      if (filteredMovies.length === 0) {
        this.moviesGrid.style.display = 'none';
        this.emptyState.style.display = 'block';
        this.emptyMessage.textContent = this.movies.length === 0
          ? 'Add your first movie to get started!'
          : 'No movies found matching your search.';
      } else {
        this.moviesGrid.style.display = 'grid';
        this.emptyState.style.display = 'none';
        this.renderMovies(filteredMovies);
      }
    }
  
    renderMovies(movies) {
      this.moviesGrid.innerHTML = '';
      movies.forEach(movie => {
        const movieCard = this.createMovieCard(movie);
        this.moviesGrid.appendChild(movieCard);
      });
    }
  
    createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';
      
        card.innerHTML = `
          <div class="movie-poster">
            <img src="${movie.poster !== 'N/A' ? movie.poster : 'placeholder.png'}" alt="${movie.title} poster" />
          </div>
          <div class="movie-info">
            <h3 class="movie-title ${movie.watched ? 'watched' : ''}">${movie.title} (${movie.year})</h3>
            <p class="movie-genre">Genre: ${movie.genre}</p>
            <p class="movie-plot">${movie.plot}</p>
            <br>
            <div class="movie-actions">
              <button class="action-btn to-watch-btn${movie.watched ? '' : ' active'}" data-id="${movie.id}" data-action="mark-to-watch">Mark as To Watch</button>
              <button class="action-btn watched-btn${movie.watched ? ' active' : ''}" data-id="${movie.id}" data-action="mark-watched">Mark as Watched</button>
              <button class="action-btn delete-btn" data-id="${movie.id}" data-action="delete">✕</button>
            </div>
          </div>
        `;
      
        card.querySelector('[data-action="mark-to-watch"]').addEventListener('click', () => {
          this.setWatchedStatus(movie.id, false);
        });
        card.querySelector('[data-action="mark-watched"]').addEventListener('click', () => {
          this.setWatchedStatus(movie.id, true);
        });
      
        card.querySelector('[data-action="delete"]').addEventListener('click', () => {
          this.deleteMovie(movie.id);
        });
      
        return card;
      }
      
      
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new MovieWatchlist();
  });
