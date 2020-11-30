import axios from 'axios';
export const getProjects = async (user_id) =>{
    try{
    const res = await axios.get('/getProjects',{
      params: {
        user_id: user_id
      }
    });
    return res.data
    }
    catch (err) {
        console.log(err);
        return err.response.data;
      }
};

export const getTasks = async (project_id) =>{
  try{
  const res = await axios.get('/tasks',{
    params: {
      project_id: project_id
    }
  });
  console.log("hi my name is vinh: ", res.data)
  return res.data;
  }
  catch (err) {
      console.log(err);
      return err.response.data;
    }
};


// export const getProjectID = async (projectName) =>{
//   try{
//   const res = await axios.get('/getProjects',null,{
//     params: {
//       projectName: projectName
//     }
//   });
//   return res.data
//   }
//   catch (err) {
//       console.log(err);
//       return err.response.data;
//     }
// };
export const addProject = async (projectName) =>{
  //JSON.stringify(projectName)
  try{
  const res = await axios.post('/addProject',null,{
    params: {
      project_name: projectName
    }
  });
  return res.data
  }
  catch (err) {
      console.log(err);
      return err.response.data;
    }
};

export const addProjectUPT = async (user_id,project_id,permission_id) =>{
  //JSON.stringify(projectName)
  try{
  const res = await axios.post('/userprojects',null,{
    params: {
      user_id: user_id,
      project_id: project_id,
      permission_id: permission_id
    }
  });
  return res.data
  }
  catch (err) {
      console.log(err);
      return err.response.data;
    }
};

export const editProject = async (project_id,projectName,username) =>{
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    project_id,
    projectName,
    username
  })
  //JSON.stringify(projectName)
  try{
  const res = await axios.post('/addProject',body,config)
  return res.data
  }
  catch (err) {
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