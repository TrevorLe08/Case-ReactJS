import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createCategory } from '../../../service/categoryService'
import { useNavigate } from 'react-router-dom'

export default function AddCategory() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let inputRef = useRef()
    let submitForm = (e) => {
        e.preventDefault()
        const value = inputRef.current.value
        dispatch(createCategory({ name: value })).then(() => {
            alert("Thêm thành công")
            navigate("/admin/categories")
        })
    }
    return (
        <div>
            <button className='btn-back mx-2 bg-transparent' onClick={() => navigate("/admin/categories")}>Back</button>
            <div className='wrapper'>
                <form className='form-category' onSubmit={submitForm}>
                    <p className='text-2xl font-medium text-center'>Add Category</p>
                    <div>
                        <label className='form-label mr-7' htmlFor="name" >Name:</label>
                        <input className='form-input' type="text" placeholder='New category...' ref={inputRef} />
                    </div>
                    <button className='btn-submit mt-2'>Add</button>
                </form>
            </div>
        </div>
    )
}
