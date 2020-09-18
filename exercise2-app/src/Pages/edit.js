import React, { Component } from 'react';
import { connect } from 'react-redux'
import { MDBInput, MDBBtn } from 'mdbreact'
import Axios from 'axios';
import { api } from '../API/api'
import './edit.css'

class Edit extends Component {
  state = {
    TodoList : '',
    date : ''
  }

  componentDidMount = () => {
    
     return this.getActivitybyId()
  }
  getActivitybyId = () => {

     return  Axios.get(api + `/users/usersTodo/${this.props.match.params.id}`)
     .then(res => {
        console.log(res.data);
        this.setState({
          TodoList : res.data[0].TodoList,
          date : res.data[0].Date
        })
        
     })
     .catch(err => {
       console.log(err);
       
     })
  }
  onSubmit = () => {
      let updatedTodo = this.InputActivity.value;
      let updatedDate = this.InputDate.value;
      let { history } = this.props

      return Axios.patch(api + `/users/edit/${this.props.match.params.id}`,{
        TodoList : updatedTodo,
        date : updatedDate
      })
      .then(res => {
        console.log(res.data);
        history.push('/ToDo')
        
      })
  }
  
  render(){
    console.log(this.props.match.params.id);
    let { TodoList, date } = this.state
    console.log(TodoList, date);
    
    let { username } = this.props
    let { history } = this.props
    
    return (
      <div className = "EditItem">
          <div className = "Add-form">
            <span className = "Add-span">
              <h2 style = {{color : "white"}}>Update {username} Activity</h2>
            </span>
            <div className = "form-group">
              <MDBInput 
                style = {{color : "white"}}
                label = "Activity" 
                size = "sm"  
                inputRef = {activity => this.InputActivity = activity}
                value = {TodoList} 
                onChange = {e => this.setState({TodoList : e.target.value})}/>
              <MDBInput 
                value = {date} 
                style = {{color : "white"}}
                label = "Date"
                size = "sm" 
                inputRef = {date => this.InputDate = date}
                onChange = {e => this.setState({date : e.target.value})}
                type = "date"/>
              <MDBBtn 
                gradient = "blue"
                className = "Btn"
                onClick = {this.onSubmit }
              >
                Submit
              </MDBBtn> 
              <MDBBtn
                color = "danger"
                onClick = { ()  => {
                history.push('/ToDo')
                }}
                className = "Btn"
              >
              Cancel
              </MDBBtn>
                     
          </div>
        </div>
          
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

export default connect(mapStatetoProps)(Edit)