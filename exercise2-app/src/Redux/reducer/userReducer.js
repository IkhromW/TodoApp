const InitialState = {
  id_users : 0,
  username : '',
  password : ''
}

export default (state = InitialState, action) => {
  switch(action.type){
      case 'LOGIN' :
        return {
          id_users : action.payload.id_users,
          username : action.payload.username,
          password : action.payload.password
        }
      case 'LOGOUT' : 
        return state;
      default :
        return state
  }
}