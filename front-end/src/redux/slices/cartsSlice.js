import { createSlice } from "@reduxjs/toolkit"
import { createCart, getCarts, readCart, updateCart } from "../../service/cartService"

const initialState = {
    carts: [],
    currentCart: {},
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartsSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getCarts.fulfilled, (state, { payload }) => {
                state.carts = payload
            })
        builder
            .addCase(createCart.fulfilled, (state, { payload }) => {
                state.carts.push(payload)
            })
        builder
            .addCase(readCart.fulfilled, (state, { payload }) => {
                state.currentCart = payload
            })
        builder
            .addCase(updateCart.fulfilled, (state, { payload }) => {
                const index = state.carts.findIndex(cart => cart.id === payload.id)
                state.carts[index].total = payload.total
                state.carts[index].amount = payload.amount
                state.carts[index].products = payload.products
            })
    }
})

export default cartsSlice.reducer