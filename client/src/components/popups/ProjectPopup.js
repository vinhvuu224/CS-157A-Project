import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';



const ProjectPopup = (props) => {
  const {permissionLevel,setPermissionLevel,usernameInput, grabUsernameInput, title, description, open, handleClose, onSubmit, grabUserInput,userInput} = props;
  
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const classes = useStyles();

  const handleChange = (event) => {
    setPermissionLevel(event.target.value);
    };
  return (
    
    <Dialog
    //put form
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
      <form onSubmit={(e) => onSubmit(e)}>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        {title === 'Deleting Project' ? (
          <></>
        ) : title === 'Collaborate With Other Users' ? (
          <div>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Username'
            name = "usernameInput"
            value = {usernameInput}
            fullWidth
            onChange={(e) => grabUsernameInput(e)}
          />

              <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>Priority Level</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={permissionLevel}
                onChange={handleChange}
              >
                <MenuItem value={'Full'}>Full</MenuItem>
                <MenuItem value={'Partial'}>Partial</MenuItem>
                <MenuItem value={'Read-Only'}>Read-Only</MenuItem>
              </Select>
            </FormControl>
        
          </div>   
      ) : (
          
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Project name'
            name = "userInput"
            value = {userInput}
            fullWidth
            onChange={(e) => grabUserInput(e)}
          />
        )
        
        
        }
      </DialogContent>
     
      <DialogActions>
        <Button type="submit" onClick={handleClose} color='primary' variant='contained'>
          Confirm
        </Button>
        
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
      </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProjectPopup;
