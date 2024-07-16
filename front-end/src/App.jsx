import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Login from './pages/login-register/Login';
import Register from './pages/login-register/Register';
import User from './pages/home/User';
import Admin from './pages/admin/Admin';
import Permission from './pages/Permission';
import NotFound from './pages/NotFound';
import ListProduct from './pages/admin/product/ListProduct';
import AddProduct from './pages/admin/product/AddProduct';
import DetailProduct from './pages/admin/product/DetailProduct';
import ListCategory from './pages/admin/category/ListCategory';
import ListCart from './pages/admin/cart/ListCart';
import PageProduct from './pages/admin/product/PageProduct';
import PageCategory from './pages/admin/category/PageCategory';
import PageCart from './pages/admin/cart/PageCart';
import HomeAdmin from './pages/admin/HomeAdmin';
import AddCategory from './pages/admin/category/AddCategory';
import DetailCategory from './pages/admin/category/DetailCategory';
import EditProduct from './pages/admin/product/EditProduct';
import EditCategory from './pages/admin/category/EditCategory';
import UserProduct from './pages/home/product/UserProduct';
import ViewProduct from './pages/home/product/ViewProduct';
import YourCart from './pages/home/cart/YourCart';
import HomeUser from './pages/home/HomeUser';
import About from './pages/home/About';

function App() {
  const { currentUser } = useSelector(state => state.user)
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/*User zones*/}
        <Route path='/home' element={<User />} >
          <Route exact path='us' element={<HomeUser />} />
          <Route path='products' element={<UserProduct />} />
          <Route path='products/detail/:id' element={<ViewProduct />} />
          <Route path='your-cart' element={<YourCart />} />
          <Route path='about' element={<About />} />
        </Route>

        {/*Admin zones*/}
        {currentUser.isAdmin ? (
          <Route path='/admin' element={<Admin />}>
            <Route path='' element={<HomeAdmin />} />
            {/* Product */}
            <Route path='products' element={<PageProduct />}>
              <Route path='' element={<ListProduct />} />
              <Route path='add' element={<AddProduct />} />
              <Route path='detail/:id' element={<DetailProduct />} />
              <Route path='edit/:id' element={<EditProduct />} />
            </Route>
            {/* Category */}
            <Route path='categories' element={<PageCategory />} >
              <Route path='' element={<ListCategory />} />
              <Route path='add' element={<AddCategory />} />
              <Route path='detail/:id' element={<DetailCategory />} />
              <Route path='edit/:id' element={<EditCategory />} />
            </Route>
            {/* Cart */}
            <Route path='carts' element={<PageCart />} >
              <Route path='' element={<ListCart />} />
            </Route>
          </Route>
        ) : (
          <Route path='/admin/*' element={<Permission />} />
        )}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;