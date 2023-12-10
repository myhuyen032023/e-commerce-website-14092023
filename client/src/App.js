import React, { useEffect } from 'react';
import {Route, Routes} from 'react-router-dom'
import {Login, Home, Public, Products, FAQ, DetailProduct, Blogs, Services, FinalRegister, ResetPassword, DetailCart } from './pages/public'
import path from './utils/path'
import {useDispatch, useSelector} from 'react-redux'
import { getCategories } from './store/app/asyncActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminLayout, Dashboard,OrderManagement, ProductManagement, UserManagement, CreateProduct} from './pages/admin'
import { MemberLayout, Personal, MyCart, Wishlist, History} from './pages/member'
import { Cart, Modal } from 'components';
function App() {

  const dispatch = useDispatch()
  const {isShowCart, isShowModal, modalChildren} = useSelector(state => state.app)
  useEffect(() => {;
    dispatch(getCategories())
  }, [dispatch])

  return (
  <div className=" font-main relative">

    {isShowModal && <Modal>{modalChildren}</Modal>}
    {isShowCart && <div className='absolute inset-0 bg-overlay z-50 flex justify-end'>
      <Cart />
    </div>}
      <Routes>
        {/* Public Route */}
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}/>
          
          <Route path={path.BLOGS} element={<Blogs />}/>
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />}/>
          <Route path={path.FAQ} element={<FAQ />}/>
          <Route path={path.OUR_SERVICE} element={<Services />}/>
          <Route path={path.PRODUCTS} element={<Products />}/>
          <Route path={path.DETAIL_CART} element={<DetailCart />}/>
          <Route path={path.ALL} element={<Home />}/>
        </Route> 

        {/* Admin Route */}
        <Route path={path.ADMIN} element={<AdminLayout />}>

          <Route path={path.DASHBOARD} element={<Dashboard />}/>
          <Route path={path.MANAGE_ORDER} element={<OrderManagement />}/>
          <Route path={path.MANAGE_PRODUCT} element={<ProductManagement />}/>
          <Route path={path.MANAGE_USER} element={<UserManagement />}/>
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />}/>
         
        </Route>

        {/* Member Route */}
        <Route path={path.MEMBER} element={<MemberLayout />}>

          <Route path={path.PERSONAL} element={<Personal />}/>
          <Route path={path.MY_CART} element={<MyCart />}/>
          <Route path={path.WISHLIST} element={<Wishlist />}/>
          <Route path={path.HISTORY} element={<History />}/>
          
        </Route>


        <Route path={path.FINAL_REGISTER} element={<FinalRegister />}/>
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />}/>


        <Route path={path.LOGIN} element={<Login />}/>
      </Routes>

      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          />
          {/* Same as */}
        <ToastContainer />
  </div>
  );
}

export default App;
