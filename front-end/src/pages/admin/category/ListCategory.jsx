import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, getCategory } from '../../../service/categoryService'
import { useNavigate } from 'react-router-dom'

export default function ListCategory() {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const { categories } = useSelector(state => state.category)

  const handleDelete = (id) => {
    dispatch(deleteCategory(id)).then(() => {
      alert("Xóa thành công")
      // Reload page for no aim :v
      window.location.reload()
    })
  }

  useEffect(() => {
    const getData = () => dispatch(getCategory())
    getData()
  }, [])
  return (
    <div>
      <h2>List category</h2>
      <button onClick={() => navigate("/admin/categories/add")}>Add</button><table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Xóa</th>
            <th>Chi tiết</th>
            <th>Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
              <td><button onClick={() => navigate(`/admin/categories/detail/${item.id}`)}>Detail</button></td>
              <td><button onClick={() => navigate(`/admin/categories/edit/${item.id}`)}>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
