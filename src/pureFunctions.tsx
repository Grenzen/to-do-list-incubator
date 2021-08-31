import { v1 } from 'uuid'
import clone from 'clone-deep'
import { FilterPropTypes, TaskPropTypes, TaskStateTypes, ToDoListTypes } from './App'

export const filterTasks = (tasks: Array<TaskPropTypes>, filterValue: FilterPropTypes): Array<TaskPropTypes> => {
    switch (filterValue) {
        case ('Active'):
            return tasks.filter(t => !t.isDone)
        case ('Completed'):
            return tasks.filter(t => t.isDone)
        default:
            return [...tasks]
    }
}

export const addToDoList = (
    toDoLists: Array<ToDoListTypes>,
    newToDoListId: string,
    title: string,
): Array<ToDoListTypes> => {
    return [...toDoLists, { id: newToDoListId, title, filter: 'All' }]
}

export const createNewTasksArray = (tasks: TaskStateTypes, newToDoListId: string): TaskStateTypes => {
    return { ...tasks, [ newToDoListId ]: [] }
}

export const addTask = (tasks: TaskStateTypes, title: string, toDoListId: string): TaskStateTypes => {
    const task = { id: v1(), title, isDone: false }
    return { ...tasks, [ toDoListId ]: [task, ...tasks[ toDoListId ]] }
}

export const deleteTask = (tasks: TaskStateTypes, taskId: string, toDoListId: string): TaskStateTypes => {
    return { ...tasks, [ toDoListId ]: tasks[ toDoListId ].filter(t => t.id !== taskId) }
}

export const deleteToDoList = (
    toDoLists: Array<ToDoListTypes>,
    toDoListsId: string,
): Array<ToDoListTypes> => {
    return toDoLists.filter(tdl => tdl.id !== toDoListsId)
}

export const deleteTasks = (
    tasks: TaskStateTypes,
    toDoListsId: string,
): TaskStateTypes => {
    const cloneTasks = clone(tasks)
    delete cloneTasks[ toDoListsId ]
    return cloneTasks
}

export const changeSelected = (
    tasks: TaskStateTypes,
    taskId: string,
    isDone: boolean,
    toDoListId: string,
): TaskStateTypes => {
    return {
        ...tasks,
        [ toDoListId ]: tasks[ toDoListId ].map(task => task.id === taskId ? { ...task, isDone } : task),
    }
}

export const changeToDoListFilter = (
    toDoLists: Array<ToDoListTypes>,
    filter: FilterPropTypes,
    toDoListId: string,
): Array<ToDoListTypes> => {
    return toDoLists.map(tdl => tdl.id === toDoListId ? { ...tdl, filter } : tdl)
}

export const changeToDoListTitle = (
    toDoLists: Array<ToDoListTypes>,
    title: string,
    toDoListId: string,
): Array<ToDoListTypes> => {
    return toDoLists.map(tdl => tdl.id === toDoListId ? { ...tdl, title } : tdl)
}

export const changeTaskTitle = (
    tasks: TaskStateTypes,
    taskId: string,
    title: string,
    toDoListId: string,
): TaskStateTypes => {
    return {
        ...tasks,
        [ toDoListId ]: tasks[ toDoListId ].map(task => task.id === taskId ? { ...task, title } : task),
    }
}