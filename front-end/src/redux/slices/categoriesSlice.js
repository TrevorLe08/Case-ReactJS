import { createSlice } from "@reduxjs/toolkit"
import { createCategory, deleteCategory, getCategory, readCategory, updateCategory } from "../../service/categoryService"

const initialState = {
    currentCategory: {},
    categories: [],
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getCategory.fulfilled, (state, { payload }) => {
                state.categories = payload
            })
        builder
            .addCase(createCategory.fulfilled, (state, { payload }) => {
                state.categories.push(payload)
            })
        builder
            .addCase(readCategory.fulfilled, (state, { payload }) => {
                state.currentCategory = payload
            })

        builder
            .addCase(updateCategory.fulfilled, (state, { payload }) => {
                const index = state.categories.findIndex(category => category.id === payload.id)
                state.categories[index].name = payload.name
            })
        builder
            .addCase(deleteCategory.fulfilled, (state, { payload }) => {
                state.categories.filter(category => category.id !== payload)
            })
    }
})

export default categoriesSlice.reducer