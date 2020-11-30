import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { addTask } from '../../actions/task';
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
  const { title, description, open, handleClose, setState } = props;
  const classes = useStyles();
  const [data, setData] = useState({
    id: '',
    name: '',
    task_description: '',
    progress: '',
  });
  const { id, name, task_description, progress } = data;
  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (title === 'Adding Task') {
        console.log('works');
        const res = await addTask(1, name, description, progress);
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={(e) => {
        handleClose();
      }}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
      <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
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
                value={name}
                name='name'
                onChange={(e) => onChange(e)}
                label='Task name'
                fullWidth
              />
              <TextField
                autoFocus
                margin='dense'
                id='description'
                value={task_description}
                name='task_description'
                onChange={(e) => onChange(e)}
                label='Task description'
                fullWidth
              />
              <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-label'>Progress</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={progress}
                  name='progress'
                  onChange={(e) => onChange(e)}
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
            type='submit'
            onClick={(e) => {
              handleClose();
            }}
            color='primary'
            variant='contained'
          >
            Confirm
          </Button>
          <Button
            onClick={(e) => {
              handleClose();
            }}
            color='primary'
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskPopup;
