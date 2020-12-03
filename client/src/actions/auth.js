import axios from 'axios';
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};
// Register User
export const register = async (
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
) => {
  const body = JSON.stringify({
    email,
    username,
    password,
    confirmPassword,
    city,
    state,
    country,
    timezone,
  });
  let data = {
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
    city: null,
    state: null,
    country: null,
    timezone: null,
  };
  try {
    const res = await axios.post('/signup', body, config);
    if (res.data.usernameError === 'Duplicate username.') {
      data.username = res.data.usernameError;
      return data;
    } else if (res.data.emailError === 'Duplicate email.') {
      data.email = res.data.emailError;
      return data;
    } else if (res.data.confirmPasswordError === 'Password does not match.') {
      data.confirmPassword = res.data.confirmPasswordError;
      return data;
    } else {
      setAuthHeader(
        res.data.token,
        res.data.user_id,
        res.data.email,
        res.data.username
      );
      setUser(res.data);
      history.push('/Home');
    }
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

// Login User
export const login = async (emailUsername, password, history, setUser) => {
  let data = {
    emailUsernameError: null,
    passwordError: null,
  };
  const body = JSON.stringify({
    emailUsername,
    password,
  });
  try {
    const res = await axios.post('/login', body, config);
    console.log(res);
    if (res.data.userEmailError === 'Please enter a valid username/email.') {
      data.emailUsernameError = res.data.userEmailError;
      return data;
    } else if (res.data.passwordError === 'Incorrect password.') {
      data.passwordError = res.data.passwordError;
      return data;
    } else {
      setAuthHeader(
        res.data.token,
        res.data.user_id,
        res.data.email,
        res.data.username
      );
      setUser(res.data);
      history.push('/Home');
    }
  } catch (err) {
    return err.response.data;
  }
};

export const logout = (history, setUser) => async () => {
  setUser(null);
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('userUsername');
  localStorage.removeItem('userEmail');

  delete axios.defaults.headers.common['Authorization'];
  history.push('/');
};

const setAuthHeader = (token, user_id, userEmail, userUsername) => {
  const Token = `${token}`;
  localStorage.setItem('token', Token);
  localStorage.setItem('user_id', user_id);
  localStorage.setItem('userEmail', userEmail);
  localStorage.setItem('userUsername', userUsername);

  axios.defaults.headers.common['Authorization'] = Token;
};
