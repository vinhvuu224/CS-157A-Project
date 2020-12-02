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


const ProjectPopup = (props) => {
  const {usernameInput, grabUsernameInput, title, description, open, handleClose, onSubmit, grabUserInput,userInput} = props;

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
