import React, { ChangeEvent } from 'react'
import { Button } from '../components/Button'
import s from './ToDoItem.module.css'

type ToDoItemPropTypes = {
    id: string
    title: string
    isDone: boolean
    deleteTaskCallback: (id: string) => void
    changeSelectedCallback: (id: string, select: boolean) => void
}

export const ToDoItem: React.FC<ToDoItemPropTypes> = (
    { isDone, title, id, deleteTaskCallback, changeSelectedCallback }
) => {

    const onChangeHandler = (e: ChangeEvent) => changeSelectedCallback(id, (e.currentTarget as HTMLInputElement).checked)
    return (
        <li className={s.listItem}>
            <Button
                itemId={ id }
                deleteTaskCallback={ deleteTaskCallback }
            >
            </Button>
        <div className={s.container}>
            <input
                type="checkbox"
                checked={ isDone }
                onChange={ onChangeHandler }
            />
            <span className={ isDone ? s.done : s.undone }>{ title }</span>
        </div>
        </li>
    )
}