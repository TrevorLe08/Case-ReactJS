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
        dispatch(createCategory({name: value})).then(() => {
            alert("Thêm thành công")
            navigate("/admin/categories")
        })
    }
  return (
    <div>
        <h2>Add Category</h2>
        <button onClick={() => navigate("/admin/categories")}>Back</button>
        <br />
        <br />
        <form onSubmit={submitForm}>
            <input type="text" placeholder='New category...' ref={inputRef}/>
            <button>Add</button>
        </form>
    </div>
  )
}
