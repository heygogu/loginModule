'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { toast ,ToastContainer} from 'react-toastify'
import { useRouter } from 'next/navigation'
import Logo from '@/assets/images/logo.png'
import '@/app/globals.css'
import '@/app/styles.css'
import allapi from '@/handleapi/allapi'
import { Spin } from 'antd'
const Forgot = () => {
  const [email, setEmail] = useState('')
  const [uniqueId, setUniqueId] = useState('')
  const [showSpin, setShowSpin] = useState(false)
  const router = useRouter()
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setShowSpin(true)
    try {
      const apiRes = await allapi.auth.forgot({ email: email })

      setUniqueId(apiRes?.uniqueId)
      const query = { uniqueId: apiRes.uniqueId, email: email }
      const queryString = new URLSearchParams(query).toString()
      setShowSpin(false)
      router.push(`/verify-otp?${queryString}`)
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
              <h2 className='mt-3 mb-3 font-semibold text-lg'>Forgot Your Password ?</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='row mt-1 p-3'>
              <div className='col-12 border-2 border-gray-400 pl-3 pr-3 pt-1 pb-1 rounded-lg mb-0'>
                <Spin spinning={showSpin} >
                  <input
                    className='font-normal text-sm'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter email'
                    style={{ outline: 'none' }}></input>
                </Spin>
              </div>
            </div>

            <div className='row mt-1'>
              <div className='col-12'>
                <button
                  type='submit'
                  className=' text-center bg-red-600 p-1 w-full d-block text-white font-medium rounded-lg'>
                  Send OTP
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
export default Forgot
