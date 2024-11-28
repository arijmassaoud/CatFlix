const api_key = '6fc8934276ad4a3ee456238f297d1778';
const access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmM4OTM0Mjc2YWQ0YTNlZTQ1NjIzOGYyOTdkMTc3OCIsIm5iZiI6MTczMjMxMTMzMy44NjM0NTYsInN1YiI6IjY3NDBmMmM1MWNkOGMyNDNlNmJlNzhjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H0__08qz0aoT64PKlqbOASGrZJepnp-kT6ks-A7nt0w';

const base_url = 'https://api.themoviedb.org/3';
const base_img = 'https://image.tmdb.org/t/p/w500';
const get_movies = 'discover/movie';
const get_tv = 'discover/tv';
const trending_tv='trending/tv';
const trending_movie='trending/movie';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${access_token}`,
    }
};

async function fetchTrendingTv(time) {
    const url = `${base_url}/trending/tv/${time}?api_key=${api_key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        GetTrendingTv(data.results); // Call the function to display data
    } catch (error) {
        console.error("Error fetching trending TV shows:", error);
    }
}
async function fetchTrendingmovie(time) {
    const url = `${base_url}/trending/movie/${time}?api_key=${api_key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        GetTrendingMovie(data.results); // Call the function to display data
    } catch (error) {
        console.error("Error fetching trending movies:", error);
    }
}


// Event listeners for buttons
document.getElementById('day_Btn').addEventListener('click', () => {   
    fetchTrendingmovie('day');
});
// Event listeners for buttons
document.getElementById('week_Btn').addEventListener('click', () => {   
    fetchTrendingmovie('week');   
});

document.getElementById('day_Btn2').addEventListener('click', () => {
    fetchTrendingTv('day');
});
document.getElementById('week_Btn2').addEventListener('click', () => {
    fetchTrendingTv('week');
});

// Function to handle trending TV shows
function GetTrendingTv(series) {
    const latest_episodes = document.querySelector('.Trending_tv');
    latest_episodes.innerHTML = ''; // Clear previous content

    series.forEach(tv => {
        const url = `${base_url}/tv/${tv.id}?api_key=${api_key}`;
        fetch(url, options)
            .then(res => res.json())
            .then(res => {
                latest_episodes.innerHTML += `
                    <div class="col-lg-4 col-6 mb-4 mb-lg-2">
                        <div class="custom-block custom-block-full trending-tv">
                            <div class="custom-block-image-wrap">
                                <a href="detail-page.html">
                                    <img src="${base_img}${res.poster_path || 'default-image.jpg'}" class="custom-block-image img-fluid" alt="">
                                </a>
                            </div>
                            <div class="custom-block-info">
                                <h5 class="mb-2">
                                    <a href="detail-page.html">${res.name}</a>
                                </h5>
                              <div class="custom-block-info">
                                <div class="custom-block-top d-flex mb-2">
                                    <small class="me-4">
                                        <i class="bi-clock-fill custom-icon"></i>
                                        ${res.episode_run_time} min
                                    </small>

                                    <small>Episode <span class="badge"> ${res.number_of_episodes}</span></small>
                                </div>
                                <p class="mb-0"> ${res.overview}</p>
                                <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                    <a href="#" class="bi-headphones me-1">
                                        <span>100k</span>
                                    </a>
                                    <a href="#" class="bi-heart me-1">
                                        <span>2.5k</span>
                                    </a>
                                    <a href="#" class="bi-chat me-1">
                                        <span>924k</span>
                                    </a>
                                </div>
                            </div>
                            <div class="social-share d-flex flex-column ms-auto">
                                <a href="#" class="badge ms-auto">
                                    <i class="bi-heart"></i>
                                </a>
                                <a href="#" class="badge ms-auto">
                                    <i class="bi-bookmark"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            })
            .catch(err => console.error(err));
    });
}

