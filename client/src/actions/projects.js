import axios from 'axios';
export const getProjects = async (user_id) => {
  try {
    const res = await axios.get('/getProjects', {
      params: {
        user_id: user_id,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const getTasks = async (project_id) => {
  try {
    const res = await axios.get('/tasks', {
      params: {
        project_id: project_id,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const addProject = async (project_name, username) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    project_name,
    username,
  });
  //JSON.stringify(projectName)
  try {
    console.log(body);
    const res = await axios.post('/projects', body, config);
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const deleteProject = async (project_id) => {
  try {
    const res = await axios.delete('/projects', {
      params: {
        project_id: project_id,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const editProject = async (project_id, projectName, username) => {
  //JSON.stringify(projectName)
  try {
    const res = await axios.patch('/projects', null, {
      params: {
        project_id: project_id,
        project_name: projectName,
        username: username,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

//export const deleteProjects = async ()

// export const addProjects = async (e) =>{
//   const newProject = try{
//   const res = await axios.get('/getProjects',{
//     params: {
//       user_id: user_id
//     }
//   });
//   return res.data
//   }
//   catch (err) {
//       console.log(err);
//       return err.response.data;
//     }
// };
