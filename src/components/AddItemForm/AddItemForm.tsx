import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import { AddBox } from '@material-ui/icons'

export type AddItemFormTypes = {
    value: string
    setValueCallback: (value: string) => void
    toDoListId?: string
    addTaskCallback?: (title: string, toDoListId: string) => void
    addToDoListCallback?: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormTypes> = (
    {
        value, setValueCallback,
        toDoListId, addTaskCallback,
        addToDoListCallback,
    }) => {
    const [error, setError] = useState<string>('')

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
            <div>
                <TextField
                    value={ value }
                    variant={ 'outlined' }
                    error={ !!error }
                    onChange={ onChangeValue }
                    onKeyPress={ onKeyPressValue }
                    helperText={ error }
                    label={ 'Title' }
                />
                <IconButton
                    color={ 'primary' }
                    onClick={ onAddValue }
                >
                    <AddBox/>
                </IconButton>
            </div>
        </>
    )
}