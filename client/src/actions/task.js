import axios from 'axios';
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getTasks = async (project_id) => {
  try {
    const res = await axios.get(
      '/tasks',
      { params: { project_id: project_id } },
      config
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const addTask = async (project_id, name, task_description, progress) => {
  const description = task_description;
  const body = JSON.stringify({
    project_id,
    name,
    description,
    progress,
  });
  try {
    const res = await axios.post('/tasks', body, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = async (task_id) => {
  try {
    const res = await axios.delete(
      '/tasks',
      { params: { task_id: task_id } },
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const editTask = async (task_id, name, description, progress) => {
  const body = JSON.stringify({
    task_id,
    name,
    description,
    progress,
  });
  try {
    const res = await axios.patch('/tasks', body, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};
