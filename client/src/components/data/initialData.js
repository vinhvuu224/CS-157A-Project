const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      name: 'task 1',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    },
    'task-2': {
      id: 'task-2',
      name: 'task 2',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    },
    'task-3': {
      id: 'task-3',
      name: 'task 3',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    },
    'task-4': {
      id: 'task-4',
      name: 'task 4',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    },
    'task-5': {
      id: 'task-5',
      name: 'task 5',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    },
    'task-6': {
      id: 'task-6',
      name: 'task 6',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Planned',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5', 'task-6'],
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
export default initialData;
