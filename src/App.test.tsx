import React from 'react'

import { TaskStateTypes, ToDoListTypes } from './App'
import { addTask, deleteTask, deleteTasks, deleteToDoList } from './pureFunctions'

const testKey1 = 'testKey1'
const testKey2 = 'testKey2'
const testToDoLists: Array<ToDoListTypes> = [
    { id: testKey1, title: 'What to learn', filter: 'All' },
    { id: testKey2, title: 'What to buy', filter: 'All' },
]
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

test('addTask return copy object', () => {

    const result = addTask(testTasks, 'Train testing', testKey1)

    expect(testTasks).not.toBe(result)
    expect(testTasks[ testKey1 ]).toHaveLength(3)
    expect(result[ testKey1 ]).toHaveLength(4)
    expect(testTasks[ testKey1 ]).not.toEqual(result[ testKey1 ])
    expect(result[ testKey1 ][ 0 ].title).toBe('Train testing')
})

test('deleteTask return copy object', () => {
    const result = deleteTask(testTasks, 'ddd', testKey1)

    expect(testTasks).not.toBe(result)
    expect(testTasks[ testKey1 ]).toHaveLength(3)
    expect(testTasks[ testKey1 ][ 1 ].id).toBe('ddd')
    expect(testTasks[ testKey1 ]).toContainEqual({ id: 'ddd', title: 'JS', isDone: true })

    expect(result[ testKey1 ]).toHaveLength(2)
    expect(result[ testKey1 ][ 1 ].id).toBe('ccc')
    expect(result[ testKey1 ]).not.toContainEqual({ id: 'ddd', title: 'JS', isDone: true })
})

test('deleteToDoList return copy testToDoLists array', () => {
    const result = deleteToDoList(testToDoLists, testKey2)
    
    expect(result).not.toBe(testToDoLists)
    expect(testToDoLists).toHaveLength(2)
    expect(result).toHaveLength(1)
    expect(result).toContainEqual({ id: testKey1, title: 'What to learn', filter: 'All' })
    expect(result).not.toContainEqual({ id: testKey2, title: 'What to buy', filter: 'All' })
})

test('deleteTasks return copy testTasks object', () => {
    const result = deleteTasks(testTasks, testKey2)

    expect(result[ testKey1 ]).not.toBe(testTasks[ testKey1 ])
    expect(Object.keys(testTasks)).toHaveLength(2)
    expect(Object.keys(testTasks)).toEqual([testKey1, testKey2])
    expect(result).not.toEqual(testTasks)
    expect(Object.keys(result)).toHaveLength(1)
    expect(Object.keys(result)).toEqual([testKey1])
})

// test('changeSelected return copy array', () => {
//     const result = changeSelected(testArray, 'ccc', true)
//
//     expect(testArray[ 2 ].isDone).toBe(false)
//     expect(testArray).toContainEqual({ id: 'ccc', title: 'ReactJS', isDone: false })
//     expect(testArray[ 2 ].isDone).not.toEqual(result[ 2 ].isDone)
//
//     expect(result[ 2 ].isDone).toBe(true)
//     expect(result).toContainEqual({ id: 'ccc', title: 'ReactJS', isDone: true })
// })
//
// test('filter all', () => {
//     const result = filterTasks(testArray, 'All')
//
//     expect(result).toBeDefined()
//     expect(result).toEqual(testArray)
//     expect(result).toHaveLength(3)
// })
//
// test('filter active', () => {
//     const result = filterTasks(testArray, 'Active')
//
//     expect(result).toBeDefined()
//     expect(result).not.toEqual(testArray)
//     expect(result).toHaveLength(1)
//     expect(result[ 0 ].isDone).toBe(false)
// })
//
// test('filter completed', () => {
//     const result = filterTasks(testArray, 'Completed')
//
//     expect(result).toBeDefined()
//     expect(result).not.toEqual(testArray)
//     expect(result).toHaveLength(2)
//     expect(result[ 0 ].isDone).toBe(true)
//     expect(result[ 1 ].isDone).toBe(true)
// })