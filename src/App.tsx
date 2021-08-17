import React, { useState } from 'react'
import { v1 } from 'uuid'
import clone from 'clone-deep'
import { ToDoList } from './ToDoList/ToDoList'
import './App.css'

export type filterPropTypes = 'All' | 'Active' | 'Completed'

export type TaskPropTypes = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = Array<TaskPropTypes>

const task: TasksType = [
    { id: 'vvv', title: 'HTML&CSS', isDone: true },
    { id: 'ddd', title: 'JS', isDone: true },
    { id: 'ccc', title: 'ReactJS', isDone: false },
]

// pure functions
export const filterTasks = (tasks: TasksType, filter: filterPropTypes): TasksType => {
    switch (filter) {
        case 'All':
            return tasks
        case 'Active':
            return tasks.filter(task => !task.isDone)
        case 'Completed':
            return tasks.filter(task => task.isDone)
    }
}

export const addTask = (tasks: TasksType, taskName: string): TasksType => {
    const task = { id: v1(), title: taskName, isDone: false }
    return [task, ...tasks]
}

export const deleteTask = (tasks: TasksType, id: string): TasksType => {
    return tasks.filter(task => task.id !== id)
}

export const changeSelected = (tasks: TasksType, id: string, select: boolean): TasksType => {
    const copy = clone(tasks)
    const selectedTask = copy.find((task: TaskPropTypes) => task.id === id)
    if (selectedTask) selectedTask.isDone = select
    return copy
}

function App() {
    const [tasks, setTasks] = useState<TasksType>(task)
    const [filter, setFilter] = useState<filterPropTypes>('All')

    const filteredTasks = filterTasks(tasks, filter)
    const addTaskCallback = (taskName: string) => setTasks(() => addTask(tasks, taskName))
    const deleteTaskCallback = (id: string) => setTasks(() => deleteTask(tasks, id))
    const changeSelectedCallback = (id: string, select: boolean) => setTasks(changeSelected(tasks, id, select))

    return (
        <div className="App">
            <ToDoList
                title="What to learn"
                tasks={ filteredTasks }
                setFilter={ setFilter }
                addTaskCallback={ addTaskCallback }
                deleteTaskCallback={ deleteTaskCallback }
                changeSelectedCallback={ changeSelectedCallback }
                filter={ filter }
            />
        </div>
    )
}

export default App
