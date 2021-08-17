import React from 'react'
import s from './Button.module.css'

type ButtonPropTypes = {
    itemId: string
    deleteTaskCallback: (id: string) => void
}

export const Button:React.FC<ButtonPropTypes> = ({ itemId, deleteTaskCallback }) => {
    const removeHandler = () => deleteTaskCallback(itemId)
    return <button className={s.deleteButton} onClick={ removeHandler }>x</button>
}