import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { addTask, deleteTask, editTask } from '../../actions/task';
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
  const {
    task,
    title,
    description,
    open,
    handleClose,
    setState,
    state,
  } = props;
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
        const res = await addTask(1, name, task_description, progress);
        let column = '';
        if (res.data.progress === 'Planned') {
          column = 'column-1';
        } else if (res.data.progress === 'In Progress') {
          column = 'column-2';
        } else if (res.data.progress === 'Done') {
          column = 'column-3';
        }
        const start = state.columns[column];
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.push(res.data.task_id);
        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        setState((state) => ({
          ...state,
          tasks: {
            ...state.tasks,
            [res.data.task_id]: {
              id: res.data.task_id,
              name: res.data.name,
              description: res.data.description,
              progress: res.data.progress,
            },
          },
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn,
          },
        }));
      } else if (title === 'Deleting Task') {
        const res = await deleteTask(task.id);
        if (res.data === 'Success') {
          let newState = state;
          delete newState.tasks[task.id];
          let column = '';
          if (task.progress === 'Planned') {
            column = 'column-1';
          } else if (task.progress === 'In Progress') {
            column = 'column-2';
          } else if (task.progress === 'Done') {
            column = 'column-3';
          }
          newState.columns[column].taskIds.shift(task.id);

          let newTasks = newState.tasks;
          let newColumns = newState.columns;
          console.log(newState);
          setState((state) => ({
            ...state,
            tasks: newTasks,
            columns: newColumns,
          }));
        } else if (title === 'Editing Task') {
          const res = await editTask(task.id);
          let column = '';
          if (res.data.progress === 'Planned') {
            column = 'column-1';
          } else if (res.data.progress === 'In Progress') {
            column = 'column-2';
          } else if (res.data.progress === 'Done') {
            column = 'column-3';
          }
          const start = state.columns[column];
          const newTaskIds = Array.from(start.taskIds);
          newTaskIds.push(res.data.task_id);
          const newColumn = {
            ...start,
            taskIds: newTaskIds,
          };

          setState((state) => ({
            ...state,
            tasks: {
              ...state.tasks,
              [res.data.task_id]: {
                id: res.data.task_id,
                name: res.data.name,
                description: res.data.description,
                progress: res.data.progress,
              },
            },
            columns: {
              ...state.columns,
              [newColumn.id]: newColumn,
            },
          }));
        }
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