// Function to handle trending Movies
function GetTrendingMovie(movies) {
    const latest_movies = document.querySelector('.Trending_movie');
    latest_movies.innerHTML = ''; // Clear previous content

    movies.forEach(movie => {
        const url = `${base_url}/movie/${movie.id}?api_key=${api_key}`;
        fetch(url, options)
            .then(res => res.json())
            .then(res => {
                latest_movies.innerHTML += `
                    <div class="col-lg-4 col-6 mb-4 mb-lg-2">
                        <div class="custom-block custom-block-full trending-movie">
                            <div class="custom-block-image-wrap">
                                <a href="detail-page.html">
                                    <img src="${base_img}${res.poster_path || 'default-image.jpg'}" class="custom-block-image img-fluid" alt="">
                                </a>
                            </div>
                            <div class="custom-block-info">
                                <h5 class="mb-2">
                                    <a href="detail-page.html">${res.original_title}</a>
                                </h5>
                                 <div class="custom-block-info">
                                <div class="custom-block-top d-flex mb-2">
                                    <small class="me-4">
                                        <i class="bi-clock-fill custom-icon"></i>
                                        ${res.runtime} min
                                    </small>

                                
                                 </div>
                                <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                    <a href="#" class="bi-headphones me-1">
                                        <span>100k</span>
                                    </a>
                                    <a href="#" class="bi-heart me-1">
                                        <span>2.5k</span>
                                    </a>
                                    <a href="#" class="bi-chat me-1">
                                        <span>924k</span>
                                    </a>
                                </div>
                            </div>
                            <div class="social-share d-flex flex-column ms-auto">
                                <a href="#" class="badge ms-auto">
                                    <i class="bi-heart"></i>
                                </a>
                                <a href="#" class="badge ms-auto">
                                    <i class="bi-bookmark"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            })
            .catch(err => console.error(err));
    });
}

async function fetchTv(api) {
    const response = await fetch(api, options);
    const data = await response.json();
    GetTv(data.results);
}


async function fetchMovies(api) {
    const response = await fetch(api, options);
    const data = await response.json();
    setCarousel(data.results);
    getMovieDetails(data.results);
}

function getMovieDetails(movies) {
    let movies_urls = [];
    const latest_episodes = document.querySelector('.latest-episodes');

    // Collect all movie URLs to fetch details
    movies.forEach(movie => {
        const url = `${base_url}/movie/${movie.id}`;
        movies_urls.push(url);
    });

    // Fetch a subset of movie details
    const movies_urls_to_fetch = movies_urls.slice(8, 10);
    movies_urls_to_fetch.forEach((url, index) => {  // Add 'index' here to use it
        fetch(url, options)
            .then(res => res.json())
            .then(res => {
                latest_episodes.innerHTML += `
                    <div class="col-lg-6 col-12 mb-4 mb-lg-0">
                        <div class="custom-block d-flex">
                            <div class="">
                                <div class="custom-block-icon-wrap">
                                    <div class="section-overlay"></div>
                                    <a href="detail-page.html" class="custom-block-image-wrap">
                                        <img src=${base_img}${res.poster_path} class="custom-block-image img-fluid" alt="">

                                        <a href="#" class="custom-block-icon">
                                            <i class="bi-play-fill"></i>
                                        </a>
                                    </a>
                                </div>

                                <div class="mt-2">
                                    <a href="#" class="btn custom-btn">
                                        Subscribe
                                    </a>
                                </div>
                            </div>

                            <div class="custom-block-info">
                                <div class="custom-block-top d-flex mb-1">
                                    <small class="me-4">
                                        <i class="bi-clock-fill custom-icon"></i>
                                        ${res.runtime}
                                    </small>

                                    <small>Episode  <span class="badge">${res.number_of_episodes}</span></small>
                                </div>

                                <h5 class="mb-2">
                                    <a href="detail-page.html">
                                        ${res.original_title}
                                    </a>
                                </h5>

                                <div class="profile-block d-flex">
                                    <img src="${base_img}${res.production_companies[0].logo_path}" class="profile-block-image img-fluid" alt="">

                                    <p>
                                        ${res.production_companies[0].name}
                                        <img src="images/verified.png" class="verified-image img-fluid" alt="verified">
                                        <strong>${res.production_companies[0].origin_country}</strong>
                                    </p>
                                </div>

                                <p class="mb-0">${res.review}</p>

                                <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                    <a href="#" class="bi-headphones me-1">
                                        <span>${res.runtime}</span>
                                    </a>

                                    <a href="#" class="bi-heart me-1">
                                        <span>${res.popularity}</span>
                                    </a>

                                    <a href="#" class="bi-chat me-1">
                                        <span>11k</span>
                                    </a>

                                    <a href="#" class="bi-download">
                                        <span>50k</span>
                                    </a>
                                </div>
                            </div>

                            <div class="d-flex flex-column ms-auto">
                                <a href="#" class="badge ms-auto">
                                    <i class="bi-heart"></i>
                                </a>

                                <a href="#" class="badge ms-auto">
                                    <i class="bi-bookmark"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                `;

                // Dynamically update ::before content based on movie data
                const ratingValue = res.vote_average; // Get rating from movie details

                const dynamicCSS = `
                    .custom-block-overlay:nth-child(${index + 1}):hover::before {
                        content: "Rating: ⭐ ${ratingValue}"; /* Dynamically add rating */
                    }
                `;

                // Add the dynamic CSS
                addDynamicCSS(dynamicCSS);
            })
            .catch(err => console.error(err));
    });

    // Function to dynamically inject CSS rules
    function addDynamicCSS(css) {
        const styleSheet = document.head.querySelector('style') || document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.appendChild(document.createTextNode(css));
        document.head.appendChild(styleSheet);
    }
}


async function setCarousel(movies) {
    const carousel = document.querySelector('.owl-carousel');
    const heroSection = document.querySelector('.hero-section');

    // Clear existing carousel content
    carousel.innerHTML = '';

    // Populate carousel with movies
    movies.forEach((movie, index) => {
        const movieTitle = (movie.original_title || 'Untitled').split(' ').slice(0, 3).join(' ');
        carousel.innerHTML += `
            <div class="owl-carousel-info-wrap item" data-index="${index}">
                <img src="${base_img}${movie.poster_path || 'default-image.jpg'}" class="owl-carousel-image img-fluid" alt="${movie.original_title}">
                <div class="owl-carousel-info">
                    <h6 class="mb-2">${movieTitle}</h6>
                    <span class="badge">${movie.original_language}</span>
                    <span class="badge">${movie.release_date}</span>
                </div>
            </div>
        `;
    });

    // Initialize Owl Carousel
    const owl = $(carousel);
    owl.owlCarousel({
        center: true,
        loop: true,
        margin: 30,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: { items: 1 },
            768: { items: 3 },
            1200: { items: 4 }
        }
    });

    // Set initial background to the first movie
    if (movies.length > 0) {
        heroSection.style.backgroundImage = `url('${base_img}${movies[0].poster_path}')`;
    }

    // Update background when carousel changes
    owl.on('changed.owl.carousel', function (event) {
        const currentIndex = event.item.index - event.relatedTarget._clones.length / 2;
        const actualIndex = (currentIndex + movies.length) % movies.length; // Ensure proper looping
        const currentMovie = movies[actualIndex];

        heroSection.style.backgroundImage = `url('${base_img}${currentMovie.poster_path}')`;
    });
}

async function GetTv(series) {
    let series_urls = [];
    const latest_episodes = document.querySelector('.top_rated_tv');

    series.forEach(tv => {
        const url = `${base_url}/tv/${tv.id}`;
        series_urls.push(url);
    });

    const series_urls_to_fetch = series_urls.slice(7, 13);
    series_urls_to_fetch.forEach(url => {
        fetch(url, options)
            .then(res => res.json())
            .then(res => {
                latest_episodes.innerHTML += `
                    <div class="col-lg-3 col-md-4 col-6 mb-4 ">
                        <div class="custom-block custom-block-overlay h-100 w-100">
                            <a href="detail-page.html" class="custom-block-image-wrap d-block">
                                <img src="${base_img}${res.poster_path}" class="custom-block-image img-fluid w-100 h-100 object-cover" alt="">
                            </a>
                            <div class="custom-block-info custom-block-overlay-info p-2">
                                <h5 class="mb-1 text-truncate">
                                    <a href="listing-page.html" class="text-white">${res.original_title}</a>
                                </h5>
                                <p class="badge mb-0">12 Episodes</p>
                            </div>
                        </div>
                    </div>
                `;
            })
            .catch(err => console.error(err));
    });
}




const api_url = `${base_url}/${get_movies}?api_key=${api_key}`;
const api_tv = `${base_url}/${get_tv}?api_key=${api_key}`;

// Initial fetch for the week
fetchTrendingmovie('week');
fetchTrendingTv('week');
fetchTv(api_tv);
fetchMovies(api_url);
