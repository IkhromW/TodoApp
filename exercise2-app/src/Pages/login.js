import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.css'
import { Login } from '../Redux/action'
import { connect } from 'react-redux'



class NormalLoginForm extends React.Component {
  state = {}
  handleSubmit = this.handleSubmit

  

  handleSubmit = e => {
    e.preventDefault();
    let {username, password} = this.state
    this.props.Login(username,password) 
  };

  render() {
    console.log(this.props.user);
    const { getFieldDecorator } = this.props.form;
    const { history } = this.props
    let {username, password} = this.state

    console.log(username);
    console.log(this.props.username);
    if(this.props.username !== ''){
        history.push('/ToDo')
    }
     
    return (
    <div className = "container-login">
      <Form onSubmit={this.handleSubmit} className="login-form">
      <div className = "container-login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" 
              style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              setFieldsvalue = { username } 
              onChange = {
                e => {
                  this.setState({
                    username : e.target.value
                  })
                }
              }
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" s
              tyle={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              setFieldsvalue = { password }
              onChange = {e => {
                  this.setState({
                    password : e.target.value
                  })
              }}
            />,
          )}
        </Form.Item>
        </div>
        <div className = "container-login-text">
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button css-button">
            Log in
          </Button>
          <br/>
          Or <a href="/registrasi">register now!</a>
        </Form.Item>
        </div>
      </Form>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return{
    id : auth.id_users,
    username : auth.username
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default  connect(mapStateToProps,{ Login }) (WrappedNormalLoginForm)