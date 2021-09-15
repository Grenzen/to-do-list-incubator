import { TaskStateTypes } from '../../App'
import { tasksReducer } from './tasks'
import * as actions from '../actions/tasks'

const testKey1 = 'testKey1'
const testKey2 = 'testKey2'
const testTasks: TaskStateTypes = {
    [ testKey1 ]: [
        { id: 'vvv', title: 'HTML&CSS', isDone: true },
        { id: 'ddd', title: 'JS', isDone: true },
        { id: 'ccc', title: 'ReactJS', isDone: false },
    ],
    [ testKey2 ]: [
        { id: 'aaa', title: 'Beer', isDone: true },
        { id: 'eee', title: 'Meat', isDone: true },
        { id: 'qqq', title: 'Pork', isDone: false },
    ],
}

test('correct new tasks array should be added', () => {
    const newTestKey = 'newTestKey'

    const endState = tasksReducer(testTasks, actions.addNewTaskArray(newTestKey))

    expect(endState).not.toBe(testTasks)
    expect(testTasks).toEqual({
        [ testKey1 ]: [
            { id: 'vvv', title: 'HTML&CSS', isDone: true },
            { id: 'ddd', title: 'JS', isDone: true },
            { id: 'ccc', title: 'ReactJS', isDone: false },
        ],
        [ testKey2 ]: [
            { id: 'aaa', title: 'Beer', isDone: true },
            { id: 'eee', title: 'Meat', isDone: true },
            { id: 'qqq', title: 'Pork', isDone: false },
        ],
    })
    expect(endState).toEqual({
        [ testKey1 ]: [
            { id: 'vvv', title: 'HTML&CSS', isDone: true },
            { id: 'ddd', title: 'JS', isDone: true },
            { id: 'ccc', title: 'ReactJS', isDone: false },
        ],
        [ testKey2 ]: [
            { id: 'aaa', title: 'Beer', isDone: true },
            { id: 'eee', title: 'Meat', isDone: true },
            { id: 'qqq', title: 'Pork', isDone: false },
        ],
        [ newTestKey ]: [],
    })
})

test('correct new task should be added in correct array', () => {
    const newTaskTitle = 'Test Task'
    const endState = tasksReducer(testTasks, actions.addTask(newTaskTitle, testKey1))

    expect(endState).not.toBe(testTasks)
    expect(testTasks).toEqual({
        [ testKey1 ]: [
            { id: 'vvv', title: 'HTML&CSS', isDone: true },
            { id: 'ddd', title: 'JS', isDone: true },
            { id: 'ccc', title: 'ReactJS', isDone: false },
        ],
        [ testKey2 ]: [
            { id: 'aaa', title: 'Beer', isDone: true },
            { id: 'eee', title: 'Meat', isDone: true },
            { id: 'qqq', title: 'Pork', isDone: false },
        ],
    })
    expect(endState[ testKey1 ][ 0 ].title).toBe(newTaskTitle)
})

test('correct task should be removed in correct array', () => {
    const endState = tasksReducer(testTasks, actions.removeTask('eee', testKey2))

    expect(endState).not.toBe(testTasks)
    expect(endState).toEqual({
        [ testKey1 ]: [
            { id: 'vvv', title: 'HTML&CSS', isDone: true },
            { id: 'ddd', title: 'JS', isDone: true },
            { id: 'ccc', title: 'ReactJS', isDone: false },
        ],
        [ testKey2 ]: [
            { id: 'aaa', title: 'Beer', isDone: true },
            { id: 'qqq', title: 'Pork', isDone: false },
        ],
    })
})

test('correct task array should be removed', () => {
    const endState = tasksReducer(testTasks, actions.removeTasksArray(testKey1))

    expect(endState).not.toBe(testTasks)
    expect(testTasks).toEqual({
        [ testKey1 ]: [
            { id: 'vvv', title: 'HTML&CSS', isDone: true },
            { id: 'ddd', title: 'JS', isDone: true },
            { id: 'ccc', title: 'ReactJS', isDone: false },
        ],
        [ testKey2 ]: [
            { id: 'aaa', title: 'Beer', isDone: true },
            { id: 'eee', title: 'Meat', isDone: true },
            { id: 'qqq', title: 'Pork', isDone: false },
        ],
    })
    expect(endState).toEqual({
        [ testKey2 ]: [
            { id: 'aaa', title: 'Beer', isDone: true },
            { id: 'eee', title: 'Meat', isDone: true },
            { id: 'qqq', title: 'Pork', isDone: false },
        ],
    })
})

test('correct task title should be changed in correct array', () => {
    const newTitle = 'New Test Title'
    const endState = tasksReducer(testTasks, actions.changeTaskTitle('ddd', newTitle, testKey1))

    expect(endState).not.toBe(testTasks)
    expect(testTasks).toEqual({
        [ testKey1 ]: [
            { id: 'vvv', title: 'HTML&CSS', isDone: true },
            { id: 'ddd', title: 'JS', isDone: true },
            { id: 'ccc', title: 'ReactJS', isDone: false },
        ],
        [ testKey2 ]: [
            { id: 'aaa', title: 'Beer', isDone: true },
            { id: 'eee', title: 'Meat', isDone: true },
            { id: 'qqq', title: 'Pork', isDone: false },
        ],
    })
    expect(endState).toEqual({
        [ testKey1 ]: [
            { id: 'vvv', title: 'HTML&CSS', isDone: true },
            { id: 'ddd', title: newTitle, isDone: true },
            { id: 'ccc', title: 'ReactJS', isDone: false },
        ],
        [ testKey2 ]: [
            { id: 'aaa', title: 'Beer', isDone: true },
            { id: 'eee', title: 'Meat', isDone: true },
            { id: 'qqq', title: 'Pork', isDone: false },
        ],
    })
})

test('correct task select should be changed in correct array', () => {
    const newSelect = false
    const endState = tasksReducer(testTasks, actions.changeSelect('aaa', newSelect, testKey2))

    expect(endState).not.toBe(testTasks)
    expect(testTasks).toEqual({
        [ testKey1 ]: [
            { id: 'vvv', title: 'HTML&CSS', isDone: true },
            { id: 'ddd', title: 'JS', isDone: true },
            { id: 'ccc', title: 'ReactJS', isDone: false },
        ],
        [ testKey2 ]: [
            { id: 'aaa', title: 'Beer', isDone: true },
            { id: 'eee', title: 'Meat', isDone: true },
            { id: 'qqq', title: 'Pork', isDone: false },
        ],
    })
    expect(endState).toEqual({
        [ testKey1 ]: [
            { id: 'vvv', title: 'HTML&CSS', isDone: true },
            { id: 'ddd', title: 'JS', isDone: true },
            { id: 'ccc', title: 'ReactJS', isDone: false },
        ],
        [ testKey2 ]: [
            { id: 'aaa', title: 'Beer', isDone: newSelect },
            { id: 'eee', title: 'Meat', isDone: true },
            { id: 'qqq', title: 'Pork', isDone: false },
        ],
    })
})