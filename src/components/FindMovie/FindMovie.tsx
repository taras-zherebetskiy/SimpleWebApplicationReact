import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilm } from '../../api/api';
import { clearNewMovie, setNewMovie } from '../../store/actions';
import { getNewMovies } from '../../store/selectors';
import { Loader } from '../Loader';
import { MovieCard } from '../MovieCard';
import './FindMovie.scss';

export const FindMovie: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isError, setError] = useState(false);
  const listMovies = useSelector(getNewMovies);

  const loadMovie = async () => {
    const film = await getFilm(name);

    if (film.Response === 'True') {
      setMovie({
        title: film.Title,
        description: film.Plot,
        imgUrl: film.Poster,
        imdbId: film.imdbID,
      });
      setError(false);
    } else {
      setMovie(null);
      setError(true);
    }
  };

  const isAdded = () => {
    return listMovies.every(movieAdd => (movieAdd.imdbId !== movie?.imdbId));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
    setError(false);
  };

  const handlerFind = async () => {
    setLoading(true);
    await loadMovie();

    setLoading(false);
  };

  const handlerAdd = () => {
    if (movie && isAdded()) {
      dispatch(setNewMovie(movie));
    }

    setError(false);
    setName('');
    setMovie(null);
  };

  const handlerSave = () => {
    const movies: Movie[] = JSON.parse(localStorage.getItem('movies') || '[]');
    const filteredNewMovies = listMovies.filter(newMovie => {
      return movies.every(item => (newMovie.imdbId !== item.imdbId));
    });

    localStorage.setItem('movies', JSON.stringify([...movies, ...filteredNewMovies]));
    dispatch(clearNewMovie());
  };

  return (
    <div className="FindMovie">
      <h1 className="FindMovie__title">Search movie</h1>
      <form className="FindMovie__form">
        <TextField
          error={isError}
          className="FindMovie__input"
          id="standard-name"
          label="Movie name"
          onChange={handleChange}
          value={name}
          variant="standard"
        />
        <Button
          variant="contained"
          onClick={handlerFind}
        >
          Find movie
        </Button>
        {
          isError
            && (
              <span className="FindMovie__error">
                Can&apos;t find movie
              </span>
            )
        }
        {
          movie
          && (
            <Button
              variant="contained"
              onClick={handlerAdd}
            >
              Add to list
            </Button>
          )
        }
      </form>
      {
        isLoading && <Loader />
      }
      {
        movie && <MovieCard movie={movie} />
      }
      {
        !!listMovies.length
        && (
          <Button
            variant="contained"
            onClick={handlerSave}
          >
            Save
          </Button>
        )
      }
    </div>
  );
};
