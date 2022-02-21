/// <reference types="react-scripts" />

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  price?: number;
};

type User = {
  name: string;
  login: string;
  password: string;
  role: string;
};

type RootState = {
  user: User | null;
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
