import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import { UserContext } from '../../UserContext';
import { register } from '../../actions/auth';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(10),
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: theme.spacing(100),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [formState, setForm] = useState({
    email: '',
    emailError: '',
    username: '',
    usernameError: '',
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    city: '',
    cityError: '',
    state: '',
    stateError: '',
    country: '',
    countryError: '',
    timezone: '',
    timezoneError: '',
  });
  const {
    email,
    emailError,
    username,
    usernameError,
    password,
    passwordError,
    confirmPassword,
    confirmPasswordError,
    city,
    cityError,
    state,
    stateError,
    country,
    countryError,
    timezone,
    timezoneError,
  } = formState;
  const classes = useStyles();

  const onChange = (e) =>
    setForm({ ...formState, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await register(
      email,
      username,
      password,
      confirmPassword,
      city,
      state,
      country,
      timezone,
      setUser,
      history
    );
    let errors;
    if (data) {
      errors = {
        emailError: data.email,
        usernameError: data.username,
        passwordError: data.password,
        confirmPasswordError: data.confirmPassword,
        cityError: data.city,
        stateError: data.state,
        countryError: data.country,
        timezoneError: data.timezone,
      };
      setForm({ ...formState, ...errors });
    } else {
      setForm({
        email: '',
        emailError: '',
        username: '',
        usernameError: '',
        password: '',
        passwordError: '',
        confirmPassword: '',
        confirmPasswordError: '',
        city: '',
        cityError: '',
        state: '',
        stateError: '',
        country: '',
        countryError: '',
        timezone: '',
        timezoneError: '',
      });
    }
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={2} direction='column'>
        <Grid item xs={12} container>
          <Grid item xs={4} />
          <Paper>
            <Container component='main' maxWidth='xs'>
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                  Register
                </Typography>
                <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        variant='outlined'
                        error={usernameError}
                        required
                        fullWidth
                        id='username'
                        value={username}
                        onChange={(e) => onChange(e)}
                        label='Username'
                        name='username'
                        autoComplete='username'
                      />
                      <FormHelperText error>{usernameError}</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={emailError}
                        variant='outlined'
                        required
                        fullWidth
                        id='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                      />
                      <FormHelperText error>{emailError}</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={passwordError}
                        variant='outlined'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        onChange={(e) => onChange(e)}
                        value={password}
                        type='password'
                        id='password'
                        autoComplete='current-password'
                      />
                      <FormHelperText error>{passwordError}</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={confirmPasswordError}
                        variant='outlined'
                        required
                        fullWidth
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => onChange(e)}
                        label='Re-enter Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                      />
                      <FormHelperText error>
                        {confirmPasswordError}
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant='outlined'
                        error={cityError}
                        required
                        fullWidth
                        id='city'
                        value={city}
                        onChange={(e) => onChange(e)}
                        label='City'
                        name='city'
                        autoComplete='city'
                      />
                      <FormHelperText error>{cityError}</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant='outlined'
                        error={stateError}
                        required
                        fullWidth
                        id='state'
                        value={state}
                        onChange={(e) => onChange(e)}
                        label='State'
                        name='state'
                        autoComplete='state'
                      />
                      <FormHelperText error>{stateError}</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant='outlined'
                        error={countryError}
                        required
                        fullWidth
                        id='country'
                        value={country}
                        onChange={(e) => onChange(e)}
                        label='Country'
                        name='country'
                        autoComplete='country'
                      />
                      <FormHelperText error>{countryError}</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant='outlined'
                        error={timezoneError}
                        required
                        fullWidth
                        id='timezone'
                        value={timezone}
                        onChange={(e) => onChange(e)}
                        label='Time Zone'
                        name='timezone'
                        autoComplete='timezone'
                      />
                      <FormHelperText error>{timezoneError}</FormHelperText>
                    </Grid>
                  </Grid>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justify='flex-end'>
                    <Grid item>
                      <Link to='/login' variant='body2'>
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
