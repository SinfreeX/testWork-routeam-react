import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IGitApi} from "../../models/IGitApi";
import {ProjectState} from "./ProjectSlice";


export const searchProjects = createAsyncThunk(
    'projects/search',
    async (_, thunkAPI) => {
        const {projectReducer: {query, countPerPage, currentPage}} = thunkAPI.getState() as {projectReducer: ProjectState}
        try {
            const response = await axios.get<IGitApi>('https://api.github.com/search/repositories', {
                params: {
                    q: query,
                    page: currentPage,
                    per_page: countPerPage
                }
            })
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка получения данных с сервера')
        }
    }
)