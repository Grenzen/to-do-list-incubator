import { FilterPropTypes, TaskTypes } from './App'

// создан редьюсер в taskFilter
export const filterTasks = (tasks: Array<TaskTypes>, filterValue: FilterPropTypes): Array<TaskTypes> => {
    switch (filterValue) {
        case ('ACTIVE'):
            return tasks.filter(t => !t.isDone)
        case ('COMPLETED'):
            return tasks.filter(t => t.isDone)
        default:
            return [...tasks]
    }
}

// // создан редьюсер в tasks
// export const createNewTasksArray = (tasks: TaskStateTypes, newToDoListId: string): TaskStateTypes => {
//     return { ...tasks, [ newToDoListId ]: [] }
// }
//
// // создан редьюсер в tasks
// export const addTask = (tasks: TaskStateTypes, title: string, toDoListId: string): TaskStateTypes => {
//     const task = { id: v1(), title, isDone: false }
//     return { ...tasks, [ toDoListId ]: [task, ...tasks[ toDoListId ]] }
// }
//
// // создан редьюсер в tasks
// export const deleteTask = (tasks: TaskStateTypes, taskId: string, toDoListId: string): TaskStateTypes => {
//     return { ...tasks, [ toDoListId ]: tasks[ toDoListId ].filter(t => t.id !== taskId) }
// }
//
// // создан редьюсер в tasks
// export const deleteTasks = (
//     tasks: TaskStateTypes,
//     toDoListsId: string,
// ): TaskStateTypes => {
//     const cloneTasks = clone(tasks)
//     delete cloneTasks[ toDoListsId ]
//     return cloneTasks
// }
//
// // создан редьюсер в tasks
// export const changeSelected = (
//     tasks: TaskStateTypes,
//     taskId: string,
//     isDone: boolean,
//     toDoListId: string,
// ): TaskStateTypes => {
//     return {
//         ...tasks,
//         [ toDoListId ]: tasks[ toDoListId ].map(task => task.id === taskId ? { ...task, isDone } : task),
//     }
// }
//
// // создан редьюсер в tasks
// export const changeTaskTitle = (
//     tasks: TaskStateTypes,
//     taskId: string,
//     title: string,
//     toDoListId: string,
// ): TaskStateTypes => {
//     return {
//         ...tasks,
//         [ toDoListId ]: tasks[ toDoListId ].map(task => task.id === taskId ? { ...task, title } : task),
//     }
// }

// написан редьюсер в todolist-reducer
// export const addToDoList = (
//     toDoLists: Array<ToDoListTypes>,
//     newToDoListId: string,
//     title: string,
// ): Array<ToDoListTypes> => {
//     return [...toDoLists, { id: newToDoListId, title, filter: 'All' }]
// }
//
// // написан редьюсер в todolist-reducer
// export const deleteToDoList = (
//     toDoLists: Array<ToDoListTypes>,
//     toDoListsId: string,
// ): Array<ToDoListTypes> => {
//     return toDoLists.filter(tdl => tdl.id !== toDoListsId)
// }
//
// // написан редьюсер в todolist-reducer
// export const changeToDoListFilter = (
//     toDoLists: Array<ToDoListTypes>,
//     filter: FilterPropTypes,
//     toDoListId: string,
// ): Array<ToDoListTypes> => {
//     return toDoLists.map(tdl => tdl.id === toDoListId ? { ...tdl, filter } : tdl)
// }
//
// // написан редьюсер в todolist-reducer
// export const changeToDoListTitle = (
//     toDoLists: Array<ToDoListTypes>,
//     title: string,
//     toDoListId: string,
// ): Array<ToDoListTypes> => {
//     return toDoLists.map(tdl => tdl.id === toDoListId ? { ...tdl, title } : tdl)
// }
