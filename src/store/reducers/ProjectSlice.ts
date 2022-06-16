
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {searchProjects} from "./ActionCreators";
import {IGitApi, IProject} from "../../models/IGitApi";

export interface ProjectState {
    projects: IProject[]
    projectCount: number
    countPerPage: number
    currentPage: number
    query: string
    isLoading: boolean
    error: string
}


///backup state in local storage
const backupHand = (state: ProjectState) => {
    localStorage.setItem('backup', JSON.stringify(state))
}

const initialState: ProjectState = (() => {
    let defaultState: ProjectState = {
        projects: [],
        projectCount: 0,
        countPerPage: 10,
        currentPage: 1,
        query: '',
        isLoading: false,
        error: ''
    }

    const backup = localStorage.getItem('backup')
    if (backup) defaultState = JSON.parse(backup)

    return defaultState as ProjectState
})()

export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setCountItems: (state, action: PayloadAction<number>) => {
            state.countPerPage = action.payload
            backupHand(state)
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
            backupHand(state)
        },
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload
            state.currentPage = 1
            backupHand(state)
        },
        setSortOrder: (state, action:{ payload: {target: IProject, current: IProject}}) => {
            state.projects = state.projects.map(project => {
                if (project.id === action.payload.target.id) {
                    return {...project, order: action.payload.current.order}
                }
                if (project.id === action.payload.current.id) {
                    return {...project, order: action.payload.target.order}
                }
                return project

            })
            backupHand(state)
        }
    },
    extraReducers: {
        [searchProjects.pending.type]: (state) => {
            state.isLoading = true
        },
        [searchProjects.fulfilled.type]: (state, action: PayloadAction<IGitApi>) => {
            state.isLoading = false
            state.error = ''
            state.projects = action.payload.items.map((project, index) => ({...project, order: index}))
            state.projectCount = action.payload.total_count
            backupHand(state)
        },
        [searchProjects.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export default projectSlice.reducer