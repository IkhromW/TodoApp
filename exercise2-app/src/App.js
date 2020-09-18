import React from 'react';
import  Login from './Pages/login';
import Regristasi from './Pages/register'
import './App.css';
import { Route } from 'react-router-dom'
import ToDo from './Pages/Todo'
import Add from './Pages/add'
import Edit from './Pages/edit'

function App() {
  return (
  <div>
      <Route path = '/' component = { Login } exact />
      <Route path = '/registrasi'component = { Regristasi } />
      <Route path = '/ToDo' component = { ToDo } />
      <Route path = '/add' component = { Add } />
      <Route path = '/edit/:id' component = { Edit } />
  </div>
    
  )
}

export default App;
