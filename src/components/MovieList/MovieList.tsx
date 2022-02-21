import React, { useEffect, useState } from 'react';
import { MovieCard } from '../MovieCard';
import './MovieList.scss';

import moviesFromServer from '../../api/movies.json';

export const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setMovies(moviesFromServer);
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
