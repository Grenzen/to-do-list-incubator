import React, { useState, MouseEvent, ChangeEvent, KeyboardEvent } from 'react'
import { ToDoItem } from '../ToDoItem/ToDoItem'
import { filterPropTypes, TasksType } from '../App'
import s from './ToDoList.module.css'


export type ToDoListPropTypes = {
    title: string
    tasks: TasksType
    setFilter: (filter: filterPropTypes) => void
    addTaskCallback: (taskName: string) => void
    deleteTaskCallback: (id: string) => void
    changeSelectedCallback: (id: string, select: boolean) => void
    filter: filterPropTypes
}

export const ToDoList: React.FC<ToDoListPropTypes> = (
    { title, tasks, setFilter, deleteTaskCallback, addTaskCallback, changeSelectedCallback, filter },
) => {

    const [error, setError] = useState<string>('')
    const [newTitle, setNewTitle] = useState<string>('')

    const inputStyle = error.length ? s.error : s.correct

    const mappedTasks = tasks.map((task) => (
        <ToDoItem
            id={ task.id }
            title={ task.title }
            isDone={ task.isDone }
            deleteTaskCallback={ deleteTaskCallback }
            changeSelectedCallback={ changeSelectedCallback }
            key={ task.id }
        />
    ))

    const filterHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const value = (event.target as HTMLElement).innerText as filterPropTypes
        setFilter(value)
    }

    const addError = () => {
        setError(() => 'Title is required')
        setNewTitle(() => '')
    }

    const addNewTask = () => {
        setNewTitle(() => '')
        addTaskCallback(newTitle)
    }

    const onAddTitleHandler = () => {
        newTitle.trim().length ? addNewTask() : addError()
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(() => '')
        const value = event.target?.value
        setNewTitle(() => value)
    }

    const onKeyPressHandler = (event: KeyboardEvent) => {
        if (event.key === 'Enter') onAddTitleHandler()
    }

    return (
        <div>
            <h3>{ title }</h3>
            <div>
                <input
                    className={ [inputStyle, s.commonInput].join(' ') }
                    value={ newTitle }
                    onChange={ onChangeHandler }
                    onKeyPress={ onKeyPressHandler }/>
                <button onClick={ onAddTitleHandler }> +</button>
                <span className={ s.errorMessage }>{ error }</span>
            </div>
            <ul className={s.list}>
                { mappedTasks }
            </ul>
            <div>
                <button
                    className={ filter === 'All' ? s.buttonActive : s.buttonCommon }
                    onClick={ filterHandler }
                >
                    All
                </button>
                <button
                    className={ filter === 'Active' ? s.buttonActive : s.buttonCommon }
                    onClick={ filterHandler }
                >
                    Active
                </button>
                <button
                    className={ filter === 'Completed' ? s.buttonActive : s.buttonCommon }
                    onClick={ filterHandler }
                >
                    Completed
                </button>
            </div>
        </div>
    )
}