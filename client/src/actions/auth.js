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
    if (res.data === 'Duplicate username.') {
      data.username = res.data;
      return data;
    } else if (res.data === 'Duplicate email.') {
      data.email = res.data;
      return data;
    } else if (res.data === 'Password does not match.') {
      data.confirmPassword = res.data;
      return data;
    } else {
      setAuthHeader(res.data);
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
    if (res.data.userEmailError === 'Please enter a valid username/email.') {
      data.emailUsernameError = res.data.userEmailError;
      return data;
    } else if (res.data.passError === 'Incorrect password.') {
      data.passwordError = res.data.passError;
      return data;
    } else {
      setAuthHeader(res.data.token, res.data.user_id);
      setUser({user_id: res.data.user_id});
      history.push('/Home');
    }
  } catch (err) {
    return err.response.data;
  }
};

export const logout = (history, setUser) => async () => {
  setUser(null);
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  history.push('/');
};

const setAuthHeader = (token, user_id) => {
  const Token = `${token}`;
  localStorage.setItem('token', Token);
  localStorage.setItem('user_id', user_id);  
  axios.defaults.headers.common['Authorization'] = Token;
};
