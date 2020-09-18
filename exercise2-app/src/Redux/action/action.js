import Axios from 'axios'
import {api} from '../../API/api'

export const Login = (username, password) => {
    
    return(dispatch) => {
        Axios.post(api + '/users/loginUser',{username, password})
       .then(res => {
         console.log(res.data);
         if(res.data === 'User or Password Invalid'){
           alert('Login Gagal')
         }
         else {
           dispatch({
             type : 'LOGIN',
             payload : res.data[0]
           })
           alert('Login Success')
           console.log(res.data[0])
          
      
         }   
       })
       .catch(err => {
         console.log(err);
         
       })
    }
}