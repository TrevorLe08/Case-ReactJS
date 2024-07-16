import { createSlice } from "@reduxjs/toolkit"
import { createProduct, deleteProduct, getProduct, readProduct, updateProduct } from "../../service/productService"

const initialState = {
    currentProduct: {},
    products: [],
    searchName: '',
    searchCategory: 'All',
    isDone: false,
    isLoading: false,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        findSearch: (state,{payload}) => {
            state.searchName = payload
        },
        findCategory: (state,{payload}) => {
            state.searchCategory = payload
        },
        getItem: (state) => {
            state.searchName = ""
            state.searchCategory = "All"
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getProduct.pending, (state, { payload }) => {
                state.isLoading = true
            })
            .addCase(getProduct.fulfilled, (state, { payload }) => {
                state.products = payload
                state.isDone = true
                state.isLoading = false
            })

        builder
            .addCase(createProduct.fulfilled, (state, { payload }) => {
                state.products.push(payload)
                state.isDone = true
            })

        builder
            .addCase(readProduct.fulfilled, (state, { payload }) => {
                state.currentProduct = payload
            })

        builder
            .addCase(updateProduct.fulfilled, (state, { payload }) => {
                const index = state.products.findIndex(product => product.id === payload.id)
                state.products[index].name = payload.name
                state.products[index].price = payload.price
                state.products[index].quantity = payload.quantity
                state.products[index].category = payload.category
                state.products[index].images = payload.images
            })

        builder
            .addCase(deleteProduct.fulfilled, (state, { payload }) => {
                state.products.filter(product => product.id !== payload)
                state.isDone = true
            })
    }
})

export const {findSearch,findCategory,getItem} = productsSlice.actions

export default productsSlice.reducer