import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;
const Task = (props) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Typography gutterBottom variant='h5' component='h2'>
            {props.task.name}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.task.description}
          </Typography>
          <IconButton aria-label='Edit' color='primary'>
            <CreateIcon />
          </IconButton>
          <IconButton aria-label='Add' color='secondary'>
            <DeleteIcon />
          </IconButton>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
