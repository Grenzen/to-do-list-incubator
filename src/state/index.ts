import { createStore } from 'redux'
import rootReducers from './reducers'
import { useDispatch } from 'react-redux'

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()

export const store = createStore(rootReducers)