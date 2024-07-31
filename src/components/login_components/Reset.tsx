'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import Logo from '@/assets/images/logo.png'
import '@/app/globals.css'
import '@/app/styles.css'
import { useRouter } from 'next/navigation'
import { toast} from 'react-toastify'
import allapi from '@/handleapi/allapi'
import { Spin } from 'antd'
import Visible from '@/assets/images/visibility.png'
import Notvisible from '@/assets/images/visibility_off.png'
const Reset = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [showSpin, setShowSpin] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const handleSubmit = async (e: any) => {
    setShowSpin(true)
    e.preventDefault()
    const payload = {
      new_password: newPassword,
      unique_id: searchParams.get('uniqueId')
    }
    try {
      const apiRes = await allapi.auth.reset(payload)

      toast.success(apiRes?.message)
      setShowSpin(false)
      router.push('/login')
    } catch (error: any) {
      setShowSpin(false)
      toast.error(error.message)
    }
  }
  return (
    <>
      <div className='h-screen container flex justify-center align-items-center'>
        <div className=' w-4/12 box-border p-16 shadow-best rounded-3xl '>
          <div className='row'>
            <div className='col-12 flex flex-col align-items-center'>
              <Image src={Logo} height={100} width={100} alt='Logo' />
              <h2 className='mt-3 mb-3 font-semibold text-lg'>Reset Your Password</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Spin spinning={showSpin}>
              <div className='col-12 border-2 flex justify-between border-gray-400 pl-3 pr-3 pt-1 pb-1 rounded-lg mb-0'>
                <input
                  className='font-normal text-sm'
                  type={passwordVisible ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder='New Password'
                  
                  style={{ outline: 'none' }}></input>
                   <span className="validity"></span>
                <span onClick={() => setPasswordVisible(!passwordVisible)}>
                  <Image src={passwordVisible ? Visible : Notvisible} height={10} width={20} alt='btn'></Image>
                </span>
              </div>
            </Spin>

            <div className='row mt-2'>
              <div className='col-12'>
                <button
                  type='submit'
                  className=' text-center bg-red-600 p-1 w-full d-block text-white font-medium rounded-lg'>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    
    </>
  )
}

export default Reset
