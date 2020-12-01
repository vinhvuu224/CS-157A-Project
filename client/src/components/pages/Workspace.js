import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { motion } from 'framer-motion';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));
const Workspace = () => {
  const classes = useStyles();
  const location = useLocation();
  const tasks = [
    {
      name: 'task 1',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    },
    {
      name: 'task 2',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    },
    {
      name: 'task 3',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    },
  ];

  return (
    <motion.div
      className={classes.root}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <h2>{location.projectName}</h2>
      <Grid container spacing={2} direction='column'>
        <Grid item xs={12} container>
          <Grid item xs={3} style={{ maxHeight: 400 }}>
            <h3>Planned</h3>
            <Paper style={{ height: 400, overflow: 'auto' }} elevation={3}>
              {tasks.map((task) => {
                return (
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                          {task.name}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='textSecondary'
                          component='p'
                        >
                          {task.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size='small' color='primary'>
                        Delete
                      </Button>
                      <Button size='small' color='primary'>
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </Paper>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={3} style={{ maxHeight: 400 }}>
            <h3>In Progress</h3>
            <Paper style={{ height: 400, overflow: 'auto' }} elevation={3}>
              {tasks.map((task) => {
                return (
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                          {task.name}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='textSecondary'
                          component='p'
                        >
                          {task.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size='small' color='primary'>
                        Delete
                      </Button>
                      <Button size='small' color='primary'>
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </Paper>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={3} style={{ maxHeight: 400 }}>
            <h3>Done</h3>
            <Paper style={{ height: 400, overflow: 'auto' }} elevation={3}>
              {tasks.map((task) => {
                return (
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                          {task.name}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='textSecondary'
                          component='p'
                        >
                          {task.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size='small' color='primary'>
                        Delete
                      </Button>
                      <Button size='small' color='primary'>
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Workspace;
