import React from 'react'
import s from './Button.module.css'

type ButtonPropTypes = {
    itemId: string
    toDoListId: string
    deleteTaskCallback: (taskId: string, toDoListId: string) => void
}

export const Button: React.FC<ButtonPropTypes> = (
    {
        itemId,
        toDoListId,
        deleteTaskCallback
    }) => {

    const deleteCallback = () => deleteTaskCallback(itemId, toDoListId)

    return <button className={ s.deleteButton } onClick={ deleteCallback }>x</button>
}