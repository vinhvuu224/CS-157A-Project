import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import initialData from '../data/initialData';
import Column from '../storyboard/Column';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { getTasks } from '../../actions/projects';


const Container = styled.div`
  display: flex;
`;

// let initialData = {
//   tasks: {},
//   columns: {
//     'column-1': {
//       id: 'column-1',
//       title: 'Planned',
//       taskIds: [],
//     },
//     'column-2': {
//       id: 'column-2',
//       title: 'In Progress',
//       taskIds: [],
//     },
//     'column-3': {
//       id: 'column-3',
//       title: 'Done',
//       taskIds: [],
//     },
//   },
//   columnOrder: ['column-1', 'column-2', 'column-3'],
// };


const Storyboard = () => {
  
  const location = useLocation();
  const [state, setState] = useState(initialData);

  //const [testState, setTestState] = useState();

  // useEffect(() => {
  //   setTestState(myData());
  //   console.log(state);
  // }, []);

 
  useEffect(() => {
    getTasks(1)
      .then(tasks => tasks.map(task => ({
        ...initialData,
        tasks: {
          ...initialData.tasks,
          [task.task_id]: {
            id: task.task_id,
            name: task.name,
            description: task.description,
            progress: task.progress,
          },
        },
      })))
      .then(res => {
        setState(res[0])
      });
  }, [])

  console.log(state)



  //Persiting changes after dragging
  const onDragEnd = (result) => {
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
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
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
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
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
    setState(newState);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <h3 style={{ marginLeft: '1%' }}>{location.projectName}</h3>
        <Container>
          {state && state.columnOrder && state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Container>
      </DragDropContext>
    </motion.div>
  );
};

export default Storyboard;
