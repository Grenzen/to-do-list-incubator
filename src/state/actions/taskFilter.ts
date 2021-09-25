import * as types from '../types/taskFilter'
import { FilterPropTypes } from '../reducers/taskFilter'

type ChangeTasksArrayFilterType = ReturnType<typeof changeTasksArrayFilter>
export type ActionTaskFilterType = ChangeTasksArrayFilterType

export const changeTasksArrayFilter = (filterValue: FilterPropTypes) => ({
    type: types[ filterValue ],
} as const)