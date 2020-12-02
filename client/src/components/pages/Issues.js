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
import { addIssue } from '../../actions/issues';
import { editIssue } from '../../actions/issues';
import { deleteIssue } from '../../actions/issues';
import IssuePopup from '../popups/IssuePopup';
import { getIssues } from '../../actions/issues';
import { useLocation } from 'react-router-dom';






const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Issues = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [issues, setIssues] = useState([]);

  const [issueKey, setIssueKey] = useState(0);

  const [buttonTitle, setButtonTitle] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [userInputName, setUserInputName] = useState("");
  const [userInputDescription, setUserInputDescription] = useState("");
  
  const [priorityLevelDetail, setPriorityLevelDetail] = useState("");
  const [issueNameDetail, setIssueNameDetail] = useState("");
  const [issueDescriptionDetail, setIssueDescDetail] = useState("");
  const location = useLocation();


 
  useEffect(()=>{
    const user_id = JSON.parse(localStorage.getItem('user_id'));
    
    getIssues(location.projectKey)
      //.then( res => res.map( obj => ({"key":obj.project_id, "name":obj.project_name})))
      .then( res => setIssues([...res]));
  }, [] )




  const handleClickOpen = () => {
    setOpen(true);
  };



  const onClickSetIssueKey = (issueKey) => {
    setIssueKey(issueKey)  
  };

  const onClickEditButton = (title) => {
    setButtonTitle(title)
    
  };

  const onClickAddButton = (title) => {
    setButtonTitle(title)
  };

  const grabIssueDetails = (issueKey) => {
    issues.map(issue=>{
            
        if(issue.issue_id === issueKey){
           setIssueNameDetail(issue.name);
           setIssueDescDetail(issue.description);
           setPriorityLevelDetail(issue.priority_level);
        }
        
      })
  };


  const handleClose = () => {
    setDescription("");
    setOpen(false);
  };
  const classes = useStyles();
  let history = useHistory();



  const grabUserInputName = (e) =>{
  setUserInputName(e.target.value)
}
const grabUserInputDescription = (e) =>{
    setUserInputDescription(e.target.value)
  }


  const  onSubmit = async (e) => {
    e.preventDefault()
    if(buttonTitle === 'Add'){
     const res = await addIssue(location.projectKey,userInputName,userInputDescription,priorityLevel)

     const newIssue = {issue_id: res.issue_id, project_id:res.project_id,name:res.name,description:res.description,priority_level:res.priority_level}

     const listOfIssues = issues; 
     listOfIssues.push(newIssue)
     setIssues([...listOfIssues])
     setUserInputName("")
     setUserInputDescription("")
     setPriorityLevel("")
    }
    else if(buttonTitle === 'Edit'){
      editIssue(issueKey,2,userInputName,userInputDescription,priorityLevel)
        const items = issues
        
        items.map(item=>{             
        
          if(item.issue_id === issueKey){
            
            item.issue_id = issueKey;
            item.name = userInputName;
            item.description = userInputDescription;
            item.priority_level = priorityLevel;
        
          }
             }
        )
        setIssues([...items])
        setUserInputName("")
        setUserInputDescription("")
        setPriorityLevel("")
    }
    else{
      deleteIssue(issueKey)
      const filteredItems = issues.filter(item =>
      item.issue_id !== issueKey
      );
      setIssues([...filteredItems])
    }
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
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <h3 >Your Issues</h3>
              <IconButton 
                
                aria-label='Add'
                color='primary'
                onClick={(e) => {
                  e.preventDefault();
                  setTitle('Adding Issues');
                  setDescription('Please set the name, description, and priority level of your issue.');
                  handleClickOpen();
                  
                }}
              >
                <AddIcon onClick={()=>{onClickAddButton("Add")}} />
                
             </IconButton>
             </div>
              <Divider />
              <List style={{ overflowY: 'auto', height: '500px' }}>
                {issues.map((issue) => {
                  return (
                    <div>
                      <ListItem>
                        <ListItem
                          className={classes.listItem}
                          button
                          onClick={(e) => {
                            e.preventDefault();
                            setTitle('Issue Details')
                            grabIssueDetails(issue.issue_id);
                            handleClickOpen();

                          }}
                        >
                          <ListItemText
                            primary={issue.name}
                            style={{ maxWidth: 200 }}
                          />
                        </ListItem>
                        <IconButton
                           
                          aria-label='Edit'
                          color='primary'
                          onClick={(e) => {
                            e.preventDefault();
                            setTitle('Editing Issue');
                            setDescription('Please set a new name, description, and/or priority level.');
                            onClickSetIssueKey(issue.issue_id)
                            handleClickOpen();
                          }}
                        >
                        <CreateIcon onClick={() =>{onClickSetIssueKey(issue.issue_id);onClickEditButton('Edit')}} />
                        </IconButton>
                        <IconButton
                          aria-label='Add'
                          color='secondary'
                          onClick={(e) => {
                            e.preventDefault();
                            setTitle('Deleting Issue');
                            setDescription(
                              'Are you sure you want to delete your issue?'
                            );
                            handleClickOpen();
                          }}
                        >
                          <DeleteIcon onClick={() =>{onClickSetIssueKey(issue.issue_id);onClickAddButton("Delete")}} />
                          
                        </IconButton>

                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
              </List>
            </Paper>
            <IssuePopup
              title={title}
              open={open}
              description={description}
              handleClose={handleClose}
              onSubmit={onSubmit}
              grabUserInputName={grabUserInputName}
              grabUserInputDescription={grabUserInputDescription}
              userInputName={userInputName}
              userInputDescription={userInputDescription}
              setPriorityLevel={setPriorityLevel}
              priorityLevel={priorityLevel}
              priorityLevelDetail={priorityLevelDetail}
              issueNameDetail={issueNameDetail}
              issueDescriptionDetail={issueDescriptionDetail}
            ></IssuePopup>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Issues;