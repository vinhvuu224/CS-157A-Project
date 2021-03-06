import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useHistory } from 'react-router-dom';
import initialData from '../data/initialData';
import Column from '../storyboard/Column';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { getTasks } from '../../actions/task';
import { editTask } from '../../actions/task';
import Button from '@material-ui/core/Button';
import { getProjectUsers } from '../../actions/projectUsers';
import { Chip } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { deleteProjectUsers } from '../../actions/projectUsers';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const Container = styled.div`
  display: flex;
`;

const Storyboard = () => {
  const location = useLocation();
  const [state, setState] = useState(initialData);
  const history = useHistory();
  const [userKey, setUserKey] = useState(0);
  const [userPermissionLevel, setUserPermissionlevel] = useState(
    location.projectName.permission
  );
  const [userUsername, setUserUsername] = 'vinhvu123';
  const [chipData, setChipData] = useState([]);

  const localUsername = localStorage.getItem('userUsername');

  useEffect(() => {
    getTasks(location.projectName.projectkey)
      .then((tasks) => {
        let newData = state;
        tasks.map((task) => {
          newData = {
            ...newData,
            tasks: {
              ...newData.tasks,
              [task.task_id]: {
                id: task.task_id,
                name: task.name,
                description: task.description,
                progress: task.progress,
              },
            },
          };
        });
        return newData;
      })
      .then((res) => {
        let x = res;
        Object.values(x.tasks).map((task) => {
          Object.values(x.columns).map((col) => {
            if (task.progress === col.title) {
              col.taskIds.push(task.id);
            }
          });
        });
        setState(x);
      });

    getProjectUsers(location.projectName.projectkey)
      .then((res) =>
        res.map((obj) => ({
          key: obj.user_id,
          label: obj.username,
          permission_level: obj.permission_level,
        }))
      )
      .then((res) => setChipData(res));
  }, []);

  const handleDelete = (chipToDelete) => async () => {
    setUserKey(userKey);
    await deleteProjectUsers(location.projectName.projectkey, chipToDelete.key);
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const onClickDeleteUserButton = (userKey) => {
    setUserKey(userKey);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }));

  const classes = useStyles();

  //Persiting changes after dragging
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];
    if (start === finish) {
      let newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      newTaskIds.map((newTaskId) => {
        if (typeof newTaskId === 'string') {
          let newTaskId2 = parseInt(newTaskId);
          newTaskIds[newTaskIds.indexOf(newTaskId)] = newTaskId2;
        }
      });
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    let finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    finishTaskIds.map((finishTask) => {
      if (typeof finishTask === 'string') {
        let finishTask2 = parseInt(finishTask);
        finishTaskIds[finishTaskIds.indexOf(finishTask)] = finishTask2;
      }
    });

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    const task_id = draggableId;
    const editState = newState.tasks[draggableId];
    const name = editState.name;
    const description = editState.description;
    let progress;
    if (newFinish.id === 'column-1') {
      progress = 'Planned';
    } else if (newFinish.id === 'column-2') {
      progress = 'In Progress';
    } else if (newFinish.id === 'column-3') {
      progress = 'Done';
    }
    setState(newState);
    await editTask(task_id, name, description, progress);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <h3 style={{ marginLeft: '1%' }}>{location.projectName.projectname}</h3>
        <Button
          color='primary'
          variant='contained'
          onClick={(e) => {
            e.preventDefault();
            history.push({
              pathname: '/issues',
              projectKey: location.projectName.projectkey,
            });
          }}
        >
          {' '}
          Issues{' '}
        </Button>

        <Container>
          {state &&
            state.columnOrder &&
            state.columnOrder.map((columnId) => {
              const column = state.columns[columnId];
              const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
              return (
                <Column
                  key={column.id}
                  permission={location.projectName.permission}
                  column={column}
                  tasks={tasks}
                  project_id={location.projectName.projectkey}
                  setState={setState}
                  state={state}
                />
              );
            })}
        </Container>
      </DragDropContext>
      <div>
        <header>User</header>
        <Paper component='ul' className={classes.root}>
          {chipData.map((data) => {
            return localUsername === data.label ? undefined : (
              <li key={data.key}>
                <Chip
                  label={data.label}
                  onDelete={
                    userPermissionLevel !== 'Full'
                      ? undefined
                      : handleDelete(data)
                  }
                  className={classes.chip}
                />
              </li>
            );
          })}
          {/* <Chip 
      label="React"
      onDelete={() => {console.log("hello")}}
      /> */}
        </Paper>
      </div>
    </motion.div>
  );
};

export default Storyboard;
