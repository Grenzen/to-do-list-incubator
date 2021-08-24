import React, { useState } from 'react'
import { v1 } from 'uuid'
import { ToDoList } from './ToDoList/ToDoList'
import './App.css'

export type FilterPropTypes = 'All' | 'Active' | 'Completed'

export type ToDoListTypes = {
    id: string
    title: string
    filter: FilterPropTypes
}

export type TaskPropTypes = {
    id: string
    title: string
    isDone: boolean
}

export type TaskStateTypes = { [ key: string ]: Array<TaskPropTypes> }

export const addTask = (tasks: TaskStateTypes, title: string, toDoListId: string): TaskStateTypes => {
    const task = { id: v1(), title, isDone: false }
    return { ...tasks, [ toDoListId ]: [task, ...tasks[ toDoListId ]] }
}

export const deleteTask = (tasks: TaskStateTypes, taskId: string, toDoListId: string): TaskStateTypes => {
    return { ...tasks, [ toDoListId ]: tasks[ toDoListId ].filter(t => t.id !== taskId) }
}

export const changeSelected = (tasks: TaskStateTypes, taskId: string, isDone: boolean, toDoListId: string): TaskStateTypes => {
    return {
        ...tasks,
        [ toDoListId ]: tasks[ toDoListId ].map(task => task.id === taskId ? { ...task, isDone } : task),
    }
}

export const changeToDoListFilter = (toDoLists: Array<ToDoListTypes>, filter: FilterPropTypes, toDoListId: string) => {
    return toDoLists.map(tdl => tdl.id === toDoListId ? { ...tdl, filter } : tdl)
}

export const App = () => {
    const toDoListId1 = v1()
    const toDoListId2 = v1()
    const [toDoLists, setToDoLists] = useState<Array<ToDoListTypes>>([
        { id: toDoListId1, title: 'What to learn', filter: 'All' },
        { id: toDoListId2, title: 'What to buy', filter: 'All' },
    ])
    const [tasks, setTasks] = useState<TaskStateTypes>({
        [ toDoListId1 ]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'React', isDone: false },
        ],
        [ toDoListId2 ]: [
            { id: v1(), title: 'Beer', isDone: true },
            { id: v1(), title: 'Cheese', isDone: true },
            { id: v1(), title: 'Meat', isDone: false },
        ],
    })

    const addTaskCallback = (title: string, toDoListId: string) => setTasks(() =>
        addTask(tasks, title, toDoListId))
    const deleteTaskCallback = (taskId: string, toDoListId: string) => setTasks(() =>
        deleteTask(tasks, taskId, toDoListId))
    const changeSelectedCallback = (taskId: string, select: boolean, toDoListId: string) =>
        setTasks(changeSelected(tasks, taskId, select, toDoListId))
    const changeFilterCallback = (filter: FilterPropTypes, toDoListId: string) =>
        setToDoLists(changeToDoListFilter(toDoLists, filter, toDoListId))
    const deleteToDoListCallback = (toDoListsId: string) => {
        setToDoLists(toDoLists.filter(tdl => tdl.id !== toDoListsId))
        delete tasks[ toDoListsId ]
    }


    const mappedToDoList = toDoLists.map(tdl => {
        let tasksForToDoList = tasks[ tdl.id ]
        switch (tdl.filter) {
            case ('Active'):
                tasksForToDoList = tasks[ tdl.id ].filter(t => !t.isDone)
                break
            case ('Completed'):
                tasksForToDoList = tasks[ tdl.id ].filter(t => t.isDone)
                break
        }

        return <ToDoList
            toDoListId={ tdl.id }
            key={ tdl.id }
            filter={ tdl.filter }
            title={ tdl.title }
            tasks={ tasksForToDoList }
            changeFilterCallback={ changeFilterCallback }
            addTaskCallback={ addTaskCallback }
            deleteTaskCallback={ deleteTaskCallback }
            changeSelectedCallback={ changeSelectedCallback }
            deleteToDoListCallback={ deleteToDoListCallback }
        />
    })

    return (
        <div className="App">
            { mappedToDoList }
        </div>
    )
}
