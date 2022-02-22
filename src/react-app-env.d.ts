/// <reference types="react-scripts" />

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbId: string;
};

type User = {
  name: string;
  login: string;
  password: string;
  role: string;
};

type RootState = {
  user: User | null;
  newMovies: Movie[];
  moviesList: Movie[];
};

type logPass = {
  login: string;
  password: string;
};

type newPass = {
  oldPass: string;
  newPass: string;
  errorOldPass: boolean;
  errorNewPass: boolean;
  viewOldPass: boolean;
  viewNewPass: boolean;
};
