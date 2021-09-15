import * as types from '../types/taskFilter'
import * as actions from '../actions/taskFilter'
import { TaskTypes } from '../../App'

export type ActionType = ReturnType<typeof actions.changeTasksArrayFilter>

export const taskFilterReducer = (state: TaskTypes[], action: ActionType): TaskTypes[] => {
    switch (action.type) {
        case types.ALL:
            return [...state]
        case types.ACTIVE:
            return state.filter(task => !task.isDone)
        case types.COMPLETED:
            return state.filter(task => task.isDone)
        default:
            return [...state]
    }
}