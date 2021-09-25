import React, { MouseEvent, useMemo } from 'react'
import { ToDoItem } from '../ToDoItem/ToDoItem'
import { TaskTypes } from '../../state/reducers/tasks'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableTitle } from '../EditableTitle/EditableTitle'
import { Button, Grid, IconButton, Paper } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { useAppDispatch } from '../../state'
import * as todolistsActions from '../../state/actions/todoLists'
import * as tasksActions from '../../state/actions/tasks'
import { FilterPropTypes } from '../../state/reducers/taskFilter'
import { useSelector } from 'react-redux'
import { newTaskTitleSelector } from '../../state/selectors/tasks'

export type ToDoListPropTypes = {
    toDoListId: string
    filter: FilterPropTypes
    title: string
    tasks: Array<TaskTypes>
    addTaskCallback: (title: string, toDoListId: string) => void
    deleteTaskCallback: (taskId: string, toDoListId: string) => void
    changeSelectedCallback: (taskId: string, select: boolean, toDoListId: string) => void
    changeToDoListTitleCallback: (title: string, toDoListId: string) => void
    changeTaskTitleCallback: (taskId: string, title: string, toDoListId: string) => void
}

export const ToDoList: React.FC<ToDoListPropTypes> = React.memo((
    {
        toDoListId, filter, title, tasks,
        deleteTaskCallback,
        addTaskCallback, changeSelectedCallback,
        changeToDoListTitleCallback,
        changeTaskTitleCallback,
    }) => {

    const newTaskTitle = useSelector(newTaskTitleSelector)
    const dispatch = useAppDispatch()
    const setNewTaskTitleCallback = (newTaskTitle: string) => dispatch(tasksActions.setNewTaskTitle(newTaskTitle))
    const changeFilter = (event: MouseEvent<HTMLButtonElement>) => {
        const value = event.currentTarget.innerText
        dispatch(todolistsActions.changeTodoListFilter(toDoListId, value as FilterPropTypes))
    }
    const deleteToDoList = () => {
        dispatch(todolistsActions.removeTodoList(toDoListId))
        dispatch(tasksActions.removeTasksArray(toDoListId))
    }

    const mappedTasks = useMemo(() => tasks.map((task) => (
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
    )), [tasks, toDoListId, deleteTaskCallback, changeSelectedCallback, changeTaskTitleCallback])

    return (
        <Grid item>
            <Paper style={ { padding: '10px' } }>
                <h3>
                    <IconButton tabIndex={ toDoListId } onClick={ deleteToDoList }>
                        <Delete/>
                    </IconButton>
                    <EditableTitle
                        title={ title }
                        toDoListId={ toDoListId }
                        changeToDoListTitleCallback={ changeToDoListTitleCallback }
                    />
                </h3>
                <AddItemForm
                    value={ newTaskTitle }
                    toDoListId={ toDoListId }
                    setValueCallback={ setNewTaskTitleCallback }
                    addTaskCallback={ addTaskCallback }
                />
                { mappedTasks }
                <div>
                    <Button
                        size={ 'small' }
                        onClick={ changeFilter }
                        variant={ 'contained' }
                        color={ filter === 'ALL' ? 'primary' : 'default' }
                    >All
                    </Button>
                    <Button
                        size={ 'small' }
                        onClick={ changeFilter }
                        variant={ 'contained' }
                        color={ filter === 'ACTIVE' ? 'primary' : 'default' }
                    >Active
                    </Button>
                    <Button
                        size={ 'small' }
                        onClick={ changeFilter }
                        variant={ 'contained' }
                        color={ filter === 'COMPLETED' ? 'primary' : 'default' }
                    >Completed
                    </Button>
                </div>
            </Paper>
        </Grid>
    )
})