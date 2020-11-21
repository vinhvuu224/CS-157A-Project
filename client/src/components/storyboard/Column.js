import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 450px;
  overflow: auto;
  height: 500px;
`;
const Title = styled.h3`
  padding: 8px;
  color: white;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
  min-height: 500px;
`;
const Column = (props) => {
  return (
    <Container>
      <Title>
        {props.column.title}
        <IconButton aria-label='Add' color='primary'>
          <AddIcon />
        </IconButton>
      </Title>

      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
