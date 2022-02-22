import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMoviesList } from '../../store/actions';
import './EditMovie.scss';

type Props = {
  movie: Movie;
};

export const EditMovie: React.FC<Props> = ({ movie }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    title: movie.title,
    description: movie.description,
    imgUrl: movie.imgUrl,
  });

  const handleChange = (key: keyof Movie) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({ ...values, [key]: event.target.value });
  };

  const handlerSave = () => {
    const movies: Movie[] = JSON.parse(localStorage.getItem('movies') || '[]');
    const editedMovies = movies.map(editMovie => {
      if (editMovie.imdbId === movie.imdbId) {
        return {
          title: values.title,
          description: values.description,
          imgUrl: values.imgUrl,
          imdbId: movie.imdbId,
        };
      }

      return editMovie;
    });

    dispatch(setMoviesList(editedMovies));
    localStorage.setItem('movies', JSON.stringify(editedMovies));
  };

  const handlerDelete = () => {
    const movies: Movie[] = JSON.parse(localStorage.getItem('movies') || '[]');

    const editedMovies = movies.filter(deleteMovie => (deleteMovie.imdbId !== movie.imdbId));

    dispatch(setMoviesList(editedMovies));
    localStorage.setItem('movies', JSON.stringify(editedMovies));
  };

  return (
    <section className="EditMovie">
      <form className="EditMovie__form">
        <TextField
          className="EditMovie__input"
          id="standard-title"
          label="Title"
          onChange={handleChange('title')}
          value={values.title}
          variant="standard"
        />
        <div className="EditMovie__description">
          <span>Description</span>
          <textarea
            className="EditMovie__textarea"
            onChange={handleChange('description')}
            value={values.description}
          >
          </textarea>
        </div>
        <TextField
          className="EditMovie__input"
          id="standard-imgUrl"
          label="Image URL"
          onChange={handleChange('imgUrl')}
          value={values.imgUrl}
          variant="standard"
        />
      </form>
      <div>
        <Button
          variant="contained"
          onClick={handlerSave}
          className="EditMovie__button"
        >
          Save
        </Button>
        <Button
          variant="contained"
          onClick={handlerDelete}
          className="EditMovie__button"
        >
          Delete
        </Button>
      </div>
    </section>
  );
};
