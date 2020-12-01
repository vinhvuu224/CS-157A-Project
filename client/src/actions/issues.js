import axios from 'axios';

export const getIssues = async (project_id) => {
  try {
    const res = await axios.get('/issues', {
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

export const addIssue = async (project_id,name, description, priority_level) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      project_id,
      name,
      description,
      priority_level
    });
    //JSON.stringify(projectName)
    try {
      console.log(body);
      const res = await axios.post('/issues', body, config);
      return res.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  };

  export const editIssue = async (issue_id,project_id,name, description, priority_level) => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({
        issue_id,
        project_id,
        name,
        description,
        priority_level
      });
    try {
      const res = await axios.patch('/issues',body,config );
      return res.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  };

  export const deleteIssue = async (issue_id) => {
    try {
      const res = await axios.delete('/issues', {
        params: {
            issue_id: issue_id,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  };