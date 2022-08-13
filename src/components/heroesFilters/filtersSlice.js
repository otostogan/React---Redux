import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

export const fetcFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters")
    }
)

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetcFilters.pending, state => {state.filtersLoadingStatus = "loading"})
            .addCase(fetcFilters.fulfilled, (state, action) => {state.filters = action.payload; state.filtersLoadingStatus = "idle"})
            .addCase(fetcFilters.rejected, state => {state.filtersLoadingStatus = "error"})
    }
})

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    activeFilterChanged
} = actions;
