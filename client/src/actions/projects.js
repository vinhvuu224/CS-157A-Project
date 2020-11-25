import axios from 'axios';
export const getProjects = async () =>{
    try{    
    const res = await axios.get('/getProjects');
    return res.data
    }
    catch (err) {
        console.log(err);
        return err.response.data;
      }
};