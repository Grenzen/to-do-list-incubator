import { combineReducers } from 'redux'
import { tasksReducer } from './tasks'
import { todolistsReducer } from './todoLists'

export default combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})