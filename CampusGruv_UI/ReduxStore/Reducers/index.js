//add all reducers here
//if reducers are in seperate files then import all here and combine them

import {combineReducers} from 'redux';

const User = (initial_state = {}, action) => {
  switch (action.type) {
    case 'CREATE_USER_DETAILS':
      return {...initial_state, ...action.payload}
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? {...todo, completed: !todo.completed} : todo,
      );
    default:
      return initial_state;
  }
};

const Socket = (initial_state = {}, action) => {
  switch (action.type) {
    case 'CONNECT_TO_SOCKET':
      {
        initial_state = action.payload
        return initial_state
      }
    default:
      return initial_state
  }
}


var unreadMsgs = {qty: -1}
var unreadNoti = {qty: -1}

const UnreadMsgs = (initial_state = unreadMsgs, action) => {
  switch(action.type) {
    case 'EDIT_UNREAD_MSGS':
      {
        return {qty: initial_state.qty + 1}
      }
    case 'CLEAR_MSGS':
      {
        new_state = {qty: -1}
        return {...initial_state, ...new_state}
      }
    default:
      return initial_state
  }
}

const notifications = (initial_state = unreadNoti, action) => {
  switch(action.type) {
    case 'EDIT_UNREAD_NOTI':
      {
        return {qty: initial_state.qty + 1}
      }
    case 'CLEAR_NOTI':
      {
        new_state = {qty: -1}
        return {...initial_state, ...new_state}
      }
    default:
      return initial_state
  }
}



// const reducer2 = (initial_state = null, action) => {
//   if (action.type === 'ACTION_TYPE3') {
//   }
//   //do somethhing or add action.payload in iniitial state
//   //return new state always
//   else action.type === 'Action_Type4';
//   {
//     //do something with and return state
//   }

//   return initial_state;
// };

//Combining reducers so that they can be put into store

export default combineReducers({
  User: User,
  socket: Socket,
  UnreadMsgs: UnreadMsgs,
  Notifications: notifications
  // reducer2: reducer2,
});
