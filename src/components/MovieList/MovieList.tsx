import React, { useEffect, useState } from 'react';
import { MovieCard } from '../MovieCard';
import './MovieList.scss';

export const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const moviesFromLocal: Movie[] = JSON.parse(localStorage.getItem('movies') || '[]');

    setMovies(moviesFromLocal);
  }, []);

  return (
    <div className="MovieList">
      <ul className="MovieList__list">
        {
          movies.map(movie => (
            <li key={movie.imdbId} className="MovieList__item">
              <MovieCard movie={movie} />
            </li>
          ))
        }
      </ul>
    </div>
  );
};
