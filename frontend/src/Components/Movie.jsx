import React from 'react';
import { Star } from 'phosphor-react';
import fetchMovieData from '../assets/Data/MovieData';

const Movie = () => {
    const [movies, setMovies] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const getMovies = async () => {
            try {
                const data = await fetchMovieData();
                console.log('Fetched movie data:', data);
                setMovies(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        getMovies();
    }, []);
    if (loading) {
        return <div className="loading">Loading movies...</div>;
    }
    if (error) {
        return <div className="error">Error: {error}</div>;
    }
    return (
        <>
        
            {movies.map((movie) => (

        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
          onClick={ () => {

          }}
    >
      <div className="relative">
        <img src={movie.posterUrl} alt={movie.title} className="w-full h-80 object-cover" />
        <div className="absolute top-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded flex items-center gap-1">
          <Star size={14} className="text-red-500 fill-red-500" />
          <span className="text-white text-sm font-semibold">{movie.rating}/10</span>
        </div>
        <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-semibold">
          {movie.format}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{movie.genre}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{movie.language}</span>
        </div>
      </div>
    </div>
            ))}
        </>
    );
}

export default Movie;