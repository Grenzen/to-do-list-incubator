import React from 'react'
import s from './Button.module.css'

type ButtonPropTypes = {
    itemId?: string
    toDoListId: string
    deleteTaskCallback?: (taskId: string, toDoListId: string) => void
    deleteToDoListCallback?: (toDoListId: string) => void
}

export const Button: React.FC<ButtonPropTypes> = (
    {
        itemId, toDoListId,
        deleteTaskCallback, deleteToDoListCallback,
    }) => {

    const deleteCallback = () => {
        deleteTaskCallback && itemId && deleteTaskCallback(itemId, toDoListId)
        deleteToDoListCallback && deleteToDoListCallback(toDoListId)
    }

    return <button className={ s.deleteButton } onClick={ deleteCallback }>x</button>
}