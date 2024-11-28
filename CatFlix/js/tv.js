const API_KEY = '6fc8934276ad4a3ee456238f297d1778'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Elements
const categories = document.getElementById('categories');
const tvGrid = document.getElementById('tvGrid'); // Updated to "tvGrid"
const tvModal = document.getElementById('tvModal'); // Updated to "tvModal"
const tvTrailer = document.getElementById('tvTrailer'); // Updated to "tvTrailer"
const tvDetails = document.getElementById('tvDetails'); // Updated to "tvDetails"
const searchInput = document.getElementById('search');
const searchForm = document.querySelector('.search-form');

// Safeguard for Modal Close Button
if (tvModal) {
    const closeModal = tvModal.querySelector('.close');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            tvModal.style.display = 'none';
            tvTrailer.src = '';
        });
    }
}

// Fetch TV shows by category
async function fetchTVShows(category) {
    try {
        const response = await axios.get(`${BASE_URL}/tv/${category}`, {
            params: { api_key: API_KEY },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching TV shows:', error);
        return [];
    }
}

// Fetch TV shows by search query
async function searchTV(query) {
    try {
        const response = await axios.get(`${BASE_URL}/search/tv`, {
            params: { api_key: API_KEY, query: query },
        });
        displayTVShows(response.data.results);
    } catch (error) {
        console.error('Error searching for TV shows:', error);
    }
}

// Display TV shows in the grid
function displayTVShows(tvShows) {
    if (!tvGrid) {
        console.error("Error: tvGrid element is not found in the DOM.");
        return;
    }

    tvGrid.innerHTML = ''; // Clear the current grid
    if (tvShows.length === 0) {
        tvGrid.innerHTML = '<p>No TV shows found.</p>';
        return;
    }

    tvShows.forEach((tv) => {
        const tvCard = document.createElement('div');
        tvCard.classList.add('tv-card'); // Updated to "tv-card"
        tvCard.innerHTML = `
            <img src="${IMG_BASE_URL}${tv.poster_path || ''}" alt="${tv.name || 'No Title'}">
            <h3>${tv.name || 'Untitled'}</h3>
            <button class="details-button" data-id="${tv.id}">Details</button>
        `;
        tvGrid.appendChild(tvCard);
    });
}

// Fetch and display TV show details
async function showTVShowDetails(tvId) {
    try {
        const [details, videos] = await Promise.all([
            axios.get(`${BASE_URL}/tv/${tvId}`, { params: { api_key: API_KEY } }),
            axios.get(`${BASE_URL}/tv/${tvId}/videos`, { params: { api_key: API_KEY } }),
        ]);

        const tv = details.data;
        const trailer = videos.data.results.find((video) => video.type === 'Trailer');

        if (tvDetails) {
            tvDetails.innerHTML = `
                <h2>${tv.name}</h2>
                <p>${tv.overview}</p>
                <p><strong>First Air Date:</strong> ${tv.first_air_date}</p>
                <p><strong>Genres:</strong> ${tv.genres.map((genre) => genre.name).join(', ')}</p>
            `;
        }

        if (tvTrailer) {
            tvTrailer.src = trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';
        }

        if (tvModal) {
            tvModal.style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching TV show details:', error);
    }
}

// Event listener for categories
if (categories) {
    categories.addEventListener('click', async (event) => {
        const button = event.target;
        if (button.classList.contains('category-button')) {
            document.querySelector('.category-button.active')?.classList.remove('active');
            button.classList.add('active');

            const category = button.getAttribute('data-category');
            const tvShows = await fetchTVShows(category);
            displayTVShows(tvShows);
        }
    });
}

// Event listener for search form submission
if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        const query = searchInput?.value.trim();
        if (query) {
            searchTV(query); // Call the search function
        }
    });
}

// Event listener for TV show details button click
if (tvGrid) {
    tvGrid.addEventListener('click', (event) => {
        const button = event.target;
        if (button.classList.contains('details-button')) {
            const tvId = button.getAttribute('data-id');
            showTVShowDetails(tvId);
        }
    });
}

// Load default TV shows on page load
document.addEventListener('DOMContentLoaded', async () => {
    const defaultCategory = 'popular';
    const tvShows = await fetchTVShows(defaultCategory);
    displayTVShows(tvShows);
});
