import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const TaskPopup = (props) => {
  const { title, description, open, handleClose } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        {title === 'Deleting Task' ? (
          <></>
        ) : (
          <>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Task name'
              fullWidth
            />
            <TextField
              autoFocus
              margin='dense'
              id='description'
              label='Task description'
              fullWidth
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary' variant='contained'>
          Confirm
        </Button>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskPopup;
