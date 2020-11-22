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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  let history = useHistory();
  const projects = [{ name: 'etst' }, { name: '12312' }, { name: 'Rsadwqqdw' }];
  function nextPage(e) {
    history.push({ pathname: '/Storyboard', projectName: e });
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
            <Paper elevation={3}>
              <h3 style={{ marginLeft: '20%' }}>Your Projects</h3>
              <Divider />
              <List style={{ overflow: 'auto', height: 200 }}>
                {projects.map((project) => {
                  return (
                    <div>
                      <ListItem>
                        <ListItem
                          className={classes.listItem}
                          button
                          onClick={(e) => {
                            e.preventDefault();
                            nextPage(project.name);
                          }}
                        >
                          <ListItemText
                            primary={project.name}
                            style={{ maxWidth: 200 }}
                          />
                        </ListItem>
                        <IconButton aria-label='Edit' color='primary'>
                          <CreateIcon />
                        </IconButton>
                        <IconButton aria-label='Add' color='secondary'>
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
              </List>
              <IconButton
                aria-label='Add'
                color='primary'
                style={{ marginLeft: '40%' }}
                onClick={handleClickOpen}
              >
                <AddIcon />
              </IconButton>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
              >
                <DialogTitle id='form-dialog-title'>Adding Project</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please name your project here.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Project name'
                    type='email'
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    color='primary'
                    variant='contained'
                  >
                    Add
                  </Button>
                  <Button onClick={handleClose} color='primary'>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
