import React from 'react';
import './NewMoviesList.scss';
import { useSelector } from 'react-redux';
import { MovieCard } from '../MovieCard';
import { getNewMovies } from '../../store/selectors';

export const NewMoviesList: React.FC = () => {
  const movies = useSelector(getNewMovies);

  return (
    <ul className="NewMoviesList">
      {movies.map(movie => (
        <li key={movie.imdbId} className="NewMoviesList__item">
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
};
