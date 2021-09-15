import * as types from '../types/tasks'
import * as actions from '../actions/tasks'
import { TaskStateTypes, TaskTypes } from '../../App'
import clone from 'clone-deep'

export type AddNewTaskArrayType = ReturnType<typeof actions.addNewTaskArray>
export type AddTaskType = ReturnType<typeof actions.addTask>
export type RemoveTaskType = ReturnType<typeof actions.removeTask>
export type RemoveTasksArrayType = ReturnType<typeof actions.removeTasksArray>
export type ChangeTaskTitleType = ReturnType<typeof actions.changeTaskTitle>
export type ChangeSelectType = ReturnType<typeof actions.changeSelect>

export type ActionType = AddNewTaskArrayType | AddTaskType | RemoveTaskType |
    RemoveTasksArrayType | ChangeTaskTitleType | ChangeSelectType

export const tasksReducer = (state: TaskStateTypes, action: ActionType): TaskStateTypes => {
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
                [ toDoListId ]: [newTask, ...state[ toDoListId ]],
            }
        case types.REMOVE_TASK:
            return {
                ...state,
                [ action.payload.toDoListId ]: state[ action.payload.toDoListId ]
                    .filter(task => task.id !== action.payload.taskId),
            }
        case types.REMOVE_TASKS_ARRAY:
            const cloneState = clone(state)
            delete cloneState[ action.payload.toDoListsId ]
            return { ...cloneState }
        case types.CHANGE_TASK_TITLE:
            return {
                ...state,
                [ action.payload.toDoListId ]: state[ action.payload.toDoListId ]
                    .map(task => task.id === action.payload.taskId ? {
                        ...task,
                        title: action.payload.newTitle,
                    } : task),
            }
        case types.CHANGE_SELECT:
            return {
                ...state,
                [ action.payload.toDoListId ]: state[ action.payload.toDoListId ]
                    .map(task => task.id === action.payload.taskId ? { ...task, isDone: action.payload.isDone } : task),
            }
        default:
            throw new Error(`I don't understand this action type`)
    }
}