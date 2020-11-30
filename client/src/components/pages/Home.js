import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import ProjectPopup from '../popups/ProjectPopup';
import { getProjects } from '../../actions/projects';
import { UserContext } from '../../UserContext';
import { addProject } from '../../actions/projects';
import { editProject } from '../../actions/projects';
<<<<<<< HEAD
import { addProjectUPT } from '../../actions/projects';

=======
>>>>>>> 175922d... adding projects now works




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Home = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState([""]);

 
  useEffect(()=>{
    const user_id = JSON.parse(localStorage.getItem('user_id'));
    getProjects(user_id)
      .then( res => res.map( obj => ({"key":obj.project_id, "name":obj.project_name})))
      .then( res => setProjects(res));
  }, [] )

  console.log(projects)
  // const {user,setUser} = useContext(UserContext)
  // console.log(user)

  // const testing = JSON.parse(localStorage.getItem('user_id'));
  // console.log("This is the user_id: ", testing)
  // const testing2 = JSON.stringify(localStorage.getItem('userEmail'));
  // console.log("This is the userEmail: ", testing2)
  // const testing3 = JSON.stringify(localStorage.getItem('userUsername'));
  // console.log("This is the userUsername: ", testing3)


  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  let history = useHistory();
  function nextPage(e) {
    history.push({ pathname: '/Storyboard', projectName: e });
  }

  const projNameInput = (e) =>{
  setProjectName(e.target.value)}
  //setProjects({ ...projects, [e.target.name]: e.target.value });

<<<<<<< HEAD
  const onSubmit = (e,title) => {
    e.preventDefault()
    if(title = ""){
    const user_id = JSON.parse(localStorage.getItem('user_id'));
     addProject(projectName)
     .then(res => {});
    console.log(projectName)
    }
=======
  const onSubmit = (e) => {
    e.preventDefault()
     addProject(projectName)
     .then(res => res)


    console.log(projectName)
>>>>>>> 175922d... adding projects now works
  }

  
  const editSubmit = (e) => {
    e.preventDefault()
    const user_id = JSON.parse(localStorage.getItem('user_id'));
     editProject(user_id,projectName)
     .then(res => res)


    console.log(projectName)
  }
  

  return (
    <div className={classes.root}>
      <Grid container spacing={2} direction='column'>
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
              <List style={{ overflowY: 'auto', height: '500px' }}>
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
                        <IconButton
                          aria-label='Edit'
                          color='primary'
                          onClick={(e) => {
                            e.preventDefault();
                            setTitle('Editing Project');
                            setDescription('Please rename your project here.');
                            handleClickOpen();
                          }}
                        >
                          <CreateIcon />
                        </IconButton>
                        <IconButton
                          aria-label='Add'
                          color='secondary'
                          onClick={(e) => {
                            e.preventDefault();
                            setTitle('Deleting Project');
                            setDescription(
                              'Are you sure you want to delete your project?'
                            );
                            handleClickOpen();
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
              </List>
              <p>{projectName}</p>
              <IconButton
                aria-label='Add'
                color='primary'
                style={{ marginLeft: '40%' }}
                onClick={(e) => {
                  e.preventDefault();
                  setTitle('Adding Project');
                  setDescription('Please name your project here.');
                  handleClickOpen();
                }}
              >
                <AddIcon />
              </IconButton>
            </Paper>
            <ProjectPopup
              title={title}
              open={open}
              description={description}
              handleClose={handleClose}
              onSubmit={onSubmit}
              projNameInput={projNameInput}
            ></ProjectPopup>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;

//  <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
//    <DialogTitle id='form-dialog-title'>Editing Project</DialogTitle>
//    <DialogContent>
//      <DialogContentText>Please rename your project here.</DialogContentText>
//      <TextField
//        autoFocus
//        margin='dense'
//        id='name'
//        label='Project name'
//        type='email'
//        fullWidth
//      />
//    </DialogContent>
//    <DialogActions>
//      <Button onClick={handleClose} color='primary' variant='contained'>
//        Confirm
//      </Button>
//      <Button onClick={handleClose} color='primary'>
//        Cancel
//      </Button>
//    </DialogActions>
//  </Dialog>;

//   <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
//     <DialogTitle id='form-dialog-title'>Deleting Project</DialogTitle>
//     <DialogContent>
//       <DialogContentText>
//         Are you sure you want to delete your project?
//       </DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={handleClose} color='primary' variant='contained'>
//         Confirm
//       </Button>
//       <Button onClick={handleClose} color='primary'>
//         Cancel
//       </Button>
//     </DialogActions>
//   </Dialog>;

//  <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
//    <DialogTitle id='form-dialog-title'>Adding Project</DialogTitle>
//    <DialogContent>
//      <DialogContentText>Please name your project here.</DialogContentText>
//      <TextField
//        autoFocus
//        margin='dense'
//        id='name'
//        label='Project name'
//        type='email'
//        fullWidth
//      />
//    </DialogContent>
//    <DialogActions>
//      <Button onClick={handleClose} color='primary' variant='contained'>
//        Add
//      </Button>
//      <Button onClick={handleClose} color='primary'>
//        Cancel
//      </Button>
//    </DialogActions>
//  </Dialog>;
