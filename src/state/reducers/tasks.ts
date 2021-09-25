import * as types from '../types/tasks'
import clone from 'clone-deep'
import { toDoListId1, toDoListId2 } from './todoLists'
import { ActionsTasksType } from '../actions/tasks'
import { v1 } from 'uuid'

export type TaskTypes = {
    id: string
    title: string
    isDone: boolean
}
export type TaskStateTypes = {
    newTaskTitle: string
    todoLists: { [ key: string ]: Array<TaskTypes> }
}

const initialState: TaskStateTypes = {
    newTaskTitle: '',
    todoLists: {
        [ toDoListId1 ]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [ toDoListId2 ]: [
            { id: v1(), title: 'Beer', isDone: true },
            { id: v1(), title: 'Meat', isDone: true },
            { id: v1(), title: 'Pork', isDone: false },
        ],
    },
}

export const tasksReducer = (state = initialState, action: ActionsTasksType): TaskStateTypes => {
    switch (action.type) {
        case types.ADD_NEW_TASKS_ARRAY:
            return { ...state, [ action.payload.newToDoListId ]: [] }
        case types.ADD_TASK:
            const newTask: TaskTypes = {
                id: action.payload.newTaskId,
                title: action.payload.newTaskTitle,
                isDone: action.payload.newTaskIsDone,
            }
            const { toDoListId } = action.payload
            return {
                ...state,
                todoLists: {
                    ...state.todoLists,
                    [ toDoListId ]: [newTask, ...state.todoLists[ toDoListId ]],
                },
            }
        case types.REMOVE_TASK:
            return {
                ...state,
                todoLists: {
                    ...state.todoLists,
                    [ action.payload.toDoListId ]: state.todoLists[ action.payload.toDoListId ]
                        .filter(task => task.id !== action.payload.taskId),
                },
            }
        case types.REMOVE_TASKS_ARRAY:
            const cloneState = clone(state)
            delete cloneState.todoLists[ action.payload.toDoListsId ]
            return { ...cloneState }
        case types.CHANGE_TASK_TITLE:
            return {
                ...state,
                todoLists: {
                    ...state.todoLists,
                    [ action.payload.toDoListId ]: state.todoLists[ action.payload.toDoListId ]
                        .map(task => task.id === action.payload.taskId ? {
                            ...task,
                            title: action.payload.newTitle,
                        } : task),
                },
            }
        case types.CHANGE_SELECT:
            return {
                ...state,
                todoLists: {
                    ...state.todoLists,
                    [ action.payload.toDoListId ]: state.todoLists[ action.payload.toDoListId ]
                        .map(task => task.id === action.payload.taskId ? {
                            ...task,
                            isDone: action.payload.isDone,
                        } : task),
                },
            }
        case types.SET_NEW_TASK_TITLE:
            return {
                ...state,
                newTaskTitle: action.payload.newTaskTitle,
            }
        default:
            return state
    }
}