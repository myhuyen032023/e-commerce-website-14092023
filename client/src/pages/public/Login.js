import React, {useState, useCallback, useEffect} from 'react'
import login_bg from 'assets/login-bg-4.jpg'
import { apiRegister, apiLogin, apiForgotPassword } from 'apis/user'
import {InputField, Button} from 'components'
import Swal from 'sweetalert2'
import { useNavigate, Link } from 'react-router-dom'
import path from 'utils/path'
import {login} from 'store/user/userSlice'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { validate } from 'utils/helpers'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [payload, setPayload] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    mobile: ''
  })

  const resetPayload = () => {

    
    setPayload({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      mobile: ''
    })
  }

  const [isRegister, setIsRegister] = useState(false)
  const [userForgotPassword, setUserForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [invalidField, setInvalidField] = useState([])

  const handleForgotPassword = async() => {
    const response = await apiForgotPassword({email})
    if (response.success) {
      
      toast.success(response.mes)
    } else {
      toast.info(response.mes)
    }
  }

  //

  const handleSubmit = useCallback(async() => {
    const {firstname, lastname, mobile, ...data} = payload

    const invalids = isRegister ? validate(payload, setInvalidField) : validate(data, setInvalidField)
    console.log(invalids)
    if (invalids === 0) {
      if (isRegister) {
        console.log(payload)
        const response = await apiRegister(payload)
        console.log(response)
        if (response.success) {
          Swal.fire('Congratulation', response.mes, 'success').then(() => {
            setIsRegister(false)
            resetPayload()
          })
        } else {
          Swal.fire('Oops!', response.mes, 'error')
        }
        
      } else {
        const response = await apiLogin(data)
        if (response.success) {
          //save accessToken to local storage
          dispatch(login({isLoggedIn: true, token: response.accessToken}))
          navigate(`/${path.HOME}`)
        } else {
          Swal.fire('Oops!', response.mes, 'error')
        }
      }
    }
    
  }, [payload, isRegister, navigate, dispatch])

  useEffect(() => {
    resetPayload()
  }, [isRegister])
  return (
    <div className='w-screen h-screen relative'>
    
      {
        userForgotPassword && <div className='absolute top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50'>
        <div className='flex flex-col gap-4'>
          <label htmlFor='email'>Enter your email</label>
          <input 
            type='text' 
            id='email'
            placeholder='eg: example@gmail.com'
            className='w-[800px] pb-2 border-b outline-none placeholder:text-sm'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <div className='flex items-center justify-end w-full gap-4'>
            <Button handleOnClick={handleForgotPassword}>Submit</Button> 
            <Button handleOnClick={() => setUserForgotPassword(false)}>Back</Button>
          </div>
        </div>

      </div>
      }
      <img src={login_bg} alt=''
      className='w-full h-full object-cover' 
      />
      <div className='absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex'>
        <div className='p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]'>
          <h1 className='text-[20px] font-semibold text-main mb-8'>{isRegister ? 'Register' : 'Login'}</h1>
        
        {isRegister && <div className='flex items-center gap-6'>

          <InputField 
            value={payload.firstname}
            setValue={setPayload}
            nameKey='firstname'
            invalidField={invalidField}
            setInvalidField={setInvalidField}
            
          />
          <InputField 
            value={payload.lastname}
            setValue={setPayload}
            nameKey='lastname'
            invalidField={invalidField}
            setInvalidField={setInvalidField}
          />
        </div>
        
        }
          
        
        <InputField 
            value={payload.email}
            setValue={setPayload}
            nameKey='email'
            invalidField={invalidField}
            setInvalidField={setInvalidField}
          />
        {
          isRegister && <InputField 
          value={payload.mobile}
          setValue={setPayload}
          nameKey='mobile'
          invalidField={invalidField}
          setInvalidField={setInvalidField}
        />
        }
          
        <InputField 
            value={payload.password}
            setValue={setPayload}
            nameKey='password'
            type='password'
            invalidField={invalidField}
            setInvalidField={setInvalidField}
          />

          <Button handleOnClick={handleSubmit}
            fullWidth>{isRegister ? 'Register' : 'Login'}</Button>
          
            
          
            <div className='flex items-center justify-between my-2 w-full text-sm'>
              {!isRegister && <span className='text-blue-500 hover:underline cursor-pointer' onClick={() => setUserForgotPassword(true)}>Forgot your account?</span>}
              { !isRegister && <span 
                className='text-blue-500 hover:underline cursor-pointer'
                onClick={() => setIsRegister(true)}
                >Create account</span>}
            
  
            {
            isRegister &&
            <span 
            className='text-blue-500 hover:underline cursor-pointer'
            onClick={() => setIsRegister(false)}
            >Go Login</span>}

          </div>
          

          <Link to={`/${path.HOME}`} className='text-blue-500 hover:underline cursor-pointer text-sm'>Home</Link>
          

          
        
        </div>

        
      </div>
      
      
    </div>

    
  )
}

export default Login