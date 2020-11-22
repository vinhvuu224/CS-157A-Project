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
  setUser,
  history
) => {
  const body = JSON.stringify({
    email,
    username,
    password,
    confirmPassword,
  });
  let data = {
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
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
    if (res.data === 'Please enter a valid username/email.') {
      data.emailUsernameError = res.data;
      return data;
    } else if (res.data === 'Incorrect password.') {
      data.passwordError = res.data;
      return data;
    } else {
      setAuthHeader(res.data);
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
  delete axios.defaults.headers.common['Authorization'];
  history.push('/');
};

const setAuthHeader = (token) => {
  const Token = `${token}`;
  localStorage.setItem('token', Token);
  axios.defaults.headers.common['Authorization'] = Token;
};
