import React from 'react'
import { addTask, changeSelected, deleteTask, filterTasks, TasksType } from './App'


const testArray: TasksType = [
  { id: 'vvv', title: 'HTML&CSS', isDone: true },
  { id: 'ddd', title: 'JS', isDone: true },
  { id: 'ccc', title: 'ReactJS', isDone: false },
]

test('addTask return copy array', () => {

  const result = addTask(testArray, 'Train testing')

  expect(testArray).toHaveLength(3)
  expect(result).toHaveLength(4)
  expect(result[0].title).toBe('Train testing')
})

test('deleteTask return copy array', () => {
  const result = deleteTask(testArray, 'ddd')

  expect(testArray).toHaveLength(3)
  expect(testArray[1].id).toBe('ddd')
  expect(testArray).toContainEqual({ id: 'ddd', title: 'JS', isDone: true })

  expect(result).toHaveLength(2)
  expect(result[1].id).toBe('ccc')
})

test('changeSelected return copy array', () => {
  const result = changeSelected(testArray, 'ccc', true)

  expect(testArray[2].isDone).toBe(false)
  expect(testArray).toContainEqual({ id: 'ccc', title: 'ReactJS', isDone: false })
  expect(testArray[2].isDone).not.toEqual(result[2].isDone)

  expect(result[2].isDone).toBe(true)
  expect(result).toContainEqual({ id: 'ccc', title: 'ReactJS', isDone: true })

})

test('filter all', () => {
  const result = filterTasks(testArray, 'All')

  expect(result).toBeDefined()
  expect(result).toEqual(testArray)
  expect(result).toHaveLength(3)
})

test('filter active', () => {
  const result = filterTasks(testArray, 'Active')

  expect(result).toBeDefined()
  expect(result).not.toEqual(testArray)
  expect(result).toHaveLength(1)
  expect(result[0].isDone).toBe(false)
})

test('filter completed', () => {
  const result = filterTasks(testArray, 'Completed')

  expect(result).toBeDefined()
  expect(result).not.toEqual(testArray)
  expect(result).toHaveLength(2)
  expect(result[0].isDone).toBe(true)
  expect(result[1].isDone).toBe(true)
})