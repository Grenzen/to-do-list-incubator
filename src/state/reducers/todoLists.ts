import * as types from '../types/todoLists'
import { v1 } from 'uuid'
import { ActionTodoListsType } from '../actions/todoLists'
import { FilterPropTypes } from './taskFilter'

export const toDoListId1 = v1()
export const toDoListId2 = v1()

export type ToDoListTypes = {
    id: string
    title: string
    filter: FilterPropTypes
}

type TodoListStateType = {
    newTodoListTitle: string
    todoLists: ToDoListTypes[]
}

const initialState: TodoListStateType = {
    newTodoListTitle: '',
    todoLists: [
        { id: toDoListId1, title: 'What to learn', filter: 'ALL' },
        { id: toDoListId2, title: 'What to buy', filter: 'ALL' },
    ],
}

export const todolistsReducer = (state = initialState, action: ActionTodoListsType): TodoListStateType => {
    switch (action.type) {
        case types.REMOVE_TODOLIST:
            return {
                ...state,
                todoLists: state.todoLists.filter(tdl => tdl.id !== action.payload.todolistId),
            }
        case types.ADD_TODOLIST:
            return {
                ...state,
                todoLists: [
                    ...state.todoLists,
                    {
                        id: action.payload.newTodolistId,
                        title: action.payload.newTodolistTitle,
                        filter: action.payload.newTodolistFilter,
                    },
                ],
            }
        case types.CHANGE_TODOLIST_TITLE:
            return {
                ...state,
                todoLists: state.todoLists.map(tdl => tdl.id === action.payload.todolistId ?
                    { ...tdl, title: action.payload.newTodolistTitle } : tdl),
            }
        case types.CHANGE_TODOLIST_FILTER:
            return {
                ...state,
                todoLists: state.todoLists.map(tdl => tdl.id === action.payload.todolistId ? {
                    ...tdl,
                    filter: action.payload.newFilter,
                } : tdl),
            }
        case types.SET_NEW_TODOLIST_TITLE:
            return {
                ...state,
                newTodoListTitle: action.payload.newTodoListTitle,
            }
        default:
            return state
    }
}