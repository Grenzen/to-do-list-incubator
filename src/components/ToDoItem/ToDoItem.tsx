import React, { ChangeEvent } from 'react'
import { Button } from '../Button/Button'
import s from './ToDoItem.module.css'
import { EditableTitle } from '../EditableTitle/EditableTitle'

type ToDoItemPropTypes = {
    taskId: string
    toDoListId: string
    title: string
    isDone: boolean
    deleteTaskCallback: (taskId: string, toDoListId: string) => void
    changeSelectedCallback: (taskId: string, select: boolean, toDoListId: string) => void
    changeTaskTitleCallback: (taskId: string, title: string, toDoListId: string) => void
}

export const ToDoItem: React.FC<ToDoItemPropTypes> = (
    {
        taskId, toDoListId,
        title, isDone,
        deleteTaskCallback, changeSelectedCallback,
        changeTaskTitleCallback,
    }) => {

    const onChangeTaskStatus = (e: ChangeEvent) =>
        changeSelectedCallback(taskId, (e.currentTarget as HTMLInputElement).checked, toDoListId)

    return (
        <li className={ s.listItem }>
            <Button
                itemId={ taskId }
                toDoListId={ toDoListId }
                deleteTaskCallback={ deleteTaskCallback }
            >
            </Button>
            <div className={ s.container }>
                <input
                    type="checkbox"
                    checked={ isDone }
                    onChange={ onChangeTaskStatus }
                />
                <span className={ isDone ? s.done : s.undone }>
                    <EditableTitle
                        title={ title }
                        taskId={ taskId }
                        toDoListId={ toDoListId }
                        changeTaskTitleCallback={ changeTaskTitleCallback }
                    />
                </span>
            </div>
        </li>
    )
}