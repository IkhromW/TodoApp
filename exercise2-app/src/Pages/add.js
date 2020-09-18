import React, { Component } from 'react';
import Axios from 'axios';
import { api } from '../API/api'
import { connect } from 'react-redux'
import { MDBInput, MDBBtn } from 'mdbreact'
import './add.css'


class Add extends Component {
    state = {
      TodoList : '',
      date : ''
    }

    componentDidMount =  () => {
      let { id } = this.props
      this.getAllTodo(id)
    }
    getAllTodo = (id) => {
      Axios.get(api + `/users/getAllToDo/${id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          TodoList : res.data.TodoList,
          date : res.data.Date
        })
      })
      .catch(err => {
        console.log(err); 
      })
    }
    postDataAxios = (id) => {
      
       let newActivity = this.InputActivity.value
       let newDate = this.InputDate.value
       return Axios.post(api + `/users/addTodo/${id}`, {
         TodoList : newActivity,
         date : newDate
       })
    }
    onSubmit = (e) => {
        e.preventDefault()
        let { history } = this.props
        let { id } = this.props
        let newActivity = this.InputActivity.value
        let newDate = this.InputDate.value
        if(newActivity === '' || newDate === ''){
          alert('Please fill out Input')
        }
        else{
          return this.postDataAxios(id)
          .then(() => {
            return this.getAllTodo()
          })
          .then(() => {
            history.push('/ToDo')
          })
        }
    }
   

    render(){
      let { username } = this.props
      let { TodoList, date } = this.state
      let { history } = this.props
      console.log(TodoList, date);
      
      
      return (
        <div className = "Add">
        <div className = "Add-form">
        <span className = "Add-span">
          <h2>ADD {username} Activity</h2>
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

export default connect(mapStatetoProps)(Add)