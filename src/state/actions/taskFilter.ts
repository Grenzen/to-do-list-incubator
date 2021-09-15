import { FilterPropTypes } from '../../App'
import * as types from '../types/taskFilter'

export const changeTasksArrayFilter = (filterValue: FilterPropTypes) => ({
    type: types[ filterValue ],
} as const)