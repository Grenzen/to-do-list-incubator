import React, { useState, MouseEvent, ChangeEvent, KeyboardEvent } from 'react'
import { ToDoItem } from '../ToDoItem/ToDoItem'
import { FilterPropTypes, TaskPropTypes } from '../App'
import s from './ToDoList.module.css'


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
}

export const ToDoList: React.FC<ToDoListPropTypes> = (
    {
        toDoListId, filter, title, tasks,
        changeFilterCallback, deleteTaskCallback,
        addTaskCallback, changeSelectedCallback,
        deleteToDoListCallback,
    }) => {

    const [error, setError] = useState<string>('')
    const [newTitle, setNewTitle] = useState<string>('')

    const inputStyle = error.length ? s.error : s.correct

    const mappedTasks = tasks.map((task) => (
        <ToDoItem
            taskId={ task.id }
            toDoListId={ toDoListId }
            title={ task.title }
            isDone={ task.isDone }
            deleteTaskCallback={ deleteTaskCallback }
            changeSelectedCallback={ changeSelectedCallback }
            key={ task.id }
        />
    ))

    const changeFilter = (event: MouseEvent<HTMLButtonElement>) => {
        const value = (event.target as HTMLElement).innerText as FilterPropTypes
        changeFilterCallback(value, toDoListId)
    }
    const addError = () => {
        setError(() => 'Title is required')
        setNewTitle(() => '')
    }
    const addNewTask = () => {
        setNewTitle(() => '')
        addTaskCallback(newTitle, toDoListId)
    }
    const onAddTitleHandler = () => newTitle.trim().length ? addNewTask() : addError()
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(() => '')
        const value = event.target?.value
        setNewTitle(() => value)
    }
    const onKeyPressHandler = (event: KeyboardEvent) => {
        if (event.key === 'Enter') onAddTitleHandler()
    }
    const deleteToDoList = () => deleteToDoListCallback(toDoListId)

    return (
        <div className={ s.toDoListContainer }>
            <button onClick={ deleteToDoList }>X</button>
            <h3>{ title }
            </h3>
            <div>
                <input
                    className={ [inputStyle, s.commonInput].join(' ') }
                    value={ newTitle }
                    onChange={ onChangeHandler }
                    onKeyPress={ onKeyPressHandler }/>
                <button onClick={ onAddTitleHandler }> +</button>
                <span className={ s.errorMessage }>{ error }</span>
            </div>
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