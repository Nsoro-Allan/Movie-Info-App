// script.js
const url = 'https://imdb-top-100-movies.p.rapidapi.com/'; // Adjust endpoint if needed for newer movies
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '25b8d607b4msh3f5201ef901d80bp1b23b4jsnc0cac72f9cde',
        'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
    }
};

const moviesContainer = document.getElementById('movies-container');
let moviesData = [];

async function fetchMovies() {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        moviesData = await response.json();
        displayMovies(moviesData);
    } catch (error) {
        console.error(error);
        moviesContainer.innerHTML = '<p>Failed to load movies. Please try again later.</p>';
    }
}

function displayMovies(movies) {
    moviesContainer.innerHTML = ''; // Clear previous movies
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.addEventListener('click', () => openModal(movie));

        const moviePoster = document.createElement('img');
        moviePoster.src = movie.image; // Adjust based on actual response structure
        moviePoster.alt = movie.title;
        moviePoster.classList.add('movie-poster');

        const movieDetails = document.createElement('div');
        movieDetails.classList.add('movie-details');

        const movieTitle = document.createElement('h2');
        movieTitle.textContent = movie.title;
        movieTitle.classList.add('movie-title');

        const movieYear = document.createElement('p');
        movieYear.textContent = movie.year;
        movieYear.classList.add('movie-year');

        movieDetails.appendChild(movieTitle);
        movieDetails.appendChild(movieYear);

        movieCard.appendChild(moviePoster);
        movieCard.appendChild(movieDetails);

        moviesContainer.appendChild(movieCard);
    });
}

function filterMovies() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredMovies = moviesData.filter(movie => movie.title.toLowerCase().includes(searchInput));
    displayMovies(filteredMovies);
}

function openModal(movie) {
    const modal = document.getElementById('movie-modal');
    document.getElementById('modal-title').textContent = movie.title;
    document.getElementById('modal-image').src = movie.image;
    document.getElementById('modal-name').textContent = `Name: ${movie.title}`; // Adding movie name to modal
    document.getElementById('modal-year').textContent = `Year: ${movie.year}`;
    document.getElementById('modal-summary').textContent = movie.summary; // Adjust this if the API returns summary or similar field
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('movie-modal');
    modal.style.display = 'none';
}

// Fetch and display movies on page load
fetchMovies();
