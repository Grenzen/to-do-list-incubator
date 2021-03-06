import { CHANGE_NAME, INCREMENT_AGE, INCREMENT_CHILDREN_COUNT, StateType, userReducer } from './user-reducer'

test('user reducer should increment only age', () => {
    const startState: StateType = { age: 20, childrenCount: 2, name: 'Dimych' }

    const endState = userReducer(startState, { type: INCREMENT_AGE })

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' }
    const endState = userReducer(startState, { type: INCREMENT_CHILDREN_COUNT })

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})

test('user reduces should change name of user', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' }
    const newName = 'Katya'
    const endState = userReducer(startState, { type: CHANGE_NAME, newName: newName })

    expect(endState.name).toBe(newName)
})