import axios from 'axios';

export const getProjectUsers = async (project_id) => {
    try {
      const res = await axios.get('/userprojects', {
        params: {
          project_id: project_id
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  };
  
  export const addProjectUsers = async (username, project_id,permission_level) => {
    const body = JSON.stringify({
        username,
        project_id,
        permission_level,
      });
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    try {
        const res = await axios.post('/userprojects', 
          body
        ,config);
        return res.data;
      } catch (err) {
        console.log(err);
        return err.response.data;
      }
  };

  export const deleteProjectUsers = async (project_id,user_id) => {
    try {
        const res = await axios.delete('/userprojects', {
          params: {
            project_id: project_id,
            user_id: user_id
          },
        });
        return res.data;
      } catch (err) {
        console.log(err);
        return err.response.data;
      }
  };