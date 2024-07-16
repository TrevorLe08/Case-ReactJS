import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const urlApi = "http://localhost:8000/carts/";

export const getCarts = createAsyncThunk(
    'carts/getCarts',
    async () => {
        const res = await axios.get(urlApi)
        return res?.data
    }
)
export const createCart = createAsyncThunk(
    'carts/createCart',
    async (data) => {
        const res = await axios.post(urlApi,data)
        return data
    }
)
export const readCart = createAsyncThunk(
    'carts/readCart',
    async (id) => {
        const res = await axios.get(urlApi + id)
        return id
    }
)

export const updateCart = createAsyncThunk(
    'carts/updateCart',
    async (data) => {
        const res = await axios.put(urlApi + data.id,data)
        return data
    }
)

