import React,{Component} from 'react'
import Axios from 'axios'
import { api } from '../API/api'
import { connect } from 'react-redux'
import { Table, Button } from 'reactstrap'
import './Todo.css'

class ToDo extends Component {
    state = {
        activity : []
    }

    componentDidMount = () => {
       let  { id } = this.props
       this.getAllTodo(id)
      
    }
    onDelete = (ID) => {
      let  { id } = this.props
      return Axios.delete(api + `/users/deleteTodo/${ID}`)
      .then(res => {
        console.log(res.data);
      })
      .then(() => {
        this.getAllTodo(id)
      })
      .catch(err => {
        console.log(err);
        
      })
    }

    renderBody = () => {
      let { history } = this.props
      return this.state.activity.map((activity,index) => {
          return (
            
              <tr key = {index + 1}>
                <th scope = 'row' className = "Number">
                  {index + 1}
                </th>
                <td>{activity.TodoList}</td>
                <td className = 'Date'>{activity.Date}</td>
                <td className = "Action">
                  <Button
                    className = "Edit"
                    color = "info"
                    value = "Edit"
                    size = "sm"
                    onClick = {() => {
                      history.push(`/edit/${activity.idusers_todo}`)
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                     value = "DELETE"
                     color = "danger"
                     size = "sm"
                     onClick = {() => this.onDelete(activity.idusers_todo)}
                  >
                    DELETE
                  </Button>
                </td>
              </tr>
            
          )
      })
    }
    


    getAllTodo = (id) => {
      
     return Axios.get(api + `/users/getAllToDo/${id}`)
      .then(res => {
        console.log(res.data[0]);
       
       
        this.setState({activity : res.data})
        
      })
      .then(() => {
        console.log(this.state.activity);
        
      })
      .catch((err) => {
        console.log(err);
        
      })
    }
    render (){
      let { id, username } = this.props
      console.log(id,username);
      let { history } = this.props
      return (
        <div className = "ToDo">
            <Table dark bordered size = 'sm'>
              <thead>
                <tr>
                  <th className = "Number">No</th>
                  <th>Activity</th>
                  <th className = 'Date-head'>Date</th>
                  <th className = 'Action'>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.renderBody()}
              </tbody>
            </Table>
            <Button
              color = "primary"
              sizee = "sm"
              onClick = {() => {
                history.push('/add')
              }}
            >
              ADD
            </Button>

        </div>
      )
    }
}
const mapStatetoProps = ({ auth }) => {
  return {
    id : auth.id_users,
    username : auth.username
  }
  
}
export default connect (mapStatetoProps)(ToDo)