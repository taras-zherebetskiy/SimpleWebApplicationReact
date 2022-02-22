import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
import { FindMovie } from '../FindMovie';
import { NewMoviesList } from '../NewMoviesList';
import './AdminAddMovie.scss';

export const AdminAddMovie: React.FC = () => {
  const user = useSelector(getUser);

  if (user?.role !== 'admin') {
    return (
      <span>Please log in</span>
    );
  }

  return (
    <div className="AdminAddMovie">
      <div className="AdminAddMovie__page-content">
        <NewMoviesList />
      </div>
      <div className="AdminAddMovie__sidebar">
        <FindMovie />
      </div>
    </div>
  );
};
