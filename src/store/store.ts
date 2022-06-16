import {combineReducers, configureStore} from "@reduxjs/toolkit";
import projectReducer from './reducers/ProjectSlice'

const rootReducer = combineReducers({
    projectReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
