import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import initialData from '../data/initialData';
import Column from '../storyboard/Column';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { getTasks } from '../../actions/task';

const Container = styled.div`
  display: flex;
`;

const Storyboard = () => {
  const location = useLocation();
  const [state, setState] = useState(initialData);

  useEffect(() => {
    getTasks(1)
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
  }, []);

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
          {state &&
            state.columnOrder &&
            state.columnOrder.map((columnId) => {
              const column = state.columns[columnId];
              const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  setState={setState}
                />
              );
            })}
        </Container>
      </DragDropContext>
    </motion.div>
  );
};

export default Storyboard;
