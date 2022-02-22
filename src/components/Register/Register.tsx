import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import './Register.scss';

export const Register: React.FC = () => {
  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const [values, setValues] = useState<User>({
    name: '',
    login: '',
    password: '',
    role: '',
  });
  const [errors, setErrors] = useState({
    login: false,
    password: false,
    name: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  const isUserRegistered = (login: string, users: User[]) => {
    return users.some(user => (user.login === login.toLowerCase()));
  };

  const addUser = (users: User[]) => {
    const newUser = {
      name: values.name,
      login: values.login.toLowerCase(),
      password: values.password,
      role: values.role,
    };

    localStorage.setItem('users', JSON.stringify([...users, newUser]));
  };

  const resetInputs = () => {
    setValues({
      name: '',
      login: '',
      password: '',
      role: '',
    });
    setErrorMessage('');
    setErrors({
      login: false,
      password: false,
      name: false,
    });
  };

  const isValid = (users: User[]) => {
    if (values.name.trim().length < 3) {
      setErrors({ ...errors, name: true });
      setErrorMessage('Type name longer than 3 chars');

      return false;
    }

    if (values.login.trim().length < 3) {
      setErrors({ ...errors, login: true });
      setErrorMessage('Type login longer than 3 chars');

      return false;
    }

    if (isUserRegistered(values.login, users)) {
      setErrorMessage('Login already used');

      return false;
    }

    if (values.password.length < 8) {
      setErrorMessage('Password must be longer than 8 chars');

      return false;
    }

    if (values.role === '') {
      setErrorMessage('Please select role');

      return false;
    }

    return true;
  };

  const handleClickShowPassword = () => {
    setVisiblePassword(!isVisiblePassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (key: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [key]: event.target.value });
  };

  const handleSelect = (event: SelectChangeEvent) => {
    setValues({ ...values, role: event.target.value });
  };

  const handlerSubmit = () => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    if (isValid(users)) {
      addUser(users);
      resetInputs();
      setMessage('New user was created');
    }
  };

  return (
    <div className="Register">
      <form className="Register__form">
        <TextField
          error={errors.name}
          className="Register__input"
          id="standard-name"
          label="Name"
          onChange={handleChange('name')}
          value={values.name}
          variant="standard"
        />
        <TextField
          error={errors.login}
          className="Register__input"
          id="standard-login"
          label="Login"
          onChange={handleChange('login')}
          value={values.login}
          variant="standard"
        />
        <FormControl
          variant="standard"
          className="Register__password"
        >
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            error={errors.password}
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

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="simple-select">Role</InputLabel>
          <Select
            labelId="simple-select"
            id="simple-select-role"
            className="Register__select"
            value={values.role}
            onChange={handleSelect}
            label="Role"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handlerSubmit}
        >
          Register
        </Button>
      </form>
      <span className="Register__error">{errorMessage}</span>
      <span>{message}</span>
    </div>
  );
};
