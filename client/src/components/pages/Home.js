import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {},
  listItem: {},
  button: {},
}));

const Home = () => {
  const classes = useStyles();
  let history = useHistory();
  const projects = [{ name: 'etst' }, { name: '12312' }, { name: 'owifjwei' }];
  function nextPage(e) {
    history.push({ pathname: '/Workspace', projectName: e });
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={2} direction='column'>
        <Grid item xs={12} container></Grid>
        <Grid item xs={12} container>
          <Grid item xs={4} />
          <motion.div
            initial={{ opacity: 0, y: 120, x: 120 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Paper elevation={3} className={classes.paper}>
              <h3>Your Projects</h3>
              <Divider />
              <List>
                {projects.map((project) => {
                  return (
                    <div>
                      <ListItem
                        className={classes.listItem}
                        button
                        onClick={(e) => {
                          e.preventDefault();
                          nextPage(project.name);
                        }}
                      >
                        <ListItemText primary={project.name} />
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
              </List>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
              >
                Add Project
              </Button>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
