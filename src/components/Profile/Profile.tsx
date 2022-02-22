import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/actions';
import { getUser } from '../../store/selectors';
import './Profile.scss';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [values, setValues] = useState<newPass>({
    oldPass: '',
    newPass: '',
    errorOldPass: false,
    errorNewPass: false,
    viewOldPass: false,
    viewNewPass: false,
  });
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isValid = () => {
    if (values.oldPass !== user?.password) {
      setErrorMessage('Incorect old password');
      setValues(prevValue => ({ ...prevValue, errorOldPass: true }));

      return false;
    }

    if (values.newPass.length < 8) {
      setErrorMessage('Password must be longer than 8 chars');
      setValues(prevValue => ({ ...prevValue, errorNewPass: true }));

      return false;
    }

    if (values.newPass === user?.password) {
      setErrorMessage('New password same');
      setValues(prevValue => ({ ...prevValue, errorNewPass: true }));

      return false;
    }

    return true;
  };

  const setGoodMessage = () => {
    setMessage('Your password was change');
  };

  const changePass = () => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const newUsers = users.map(userProfile => {
      if (userProfile.login === user?.login
        && userProfile.password === user?.password) {
        dispatch(setUser({
          ...user,
          password: values.newPass,
        }));

        return {
          ...user,
          password: values.newPass,
        };
      }

      return userProfile;
    });

    localStorage.setItem('users', JSON.stringify(newUsers));
  };

  const resetInputs = () => {
    setValues({
      oldPass: '',
      newPass: '',
      errorOldPass: false,
      errorNewPass: false,
      viewOldPass: false,
      viewNewPass: false,
    });
  };

  const handleClickShowPassword = (key: keyof newPass) => () => {
    setValues(prevValue => ({
      ...prevValue,
      [key]: !prevValue[key],
      errorNewPass: false,
      errorOldPass: false,
    }));
    setMessage('');
    setErrorMessage('');
  };

  const handleChange = (key: keyof newPass) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [key]: event.target.value,
      errorNewPass: false,
      errorOldPass: false,
    });
    setMessage('');
    setErrorMessage('');
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handlerSubmit = () => {
    if (isValid()) {
      resetInputs();
      setGoodMessage();
      changePass();
    }
  };

  const handlerLogOut = () => {
    dispatch(setUser(null));
  };

  if (!user) {
    navigate('/login');

    return (
      <div className="Profile">
        <h1>Please log in</h1>
      </div>
    );
  }

  return (
    <div className="Profile">
      <h1>Profile</h1>
      <div className="Profile__container">
        <h3>{user.name}</h3>
        <Button
          className="Profile__logout"
          variant="contained"
          onClick={handlerLogOut}
        >
          Log out
        </Button>
      </div>
      <form className="Profile__form">
        <h3>Change password</h3>

        <FormControl
          variant="standard"
          className="Profile__password"
        >
          <InputLabel htmlFor="standard-adornment-old-password">Old password</InputLabel>
          <Input
            id="standard-adornment-old-password"
            error={values.errorOldPass}
            type={values.viewOldPass ? 'text' : 'password'}
            value={values.oldPass}
            onChange={handleChange('oldPass')}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword('viewOldPass')}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.viewOldPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )}
          />
        </FormControl>
        <FormControl
          variant="standard"
          className="Profile__password"
        >
          <InputLabel htmlFor="standard-adornment-new-password">New password</InputLabel>
          <Input
            id="standard-adornment-new-password"
            error={values.errorNewPass}
            type={values.viewNewPass ? 'text' : 'password'}
            value={values.newPass}
            onChange={handleChange('newPass')}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword('viewNewPass')}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.viewNewPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )}
          />
        </FormControl>
        <Button
          variant="contained"
          onClick={handlerSubmit}
        >
          Save
        </Button>
        <span className="Profile__error">{errorMessage}</span>
        <span className="Profile__message">{message}</span>
      </form>
    </div>
  );
};
