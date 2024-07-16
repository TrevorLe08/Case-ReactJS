import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const urlApi = "http://localhost:8000/"

export const getCategory = createAsyncThunk(
    'category/getCategory',
    async () => {
        const res = await axios.get(urlApi + 'categories')
        return res.data
    }
)
export const createCategory = createAsyncThunk(
    'category/createCategory',
    async (data) => {
        const res = await axios.post(urlApi + 'categories',data)
        return data
    }
)
export const readCategory = createAsyncThunk(
    'category/readCategory',
    async (id) => {
        const res = await axios.get(urlApi + `categories/${id}`)
        return res.data
    }
)
export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async (data) => {
        const res = await axios.put(urlApi + `categories/${data.id}`,data)
        return data
    }
)
export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (id) => {
        const res = await axios.delete(urlApi + `categories/${id}`)
        return id
    }
)