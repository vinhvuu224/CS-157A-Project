import React from 'react';

const initialData = () => {
  const initialData = {
    tasks: {
      1: {
        id: 1,
        name: 'task 1',
        description:
          'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        progress: 'Done',
      },
      2: {
        id: 2,
        name: 'task 2',
        description:
          'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        progress: 'Planned',
      },
      3: {
        id: 3,
        name: 'task 3',
        description:
          'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        progress: 'In Progress',
      },
      4: {
        id: 4,
        name: 'task 4',
        description:
          'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        progress: 'Done',
      },
      5: {
        id: 5,
        name: 'task 5',
        description:
          'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        progress: 'In Progress',
      },
      6: {
        id: 6,
        name: 'task 6',
        description:
          'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        progress: 'Planned',
      },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Planned',
        taskIds: [],
      },
      'column-2': {
        id: 'column-2',
        title: 'In Progress',
        taskIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        taskIds: [],
      },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
  };

  function settingInitialValues() {
    let x = initialData;
    Object.values(x.tasks).map((task) => {
      Object.values(x.columns).map((col) => {
        if (task.progress === col.title) {
          col.taskIds.push(task.id);
        }
      });
    });
    return x;
  }
  return settingInitialValues();
};

export default initialData;
