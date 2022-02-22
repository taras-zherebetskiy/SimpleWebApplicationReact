import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMoviesList } from '../../store/actions';
import { getMoviesList, getUser } from '../../store/selectors';
import { EditMovie } from '../EditMovie';
import { MovieCard } from '../MovieCard';
import './EditPage.scss';

export const EditPage: React.FC = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const movies = useSelector(getMoviesList);

  useEffect(() => {
    const moviesLocal: Movie[] = JSON.parse(localStorage.getItem('movies') || '[]');

    dispatch(setMoviesList(moviesLocal));
  }, []);

  if (user?.role !== 'admin') {
    return (
      <span>Please log in</span>
    );
  }

  return (
    <div className="EditPage">
      <ul className="EditPage__list">
        {
          movies.map(movie => (
            <li key={movie.imdbId} className="EditPage__item">
              <MovieCard movie={movie} />
              <EditMovie movie={movie} />
            </li>
          ))
        }
      </ul>
    </div>
  );
};
