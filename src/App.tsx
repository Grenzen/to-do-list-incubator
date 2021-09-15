import React, { useState } from 'react'
import { v1 } from 'uuid'
import * as todolistsActions from './state/actions/todolists'
import * as tasksActions from './state/actions/tasks'
import * as taskFilterActions from './state/actions/taskFilter'
import { todolistsReducer } from './state/reducers/todolists'
import { tasksReducer } from './state/reducers/tasks'
import { taskFilterReducer } from './state/reducers/taskFilter'
import { ToDoList } from './components/ToDoList/ToDoList'
import { AddItemForm } from './components/AddItemForm/AddItemForm'
import { AppBar, Container, Grid, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import AccountCircle from '@material-ui/icons/AccountCircle'
// Types
export type FilterPropTypes = 'ALL' | 'ACTIVE' | 'COMPLETED'
export type ToDoListTypes = {
    id: string
    title: string
    filter: FilterPropTypes
}
export type TaskTypes = {
    id: string
    title: string
    isDone: boolean
}
export type TaskStateTypes = { [ key: string ]: Array<TaskTypes> }

export const App = () => {
    const toDoListId1 = v1()
    const toDoListId2 = v1()
    const [newToDoListTitle, setNewToDoListTitle] = useState<string>('')
    const [toDoLists, setToDoLists] = useState<Array<ToDoListTypes>>([
        { id: toDoListId1, title: 'What to learn', filter: 'ALL' },
        { id: toDoListId2, title: 'What to buy', filter: 'ALL' },
    ])
    const [tasks, setTasks] = useState<TaskStateTypes>({
        [ toDoListId1 ]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'React', isDone: false },
        ],
        [ toDoListId2 ]: [
            { id: v1(), title: 'Beer', isDone: true },
            { id: v1(), title: 'Cheese', isDone: true },
            { id: v1(), title: 'Meat', isDone: false },
        ],
    })

    // with reducers
    const changeSelectedCallback = (taskId: string, select: boolean, toDoListId: string) =>
        setTasks(() => tasksReducer(tasks, tasksActions.changeSelect(taskId, select, toDoListId)))
    const changeTaskTitleCallback = (taskId: string, title: string, toDoListId: string) =>
        setTasks(() => tasksReducer(tasks, tasksActions.changeTaskTitle(taskId, title, toDoListId)))
    const deleteTaskCallback = (taskId: string, toDoListId: string) =>
        setTasks(() => tasksReducer(tasks, tasksActions.removeTask(taskId, toDoListId)))
    const addTaskCallback = (title: string, toDoListId: string) =>
        setTasks(() => tasksReducer(tasks, tasksActions.addTask(title, toDoListId)))

    const deleteToDoListCallback = (toDoListId: string) => {
        setToDoLists(() => todolistsReducer(toDoLists, todolistsActions.removeTodoList(toDoListId)))
        setTasks(() => tasksReducer(tasks, tasksActions.removeTasksArray(toDoListId)))
    }
    const addToDoListCallback = (title: string) => {
        const newToDoListId = v1()
        setToDoLists(() => todolistsReducer(toDoLists, todolistsActions.addTodoList(title, newToDoListId)))
        setTasks(() => tasksReducer(tasks, tasksActions.addNewTaskArray(newToDoListId)))
    }
    const changeToDoListTitleCallback = (title: string, toDoListId: string) =>
        setToDoLists(() => todolistsReducer(toDoLists, todolistsActions.changeTodoListTitle(toDoListId, title)))
    const changeFilterCallback = (filter: FilterPropTypes, toDoListId: string) =>
        setToDoLists(todolistsReducer(toDoLists, todolistsActions.changeTodoListFilter(toDoListId, filter)))
    
    const mappedToDoList = toDoLists.map(tdl => {
        let tasksForToDoList = taskFilterReducer(tasks[ tdl.id ], taskFilterActions.changeTasksArrayFilter(tdl.filter))
        return <ToDoList
            toDoListId={ tdl.id }
            key={ tdl.id }
            filter={ tdl.filter }
            title={ tdl.title }
            tasks={ tasksForToDoList }
            changeFilterCallback={ changeFilterCallback }
            addTaskCallback={ addTaskCallback }
            deleteTaskCallback={ deleteTaskCallback }
            changeSelectedCallback={ changeSelectedCallback }
            deleteToDoListCallback={ deleteToDoListCallback }
            changeToDoListTitleCallback={ changeToDoListTitleCallback }
            changeTaskTitleCallback={ changeTaskTitleCallback }
        />
    })

    return (
        <div>
            <AppBar position={ 'static' }>
                <Toolbar>
                    <IconButton
                        edge={ 'start' }
                        color={ 'inherit' }
                        aria-label={ 'menu' }
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant={ 'h6' }>
                        To Do Clone
                    </Typography>
                    <IconButton
                        color={ 'inherit' }
                        aria-label={ 'login' }
                    >
                        <AccountCircle/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={ { padding: '20px' } }>
                    <AddItemForm
                        value={ newToDoListTitle }
                        setValueCallback={ setNewToDoListTitle }
                        addToDoListCallback={ addToDoListCallback }
                    />
                </Grid>
                <Grid container spacing={ 1 }>
                    { mappedToDoList }
                </Grid>
            </Container>
        </div>
    )
}