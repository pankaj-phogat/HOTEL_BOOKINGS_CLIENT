let userState;

if(window.localStorage.getItem('auth')){
  userState=JSON.parse(window.localStorage.getItem('auth'));
}else{
  userState=null;// {} empty object
}

const authReducer=(state=userState,action) => {
    switch(action.type){
      case "LOGGED_IN_USER" :
        return {...state,...action.payload};
      case "LOGOUT" :
        return null;
      default :
        return state ;
    }
  }

  export default authReducer;