import React, { useState } from 'react'
import { v1 } from 'uuid'
import { ToDoList } from './components/ToDoList/ToDoList'
import { AddItemForm } from './components/AddItemForm/AddItemForm'
import s from './App.module.css'
import {
    addTask, addToDoList,
    changeSelected, changeTaskTitle,
    changeToDoListFilter, changeToDoListTitle, createNewTasksArray,
    deleteTask, deleteToDoList, deleteTasks, filterTasks,
} from './pureFunctions'
// Types
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

export const App = () => {
    const toDoListId1 = v1()
    const toDoListId2 = v1()
    const [newToDoListTitle, setNewToDoListTitle] = useState<string>('')
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

    const changeTaskTitleCallback = (taskId: string, title: string, toDoListId: string) =>
        setTasks(() => changeTaskTitle(tasks, taskId, title, toDoListId))
    const changeToDoListTitleCallback = (title: string, toDoListId: string) =>
        setToDoLists(() => changeToDoListTitle(toDoLists, title, toDoListId))
    const changeSelectedCallback = (taskId: string, select: boolean, toDoListId: string) =>
        setTasks(() => changeSelected(tasks, taskId, select, toDoListId))
    const changeFilterCallback = (filter: FilterPropTypes, toDoListId: string) =>
        setToDoLists(() => changeToDoListFilter(toDoLists, filter, toDoListId))
    const deleteTaskCallback = (taskId: string, toDoListId: string) =>
        setTasks(() => deleteTask(tasks, taskId, toDoListId))
    const deleteToDoListCallback = (toDoListsId: string) => {
        setToDoLists(() => deleteToDoList(toDoLists, toDoListsId))
        setTasks(() => deleteTasks(tasks, toDoListsId))
    }
    const addTaskCallback = (title: string, toDoListId: string) =>
        setTasks(() => addTask(tasks, title, toDoListId))
    const addToDoListCallback = (title: string) => {
        const newToDoListId = v1()
        setToDoLists(() => addToDoList(toDoLists, newToDoListId, title))
        setTasks(() => createNewTasksArray(tasks, newToDoListId))
    }

    const mappedToDoList = toDoLists.map(tdl => {
        let tasksForToDoList = filterTasks(tasks[ tdl.id ], tdl.filter)
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
            changeToDoListTitleCallback={ changeToDoListTitleCallback }
            changeTaskTitleCallback={ changeTaskTitleCallback }
        />
    })

    return (
        <div className={ s.App }>
            <AddItemForm
                formTitle={ 'Add new to do list' }
                value={ newToDoListTitle }
                setValueCallback={ setNewToDoListTitle }
                addToDoListCallback={ addToDoListCallback }
            />
            <div className={ s.toDoListContainer }>
                { mappedToDoList }
            </div>
        </div>
    )
}