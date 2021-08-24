import React, { useState, MouseEvent } from 'react'
import { ToDoItem } from '../ToDoItem/ToDoItem'
import { FilterPropTypes, TaskPropTypes } from '../../App'
import s from './ToDoList.module.css'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { Button } from '../Button/Button'
import { EditableTitle } from '../EditableTitle/EditableTitle'


export type ToDoListPropTypes = {
    toDoListId: string
    filter: FilterPropTypes
    title: string
    tasks: Array<TaskPropTypes>
    changeFilterCallback: (filter: FilterPropTypes, toDoListId: string) => void
    addTaskCallback: (title: string, toDoListId: string) => void
    deleteTaskCallback: (taskId: string, toDoListId: string) => void
    changeSelectedCallback: (taskId: string, select: boolean, toDoListId: string) => void
    deleteToDoListCallback: (toDoListId: string) => void
    changeToDoListTitleCallback: (title: string, toDoListId: string) => void
    changeTaskTitleCallback: (taskId: string, title: string, toDoListId: string) => void
}

export const ToDoList: React.FC<ToDoListPropTypes> = (
    {
        toDoListId, filter, title, tasks,
        changeFilterCallback, deleteTaskCallback,
        addTaskCallback, changeSelectedCallback,
        deleteToDoListCallback, changeToDoListTitleCallback,
        changeTaskTitleCallback,
    }) => {

    const [newTitle, setNewTitle] = useState<string>('')

    const mappedTasks = tasks.map((task) => (
        <ToDoItem
            key={ task.id }
            taskId={ task.id }
            toDoListId={ toDoListId }
            title={ task.title }
            isDone={ task.isDone }
            deleteTaskCallback={ deleteTaskCallback }
            changeSelectedCallback={ changeSelectedCallback }
            changeTaskTitleCallback={ changeTaskTitleCallback }
        />
    ))

    const changeFilter = (event: MouseEvent<HTMLButtonElement>) => {
        const value = (event.target as HTMLElement).innerText as FilterPropTypes
        changeFilterCallback(value, toDoListId)
    }

    return (
        <div className={ s.toDoListContainer }>
            <h3><Button
                toDoListId={ toDoListId }
                deleteToDoListCallback={ deleteToDoListCallback }
            />
                <EditableTitle
                    title={ title }
                    toDoListId={ toDoListId }
                    changeToDoListTitleCallback={ changeToDoListTitleCallback }
                />
            </h3>
            <AddItemForm
                formTitle={ 'Add new item' }
                value={ newTitle }
                toDoListId={ toDoListId }
                setValueCallback={ setNewTitle }
                addTaskCallback={ addTaskCallback }
            />
            <ul className={ s.list }>
                { mappedTasks }
            </ul>
            <div>
                <button
                    className={ filter === 'All' ? s.buttonActive : s.buttonCommon }
                    onClick={ changeFilter }
                >All
                </button>
                <button
                    className={ filter === 'Active' ? s.buttonActive : s.buttonCommon }
                    onClick={ changeFilter }
                >Active
                </button>
                <button
                    className={ filter === 'Completed' ? s.buttonActive : s.buttonCommon }
                    onClick={ changeFilter }
                >Completed
                </button>
            </div>
        </div>
    )
}