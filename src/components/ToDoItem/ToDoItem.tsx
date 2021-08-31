import React, { ChangeEvent } from 'react'
import s from './ToDoItem.module.css'
import { EditableTitle } from '../EditableTitle/EditableTitle'
import { Checkbox, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

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

    const deleteTask = () => deleteTaskCallback(taskId, toDoListId)
    return (
        <div className={ s.listItem }>
            <IconButton onClick={ deleteTask }>
                <Delete/>
            </IconButton>
            <div className={ s.container }>
                <Checkbox
                    color={ 'primary' }
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
        </div>
    )
}