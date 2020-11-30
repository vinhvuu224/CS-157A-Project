import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const ProjectPopup = (props) => {
  const { title, description, open, handleClose, onSubmit, projNameInput } = props;

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
        ) : (
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Project name'
            fullWidth
            onChange={(e) => projNameInput(e)}
          />
        )}
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
