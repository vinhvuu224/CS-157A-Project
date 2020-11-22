import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginRight: '65%',
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  // if (localStorage.getItem('token')) {
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Button
            className={classes.button}
            onClick={(e) => {
              e.preventDefault();
              history.push('/Home');
            }}
          >
            <Typography variant='h6' className={classes.title}>
              Spartan Collaboration
            </Typography>
          </Button>
          <Button color='inherit'> Profile </Button>
          <Button color='inherit'>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
  //   } else {
  //     return <div></div>;
  //   }
};

export default Header;
