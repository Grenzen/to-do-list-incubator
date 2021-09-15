import { todolistsReducer } from './todolists'
import * as actions from '../actions/todolists'
import { v1 } from 'uuid'
import { FilterPropTypes, ToDoListTypes } from '../../App'

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<ToDoListTypes> = [
        { id: todolistId1, title: 'What to learn', filter: 'ALL' },
        { id: todolistId2, title: 'What to buy', filter: 'ALL' },
    ]

    const endState = todolistsReducer(startState, actions.removeTodoList(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[ 0 ].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistId = v1()
    let newTodolistTitle = 'New Todolist'

    const startState: Array<ToDoListTypes> = [
        { id: todolistId1, title: 'What to learn', filter: 'ALL' },
        { id: todolistId2, title: 'What to buy', filter: 'ALL' },
    ]

    const endState = todolistsReducer(startState, actions.addTodoList(newTodolistTitle, newTodolistId))

    expect(endState.length).toBe(3)
    expect(endState[ 2 ].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<ToDoListTypes> = [
        { id: todolistId1, title: 'What to learn', filter: 'ALL' },
        { id: todolistId2, title: 'What to buy', filter: 'ALL' },
    ]

    const endState = todolistsReducer(startState, actions.changeTodoListTitle(todolistId2, newTodolistTitle))

    expect(endState[ 0 ].title).toBe('What to learn')
    expect(endState[ 1 ].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterPropTypes = 'COMPLETED'

    const startState: Array<ToDoListTypes> = [
        { id: todolistId1, title: 'What to learn', filter: 'ALL' },
        { id: todolistId2, title: 'What to buy', filter: 'ALL' },
    ]

    const endState = todolistsReducer(startState, actions.changeTodoListFilter(todolistId2, newFilter))

    expect(endState[ 0 ].filter).toBe('ALL')
    expect(endState[ 1 ].filter).toBe(newFilter)
})



