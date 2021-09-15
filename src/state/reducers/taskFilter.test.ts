import * as actions from '../actions/taskFilter'
import { FilterPropTypes, TaskTypes } from '../../App'
import { taskFilterReducer } from './taskFilter'

const testArray: TaskTypes[] = [
    { id: 'vvv', title: 'HTML&CSS', isDone: true },
    { id: 'ddd', title: 'JS', isDone: true },
    { id: 'ccc', title: 'ReactJS', isDone: false },
    { id: 'aaa', title: 'Beer', isDone: true },
    { id: 'eee', title: 'Meat', isDone: true },
    { id: 'qqq', title: 'Pork', isDone: false },
]

test('should return all array items', () => {
    const filterValue: FilterPropTypes = 'ALL'

    const endState = taskFilterReducer(testArray, actions.changeTasksArrayFilter(filterValue))

    expect(endState).not.toBe(testArray)
    expect(endState).toHaveLength(6)
})

test('should return completed array items', () => {
    const filterValue: FilterPropTypes = 'COMPLETED'

    const endState = taskFilterReducer(testArray, actions.changeTasksArrayFilter(filterValue))

    expect(endState).not.toBe(testArray)
    expect(endState).toHaveLength(4)
    expect(endState.every(task => task.isDone)).toBeTruthy()
})

test('should return active array items', () => {
    const filterValue: FilterPropTypes = 'ACTIVE'

    const endState = taskFilterReducer(testArray, actions.changeTasksArrayFilter(filterValue))

    expect(endState).not.toBe(testArray)
    expect(endState).toHaveLength(2)
    expect(endState.every(task => !task.isDone)).toBeTruthy()
})