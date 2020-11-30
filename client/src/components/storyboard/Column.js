import React, { useState } from 'react';
import styled from 'styled-components';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import TaskPopup from '../popups/TaskPopup';
const Container = styled.div`
  margin: 1%;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 40%;
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
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <Title>
        {props.column.title}
        <IconButton
          aria-label='Add'
          color='primary'
          onClick={(e) => {
            e.preventDefault();
            setTitle('Adding Task');
            setDescription(
              'Please name your task and give it a description here.'
            );
            handleClickOpen();
          }}
        >
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
              <Task
                key={task.id}
                task={task}
                index={index}
                setTitle={setTitle}
                setDescription={setDescription}
                handleClickOpen={handleClickOpen}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      <TaskPopup
        setState={props.setState}
        title={title}
        open={open}
        description={description}
        handleClose={handleClose}
      ></TaskPopup>
    </Container>
  );
};

export default Column;
