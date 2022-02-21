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
import { useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
import './Profile.scss';

export const Profile: React.FC = () => {
  const user = useSelector(getUser);
  const [values, setValues] = useState<newPass>({
    oldPass: '',
    newPass: '',
    errorOldPass: false,
    errorNewPass: false,
    viewOldPass: false,
    viewNewPass: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const isValid = () => {
    if (values.oldPass !== user?.password) {
      setErrorMessage('incorect old password');

      return false;
    }

    if (values.newPass === user?.password) {
      setErrorMessage('New password same');

      return false;
    }

    return true;
  };

  const handleClickShowPassword = (key: keyof newPass) => () => {
    setValues(prevValue => ({ ...prevValue, [key]: !prevValue[key] }));
    setErrorMessage('');
  };

  const handleChange = (key: keyof newPass) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [key]: event.target.value });
    setErrorMessage('');
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handlerSubmit = () => {
    isValid();
  };

  if (!user) {
    return (
      <span>Please log in</span>
    );
  }

  return (
    <div className="Profile">
      <h1>{user.name}</h1>
      <form className="Profile__form">
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

        <span className="Profile__error">{errorMessage}</span>

        <Button
          variant="contained"
          onClick={handlerSubmit}
        >
          Save
        </Button>
      </form>
    </div>
  );
};
