import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findCategory, findSearch } from '../../redux/slices/productsSlice'
import { getCategory } from '../../service/categoryService'
import './HeaderSearch.css'

export default function HeaderSearch() {
    const dispatch = useDispatch()
    const inputRef = useRef()
    const { categories } = useSelector(state => state.category)
    const { searchCategory } = useSelector(state => state.product)

    const handleSearch = () => {
        const value = inputRef.current.value
        dispatch(findSearch(value))
    }
    useEffect(() => {
        const getData = () => dispatch(getCategory())
        getData()
    }, [dispatch])

    return (
        <>
            <h2>Tìm kiếm:
                <button className='search-icon'>
                    <i className="bi bi-search"></i>
                </button>
                <input
                    type="text"
                    className='input-search'
                    placeholder=''
                    ref={inputRef}
                    onChange={() => handleSearch()}
                />
            </h2>
            <h2>Danh mục:
                <select
                    className='select-search'
                    onChange={(e) => dispatch(findCategory(e.target.value))}
                    value={searchCategory}
                >
                    <option value="All">Tất cả</option>
                    {categories.map((category, index) => (
                        <option
                            value={category.name}
                            key={index}
                        >{category.name}</option>
                    ))}
                </select>
            </h2>
        </>
    )
}
