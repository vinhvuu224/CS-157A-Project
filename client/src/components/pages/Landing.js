import React from 'react';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Register from '../auth/Register';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  box: {
    display: 'flex',
    height: 700,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Aspira Webfont, Helvetica, Arial, sans-serif',
    fontSize: 50,
    fontWeight: 200,
    color: 'white',
  },
  box2: {
    display: 'flex',
    height: 500,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Aspira Webfont, Helvetica, Arial, sans-serif',
    fontSize: 30,
    fontWeight: 200,
    color: 'white',
  },
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid direction='column'>
        <Grid item xs={12} container>
          <Grid item xs={3} />
          <Grid item xs={4}>
            <Box className={classes.box}>
              Do more with our Task Management Application
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Register />
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={3} />
          <Grid item xs={5}>
            <Box className={classes.box2}>
              State of the art project management tools
            </Box>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={3} />
          <Grid item xs={5}>
            <Box className={classes.box2}>
              Collaborate with your friends and teammates
            </Box>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={3} />
          <Grid item xs={5}>
            <Box className={classes.box2}>Track bugs and Review more code</Box>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
