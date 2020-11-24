import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const TaskPopup = (props) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  const { title, description, open, handleClose } = props;
  const classes = useStyles();
  const [progress, setProgress] = useState('');
  const handleChange = (event) => {
    setProgress(event.target.value);
  };
  return (
    <Dialog
      open={open}
      onClose={(e) => {
        handleClose();
        setProgress(null);
      }}
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
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>Progress</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={progress}
                onChange={handleChange}
              >
                <MenuItem value={'Planned'}>Planned</MenuItem>
                <MenuItem value={'In Progress'}>In Progress</MenuItem>
                <MenuItem value={'Done'}>Done</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => {
            handleClose();
            setProgress(null);
          }}
          color='primary'
          variant='contained'
        >
          Confirm
        </Button>
        <Button
          onClick={(e) => {
            handleClose();
            setProgress(null);
          }}
          color='primary'
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskPopup;
