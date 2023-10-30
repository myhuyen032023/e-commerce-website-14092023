import React, { useEffect } from 'react';
import {Route, Routes} from 'react-router-dom'
import {Login, Home, Public, Products, FAQ, DetailProduct, Blogs, Services, FinalRegister, ResetPassword } from './pages/public'
import path from './utils/path'
import {useDispatch} from 'react-redux'
import { getCategories } from './store/app/asyncActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
  <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}/>
          
          <Route path={path.BLOGS} element={<Blogs />}/>
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />}/>
          <Route path={path.FAQ} element={<FAQ />}/>
          <Route path={path.OUR_SERVICE} element={<Services />}/>
          <Route path={path.PRODUCTS} element={<Products />}/>
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
