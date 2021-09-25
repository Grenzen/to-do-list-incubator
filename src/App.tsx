import React, { useMemo } from 'react'
import { v1 } from 'uuid'
import * as todolistsActions from './state/actions/todoLists'
import * as tasksActions from './state/actions/tasks'
import * as taskFilterActions from './state/actions/taskFilter'
import { todoListsSelector } from './state/selectors/todoLists'
import { taskFilterReducer } from './state/reducers/taskFilter'
import { tasksSelector } from './state/selectors/tasks'
import { ToDoList } from './components/ToDoList/ToDoList'
import { AddItemForm } from './components/AddItemForm/AddItemForm'
import { AppBar, Container, Grid, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useAppDispatch } from './state'
import { useSelector } from 'react-redux'

export const App = React.memo(() => {
    const { todoLists, newTodoListTitle } = useSelector(todoListsSelector)
    const tasks = useSelector(tasksSelector)
    const dispatch = useAppDispatch()

    const changeSelectedCallback = (taskId: string, select: boolean, toDoListId: string) =>
        dispatch(tasksActions.changeSelect(taskId, select, toDoListId))
    const changeTaskTitleCallback = (taskId: string, title: string, toDoListId: string) =>
        dispatch(tasksActions.changeTaskTitle(taskId, title, toDoListId))
    const deleteTaskCallback = (taskId: string, toDoListId: string) =>
        dispatch(tasksActions.removeTask(taskId, toDoListId))
    const addTaskCallback = (title: string, toDoListId: string) =>
        dispatch(tasksActions.addTask(title, toDoListId))

    const addToDoListCallback = (title: string) => {
        const newToDoListId = v1()
        dispatch(todolistsActions.addTodoList(title, newToDoListId))
        dispatch(tasksActions.addNewTaskArray(newToDoListId))
    }
    const changeToDoListTitleCallback = (title: string, toDoListId: string) =>
        dispatch(todolistsActions.changeTodoListTitle(toDoListId, title))
    const setNewTodoListTitleCallback = (newTodoListTitle: string) =>
        dispatch(todolistsActions.setNewTodoListTitle(newTodoListTitle))

    const mappedToDoList = useMemo(() => todoLists.map(tdl => {
        const filteredTask = taskFilterReducer(tasks[ tdl.id ], taskFilterActions.changeTasksArrayFilter(tdl.filter))
        return <ToDoList
            toDoListId={ tdl.id }
            key={ tdl.id }
            filter={ tdl.filter }
            title={ tdl.title }
            tasks={ filteredTask }
            addTaskCallback={ addTaskCallback }
            deleteTaskCallback={ deleteTaskCallback }
            changeSelectedCallback={ changeSelectedCallback }
            changeToDoListTitleCallback={ changeToDoListTitleCallback }
            changeTaskTitleCallback={ changeTaskTitleCallback }
        />
    }), [todoLists, tasks])

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
                        value={ newTodoListTitle }
                        setValueCallback={ setNewTodoListTitleCallback }
                        addToDoListCallback={ addToDoListCallback }
                    />
                </Grid>
                <Grid container spacing={ 1 }>
                    { mappedToDoList }
                </Grid>
            </Container>
        </div>
    )
})