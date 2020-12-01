import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';




const IssuePopup = (props) => {
  const {priorityLevelDetail,issueNameDetail,issueDescriptionDetail,priorityLevel,setPriorityLevel, title, description, open, handleClose, onSubmit, grabUserInputName, grabUserInputDescription, userInputName, userInputDescription } = props;
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  const classes = useStyles();
  const [progress, setProgress] = useState('');
  const handleChange = (event) => {
  setPriorityLevel(event.target.value);
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
        {title === 'Deleting Issue' ? (
          <></>
        ) : title === 'Issue Details' ? (
            <div>
            <TextField
            autoFocus
            margin='dense'
            id='name'

            label='Issue Name'
            name = "userInputName"
            fullWidth
            defaultValue={issueNameDetail}
            InputProps={{
            readOnly: true,
          }}
          />

          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Issue description'
            name = "userInputDescription"
            fullWidth
            defaultValue={issueDescriptionDetail}
            InputProps={{
            readOnly: true,
          }}

          />

        <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Priority Level'
            name = "userInputDescription"
            fullWidth
            defaultValue={priorityLevelDetail}
            InputProps={{
            readOnly: true,
          }}

          />
            </div>   
        ) : ( 
          
        <div>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Issue name'
            name = "userInputName"
            value = {userInputName}
            fullWidth
            onChange={(e) => grabUserInputName(e)}
          />

          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Issue description'
            name = "userInputDescription"
            value = {userInputDescription}
            fullWidth
            onChange={(e) => grabUserInputDescription(e)}
          />

            <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>Priority Level</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={priorityLevel}
                onChange={handleChange}
              >
                <MenuItem value={'Low'}>Low</MenuItem>
                <MenuItem value={'Medium'}>Medium</MenuItem>
                <MenuItem value={'High'}>High</MenuItem>
              </Select>
            </FormControl>

            </div>
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

export default IssuePopup;
