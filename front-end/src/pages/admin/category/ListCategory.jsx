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
    <div className='m-2'>
      <div className='bg-white p-4 mt-[10px] rounded-md'>
        <p className='text-blue-500 font-medium mb-2 ml-1 cursor-default'># List category</p>
        <button onClick={() => navigate("/admin/categories/add")} className='btn-add-category'>Add Category</button>
        <table className='category-table'>
          <thead>
            <tr>
              <th className='category-th'>#</th>
              <th className='category-th'>Name</th>
              <th className='category-th'>Delete</th>
              <th className='category-th'>Detail</th>
              <th className='category-th'>Edit</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => (
              <tr>
                <td className='category-td'>{index + 1}</td>
                <td className='category-td'>{item.name}</td>
                <td className='category-td'>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='btn-table-category text-red-600 border-red-600 hover:bg-red-600 hover:text-white'
                  >Delete</button>
                </td>
                <td className='category-td'>
                  <button
                    onClick={() => navigate(`/admin/categories/detail/${item.id}`)}
                    className='btn-table-category text-green-500 border-green-500 hover:bg-green-500 hover:text-white'
                  >Detail</button>
                </td>
                <td className='category-td'>
                  <button
                    onClick={() => navigate(`/admin/categories/edit/${item.id}`)}
                    className='btn-table-category text-yellow-600 border-yellow-600 hover:bg-yellow-600 hover:text-white'
                  >Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
