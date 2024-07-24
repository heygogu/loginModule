'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import allapi from '@/handleapi/allapi'
import Logo from '@/assets/images/logo.png'
import { Spin } from 'antd'
import '@/app/styles.css'
import '@/app/globals.css'
import Visible from '@/assets/images/visibility.png'
import Notvisible from '@/assets/images/visibility_off.png'

const Login = () => {
  const [showSpin, setShowSpin] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    checkbox: false
  })
  const [error, setError] = useState({
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    phone: false,
    checkbox: false
  })
  const validateData = async (e: any) => {
    e.preventDefault()
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/
    if (!formData.email.includes('@')) {
      setError({ ...error, email: true })
    } else if (!regex.test(formData.password)) {
      setError({ ...error, password: true })
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setShowSpin(true)

    const payload = {
      email: formData.email,
      password: formData.password,
      fcm_token: 'asdf',
      device_type: 'ANDROID'
    }
    try {
      const apiRes = await allapi.auth.login(payload)
      setShowSpin(false)
      toast.success(`Hey ${apiRes?.first_name}`)
    } catch (e: any) {
      setShowSpin(false)
      toast.warn(e.message)
    }
  }

  return (
    <>
      <div className='h-screen container flex justify-center align-items-center'>
        <div className=' w-4/12 box-border p-16 shadow-best rounded-3xl '>
          <div className='row'>
            <div className='col font-semibold'>
              <Link href={''}>{''}</Link>
            </div>
            <div className='col-12 flex flex-col align-items-center'>
              <Image src={Logo} height={100} width={100} alt='Logo' />
              <h2 className='mt-3 mb-3 font-semibold text-lg'>Welcome Back</h2>
            </div>
          </div>
          <form onSubmit={validateData}>
            <div className='row mt-1 p-3'>
              <Spin spinning={showSpin}>
                <div className='col-12 border-2 border-gray-400 pl-3 pr-3 pt-1 pb-1 rounded-lg mb-1'>
                  <input
                    className='font-normal text-sm'
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      setError({ ...error, email: false })
                    }}
                    placeholder='Email Address'
                    style={{ outline: 'none' }}></input>
                </div>
                {error?.email && (
                  <p className='m-0 text-danger text-xs validate'>
                    <sup>*</sup>Please Enter Email
                  </p>
                )}
                <div className='col-12 border-2 border-gray-400 flex justify-between pl-3 pr-3 pt-1 pb-1 rounded-lg mb-0'>
                  <input
                    title='Password must have atlease 8 characters including small letters,capital letters, Digits and Special Characters'
                    className='font-normal text-sm w-full'
                    type={passwordVisible ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value })
                      setError({ ...error, password: false })
                    }}
                    placeholder='Password'
                    style={{ outline: 'none' }}></input>
                  <span onClick={() => setPasswordVisible(!passwordVisible)}>
                    <Image src={passwordVisible ? Visible : Notvisible} height={10} width={20} alt='btn'></Image>
                  </span>
                </div>
                {error?.password && (
                  <p className='m-0 text-danger text-xs validate'>
                    <sup>*</sup>Please Enter Password
                  </p>
                )}
              </Spin>
            </div>
            <div className='flex justify-end mb-1 relative bottom-3 right-1'>
              <Link className='text-xs text-red-600 font-semibold ' href={'/forgot'}>
                Forgot Password ?
              </Link>
            </div>
            <div className='row mt-1'>
              <div className='col-12'>
                <button
                  type='submit'
                  className=' text-center bg-red-600 p-1 w-full d-block text-white font-medium rounded-lg'>
                  Sign In
                </button>
              </div>
            </div>
          </form>
          <div className='row mt-3'>
            <div className='col-12'>
              <h2 className='text-center text-xs text-gray-500'>
                Don't Have an Account ?
                <Link href={'/step-1'} className='text-red-600'>
                  {` Sign Up`}
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login
