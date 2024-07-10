import React, { useEffect } from 'react';
import {Route, Routes} from 'react-router-dom'
import {Login, Home, Public, Products, FAQ, DetailProduct, Blogs, Services, FinalRegister, ResetPassword, DetailCart, DetailBlog } from './pages/public'
import path from './utils/path'
import {useDispatch, useSelector} from 'react-redux'
import { getCategories } from './store/app/asyncActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminLayout, Dashboard,OrderManagement, ProductManagement, UserManagement, CreateProduct, CreateBlog, BlogManagement} from './pages/admin'
import { MemberLayout, Personal, MyCart, Wishlist, History, Checkout} from './pages/member'
import { Cart, Modal } from 'components';
import { getBlogs } from 'store/blogs/asyncActions';
import ProductList from 'components/Vote/ProductList';
import DealDailyManagement from 'pages/admin/DealDailyManagement';
function App() {

  const dispatch = useDispatch()
  const {isShowCart, isShowModal, modalChildren, isShowProductList, productList} = useSelector(state => state.app)
  console.log(productList)
  useEffect(() => {;
    dispatch(getCategories())
    dispatch(getBlogs())
  }, [dispatch])

  return (
  <div className=" font-main">
   
    {isShowProductList && <Modal><ProductList products={productList}/></Modal>}
    {isShowModal && <Modal>{modalChildren}</Modal>}
    
    {isShowCart && <div className='absolute inset-0 bg-overlay z-50 flex justify-end'>
      <Cart />
    </div>}
      <Routes>
        {/* Public Route */}
        <Route path={path.CHECKOUT} element={<Checkout />}/>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}/>
          
          <Route path={path.BLOGS} element={<Blogs />}/>
          <Route path={path.DETAIL_BLOG} element={<DetailBlog />}/>

          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />}/>
          <Route path={path.FAQ} element={<FAQ />}/>
          <Route path={path.OUR_SERVICE} element={<Services />}/>
          <Route path={path.PRODUCTS__CATEGORY} element={<Products />}/>
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
          <Route path={path.CREATE_BLOG} element={<CreateBlog />}/>
          <Route path={path.MANAGE_BLOG} element={<BlogManagement />}/>
          <Route path={path.MANAGE_DEAL_DAILY} element={<DealDailyManagement />}/>
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
