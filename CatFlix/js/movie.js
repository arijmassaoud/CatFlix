const API_KEY = '6fc8934276ad4a3ee456238f297d1778'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Elements
const categories = document.getElementById('categories');
const movieGrid = document.getElementById('movieGrid');
const movieModal = document.getElementById('movieModal');
const movieTrailer = document.getElementById('movieTrailer');
const movieDetails = document.getElementById('movieDetails');
const closeModal = movieModal.querySelector('.close');
const searchInput = document.getElementById('search');
const searchForm = document.querySelector('.search-form');

// Fetch movies by category
async function fetchMovies(category) {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${category}`, {
            params: { api_key: API_KEY }
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

// Fetch movies by search query
async function searchMovies(query) {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query: query
            }
        });
        displayMovies(response.data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Display movies in the grid
function displayMovies(movies) {
    movieGrid.innerHTML = ''; // Clear the current grid
    if (movies.length === 0) {
        movieGrid.innerHTML = '<p>No movies found</p>'; // Display message if no movies found
    }
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <button class="details-button" data-id="${movie.id}">Details</button>
        `;
        movieGrid.appendChild(movieCard);
    });
}

// Fetch and display movie details
async function showMovieDetails(movieId) {
    try {
        const [details, videos] = await Promise.all([
            axios.get(`${BASE_URL}/movie/${movieId}`, { params: { api_key: API_KEY } }),
            axios.get(`${BASE_URL}/movie/${movieId}/videos`, { params: { api_key: API_KEY } })
        ]);

        const movie = details.data;
        const trailer = videos.data.results.find(video => video.type === 'Trailer');

        movieDetails.innerHTML = `
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <p><strong>Release Date:</strong> ${movie.release_date}</p>
        `;
        movieTrailer.src = trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';
        movieModal.style.display = 'block';
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

// Close modal
closeModal.addEventListener('click', () => {
    movieModal.style.display = 'none';
    movieTrailer.src = '';
});

// Event listener for categories
categories.addEventListener('click', async (event) => {
    const button = event.target;
    if (button.classList.contains('category-button')) {
        document.querySelector('.category-button.active').classList.remove('active');
        button.classList.add('active');

        const category = button.getAttribute('data-category');
        const movies = await fetchMovies(category);
        displayMovies(movies);
    }
});

// Search form submission event
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    const query = searchInput.value.trim();
    if (query) {
        searchMovies(query); // Call the search function
    }
});

// Event listener for movie details button click
movieGrid.addEventListener('click', (event) => {
    const button = event.target;
    if (button.classList.contains('details-button')) {
        const movieId = button.getAttribute('data-id');
        showMovieDetails(movieId);
    }
});

// Load default movies on page load (you can remove this if you want only search functionality)
document.addEventListener('DOMContentLoaded', async () => {
    const defaultCategory = 'popular';
    const movies = await fetchMovies(defaultCategory);
    displayMovies(movies);
});
