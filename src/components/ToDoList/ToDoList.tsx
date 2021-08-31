import React, { useState, MouseEvent } from 'react'
import { ToDoItem } from '../ToDoItem/ToDoItem'
import { FilterPropTypes, TaskPropTypes } from '../../App'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableTitle } from '../EditableTitle/EditableTitle'
import { Button, Grid, IconButton, Paper } from '@material-ui/core'
import { Delete } from '@material-ui/icons'


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
    changeToDoListTitleCallback: (title: string, toDoListId: string) => void
    changeTaskTitleCallback: (taskId: string, title: string, toDoListId: string) => void
}

export const ToDoList: React.FC<ToDoListPropTypes> = (
    {
        toDoListId, filter, title, tasks,
        changeFilterCallback, deleteTaskCallback,
        addTaskCallback, changeSelectedCallback,
        deleteToDoListCallback, changeToDoListTitleCallback,
        changeTaskTitleCallback,
    }) => {

    const [newTitle, setNewTitle] = useState<string>('')

    const mappedTasks = tasks.map((task) => (
        <ToDoItem
            key={ task.id }
            taskId={ task.id }
            toDoListId={ toDoListId }
            title={ task.title }
            isDone={ task.isDone }
            deleteTaskCallback={ deleteTaskCallback }
            changeSelectedCallback={ changeSelectedCallback }
            changeTaskTitleCallback={ changeTaskTitleCallback }
        />
    ))

    const changeFilter = (event: MouseEvent<HTMLButtonElement>) => {
        const value = event.currentTarget.innerText
            .split('')
            .map((letter, idx) => idx > 0 ? letter.toLowerCase() : letter)
            .join('')
        changeFilterCallback(value as FilterPropTypes, toDoListId)
    }

    const deleteToDoListId = () => deleteToDoListCallback(toDoListId)

    return (
        <Grid item>
            <Paper style={ { padding: '10px' } }>
                <h3>
                    <IconButton tabIndex={ toDoListId } onClick={ deleteToDoListId }>
                        <Delete/>
                    </IconButton>
                    <EditableTitle
                        title={ title }
                        toDoListId={ toDoListId }
                        changeToDoListTitleCallback={ changeToDoListTitleCallback }
                    />
                </h3>
                <AddItemForm
                    value={ newTitle }
                    toDoListId={ toDoListId }
                    setValueCallback={ setNewTitle }
                    addTaskCallback={ addTaskCallback }
                />
                { mappedTasks }
                <div>
                    <Button
                        size={ 'small' }
                        onClick={ changeFilter }
                        variant={ 'contained' }
                        color={ filter === 'All' ? 'primary' : 'default' }
                    >All
                    </Button>
                    <Button
                        size={ 'small' }
                        onClick={ changeFilter }
                        variant={ 'contained' }
                        color={ filter === 'Active' ? 'primary' : 'default' }
                    >Active
                    </Button>
                    <Button
                        size={ 'small' }
                        onClick={ changeFilter }
                        variant={ 'contained' }
                        color={ filter === 'Completed' ? 'primary' : 'default' }
                    >Completed
                    </Button>
                </div>
            </Paper>
        </Grid>
    )
}