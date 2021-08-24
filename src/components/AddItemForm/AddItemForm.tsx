import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import s from './AddItemForm.module.css'

export type AddItemFormTypes = {
    formTitle: string
    value: string
    setValueCallback: (value: string) => void
    toDoListId?: string
    addTaskCallback?: (title: string, toDoListId: string) => void
    addToDoListCallback?: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormTypes> = (
    {
        formTitle, value, setValueCallback,
        toDoListId, addTaskCallback,
        addToDoListCallback,
    }) => {
    const [error, setError] = useState<string>('')
    const inputStyle = error.length ? s.error : s.correct

    const addError = () => {
        setError(() => 'Title is required')
        setValueCallback('')
    }
    const addNewValue = () => {
        setValueCallback('')
        addTaskCallback && toDoListId && addTaskCallback(value, toDoListId)
        addToDoListCallback && addToDoListCallback(value)
    }
    const onAddValue = () => value.trim().length ? addNewValue() : addError()
    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setError(() => '')
        const value = event.currentTarget?.value
        setValueCallback(value)
    }
    const onKeyPressValue = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') onAddValue()
    }

    return (
        <>
            <h4 className={ s.fromTitle }>{ formTitle }</h4>
            <div>
                <input
                    className={ [inputStyle, s.commonInput].join(' ') }
                    value={ value }
                    onChange={ onChangeValue }
                    onKeyPress={ onKeyPressValue }
                />
                <button
                    onClick={ onAddValue }
                > +
                </button>
                <span className={ s.errorMessage }>{ error }</span>
            </div>
        </>
    )
}