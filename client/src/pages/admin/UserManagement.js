import React, { useEffect , useState, useCallback} from 'react'
import { apiGetUsers, apiUpdateUserByAdmin, apiDeleteUserByAdmin } from 'apis/user'
import { InputField, InputForm, Select, Button } from 'components'
import clsx from 'clsx'
import useDebounce from 'hooks/useDebounce'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { roles, blockStatus } from 'utils/constants'
const UserManagement = () => {
  const {handleSubmit, register, formState: {errors}} = useForm({
    email: '',
    firstname: '',
    lastname: '',
    role: '',
    mobile: '',
    isBlocked: ''
  })
  const [users, setUsers] = useState(null)
  const [editEl, setEditEl] = useState(null)
  const [update, setUpdate] = useState(false)

  const fetchUsers = async(params) => {
    const response = await apiGetUsers(params)
    if (response.success) setUsers(response)
  }

  const render = useCallback(() => {
    setUpdate(!update)
  }, [update])

  const handleUpdate = async(data) => {
    console.log(data)
    console.log(editEl._id)
    const response = await apiUpdateUserByAdmin(data, editEl._id)
    if (response.success) {
      setEditEl(null  )
      render()
      toast.success(response.mes)
    } else toast.error(response.mes)
    console.log(data)
  }

  const handleDelete = (uid) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to Delete this user?',
      showCancelButton: true,


    }).then(async(rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteUserByAdmin(uid)
        if (response.success) {
          render()
          toast.success(response.mes)
        } else toast.error(response.mes)
      }
    })
    
  }
  
  const [queries, setQueries] = useState({
    q: ''
  })

  const queriesDebounce = useDebounce(queries.q, 800) 


  useEffect(() => {
    const params = {}
    if (queriesDebounce) params.q = queriesDebounce
    fetchUsers(params)
  }, [queriesDebounce, editEl, update])
  
  return (
    <div className={clsx('w-full')}>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Users</span>
      </h1>
      <div className='w-full p-4' >
        <div className='flex justify-end py-4'>
          <InputField
            nameKey={'q'}
            value={queries.q}
            setValue={setQueries}
            style='w-[500px]'
            placeholder='Search user name...'
            isHideLabel={true}
            fullWidth
          />
        </div>
        <form  onSubmit={handleSubmit(handleUpdate)}>
        
          
        <table className='table-auto mb-6 text-left w-full'>
          <thead className='font-bold bg-background text-[14px] border-blue-300 '>
            <tr >
            <th className='px-4 py-2'>#</th>
            <th className='px-4 py-2'>Email</th>
            <th className='px-4 py-2'>Firstname</th>
            <th className='px-4 py-2'>Lastname</th>
            <th className='px-4 py-2'>Role</th>
            <th className='px-4 py-2'>Phone</th>
            <th className='px-4 py-2'>Status</th>
            <th className='px-4 py-2'>Created At</th>
            <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>

          <tbody >
            {
              users?.users?.map((el, index) => (
                
                  <tr key={el.id} className='border'>
                  <td className='py-2 px-4'>{index + 1}</td>
                  <td className='py-2 px-4'>
                  {
                      editEl?._id === el._id ? <InputForm
                      fullWidth
                      defaultValue={editEl.email}
                      errors={errors} 
                      register={register}
                      id={'email'} 
                      validate={{
                        required: 'Require Fill',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address"
                        }}} /> : <span>{el.email}</span>
                    }
                    </td>
                  <td className='py-2 px-4'>
                  {
                      editEl?._id === el._id ? <InputForm
                      fullWidth
                      defaultValue={editEl.firstname}
                      errors={errors} 
                      register={register}
                      id={'firstname'} 
                      validate={{required: 'Require Fill'}} /> : <span>{el.firstname}</span>
                    } </td>
                  <td className='py-2 px-4'>
                  {
                      editEl?._id === el._id ? <InputForm
                      fullWidth
                      defaultValue={editEl.lastname}
                      errors={errors} 
                      register={register}
                      id={'lastname'} 
                      validate={{required: 'Require Fill'}} /> : <span>{el.lastname}</span>
                    } </td>
                  <td className='py-2 px-4'>
                  {
                      editEl?._id === el._id ? <Select 
                      
                      defaultValue={el.role}
                      errors={errors} 
                      register={register}
                      id={'role'} 
                      validate={{required: 'Require Fill'}}
                      options={roles}
                      
                      /> : <span>{el.role}</span>
                    }</td>
                  <td className='py-2 px-4'>
                  {
                      editEl?._id === el._id ? <InputForm
                      fullWidth
                      defaultValue={editEl.mobile}
                      errors={errors} 
                      register={register}
                      id={'mobile'} 
                      validate={
                        {
                          required: 'Require Fill',
                          pattern: {
                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                            message: "invalid phone number"
                          }}} /> : <span>{el.mobile}</span>
                    }</td>
                  <td className='py-2 px-4'>
                    {
                      editEl?._id === el._id ? <Select 
                      
                      defaultValue={el.isBlocked}
                      errors={errors} 
                      register={register}
                      id={'isBlocked'} 
                      validate={{required: 'Require Fill'}}
                      options={blockStatus}
                      /> : <span>{el.isBlocked ? 'Blocked' : 'Active'}</span>
                    }
                  </td>
                  <td className='py-2 px-4'>{el.createdAt}</td>
                  <td className='py-2 px-4'>
                    { editEl?._id === el._id ? <span 
                      onClick={() => setEditEl(null)}
                      className='px-2 text-blue-700 hover:underline cursor-pointer'
                      >Cancel</span> : <span 
                      onClick={() => setEditEl(el)}
                      className='px-2 text-blue-700 hover:underline cursor-pointer'
                      >Edit</span>}
                    <span onClick={() => handleDelete(el._id)}
                    className='px-2 text-blue-700 hover:underline cursor-pointer'>Delete</span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        {editEl && <Button type='submit'>Update</Button>}
        
        </form>
        
      </div>
    </div>
  )
}

export default UserManagement