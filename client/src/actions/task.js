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

export const addTask = async (project_id, name, description, progress) => {
  try {
    const res = await axios.post(
      '/tasks',
      {
        params: {
          project_id: project_id,
          name: name,
          description: description,
          progress: progress,
        },
      },
      config
    );
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
  try {
    const res = await axios.patch(
      '/tasks',
      {
        params: {
          task_id: task_id,
          param_name: name,
          description: description,
          progress: progress,
        },
      },
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
