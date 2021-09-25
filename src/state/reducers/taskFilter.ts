import * as types from '../types/taskFilter'
import { TaskTypes } from './tasks'
import { ActionTaskFilterType } from '../actions/taskFilter'

export type FilterPropTypes = 'ALL' | 'ACTIVE' | 'COMPLETED'
export const taskFilterReducer = (state: TaskTypes[], action: ActionTaskFilterType): TaskTypes[] => {
    switch (action.type) {
        case types.ALL:
            return [...state]
        case types.ACTIVE:
            return state.filter(task => !task.isDone)
        case types.COMPLETED:
            return state.filter(task => task.isDone)
        default:
            return state
    }
}