import React, { useState, useEffect } from 'react';

const Movies = () => {
    const [movies, setMovies] = useState([]); // Initialize as an empty array
    const [error, setError] = useState('');

    const fetchMovies = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=ae3c46fb2aaa4f8441a81925946c1c9d&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc');
            const data = await response.json();

            console.log(data); // Debugging: Log the API response

            if (data.results && data.results.length > 0) {
                setMovies(data.results); // Set movies if results exist
                setError(''); // Clear previous errors
            } else {
                setError('No movies found');
                setMovies([]); // Clear movie list if no results
            }
        } catch (err) {
            setError('Failed to fetch movies');
            console.error(err); // Log error for debugging
        }
    };

    useEffect(() => {
        fetchMovies(); // Fetch movies when the component mounts
    }, []);

    // Base URL for images
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div style={{ padding: '20px', backgroundColor: '#001f3f', minHeight: '100vh' }}>
            <h1 style={{ fontFamily: 'Montserrat, sans-serif', textAlign: 'center', color: '#ffffff' }}>Popular Movies</h1>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <div key={movie.id} style={{ margin: '15px', width: '200px', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                            <img 
                                src={`${imageBaseUrl}${movie.poster_path}`} 
                                alt={movie.title} 
                                style={{ width: '100%', borderBottom: '2px solid #eee' }} 
                            />
                            <div style={{ padding: '10px' }}>
                                <h3 style={{ fontSize: '16px', margin: '0 0 5px', color: 'red' }}>{movie.title}</h3>
                                <p style={{ fontSize: '14px', color: '#555' }}>{movie.overview}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: '#ffffff' }}>No movies to display</p>
                )}
            </div>
        </div>
    );
};

export default Movies;
