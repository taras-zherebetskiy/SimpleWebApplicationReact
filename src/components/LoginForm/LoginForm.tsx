import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/actions';
import './LoginForm.scss';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const [isError, setError] = useState(false);
  const [values, setValues] = useState<logPass>({
    login: '',
    password: '',
  });
  const dispatch = useDispatch();

  const handlerLogIn = () => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const logInUser = users.find(userFind => {
      if (userFind.login === values.login.toLowerCase()
        && userFind.password === values.password) {
        return true;
      }

      return false;
    });

    if (logInUser) {
      dispatch(setUser(logInUser));
      setError(false);
      navigate('/movie_list');
    } else {
      setError(true);
    }
  };

  const handleClickShowPassword = () => {
    setVisiblePassword(!isVisiblePassword);
  };

  const handleChange = (key: keyof logPass) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [key]: event.target.value });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="LoginForm">
      <form className="LoginForm__form">
        <TextField
          error={isError}
          className="LoginForm__input"
          id="standard-required"
          label="Login"
          onChange={handleChange('login')}
          value={values.login}
          variant="standard"
        />
        <FormControl
          variant="standard"
          className="LoginForm__password"
        >
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            error={isError}
            type={isVisiblePassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {isVisiblePassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )}
          />
        </FormControl>

        <Button
          variant="contained"
          onClick={handlerLogIn}
        >
          Log in
        </Button>
      </form>
      {
        isError
        && <span className="LoginForm__error">Can&apos;t find user</span>
      }

    </div>
  );
};
