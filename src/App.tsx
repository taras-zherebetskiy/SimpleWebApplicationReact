import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { AdminAddMovie } from './components/AdminAddMovie';
import { HomePage } from './components/HomePage';
import { LoginForm } from './components/LoginForm';
import { MovieList } from './components/MovieList';
import { Nav } from './components/Nav';
import { Profile } from './components/Profile';
import { Register } from './components/Register';
import moviesFromServer from './api/movies.json';
import { EditPage } from './components/EditPage';

const admin = {
  name: 'Admin',
  login: 'admin',
  password: 'admin123',
  role: 'admin',
};

const user = {
  name: 'User',
  login: 'user',
  password: 'user1234',
  role: 'user',
};

export const App: React.FC = () => {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  const movies: Movie[] = JSON.parse(localStorage.getItem('movies') || '[]');

  if (movies.length === 0) {
    localStorage.setItem('movies', JSON.stringify([...moviesFromServer]));
  }

  if (users.length === 0) {
    localStorage.setItem('users', JSON.stringify([admin, user]));
  }

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie_list" element={<MovieList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add_movie" element={<AdminAddMovie />} />
        <Route path="/edit_movie_list" element={<EditPage />} />
      </Routes>
    </div>
  );
};
