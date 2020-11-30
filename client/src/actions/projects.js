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