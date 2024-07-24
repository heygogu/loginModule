'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import { setCookie } from 'nookies'
import Logo from '@/assets/images/logo.png'
import { useRouter } from 'next/navigation'
import { PhoneInput } from 'react-international-phone'
import '@/app/globals.css'
import '@/app/styles.css'
import 'react-international-phone/style.css'
import allapi from '@/handleapi/allapi'
import Visible from '@/assets/images/visibility.png'
import Notvisible from '@/assets/images/visibility_off.png'

import { Spin } from 'antd'

const Details = () => {
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
  const router = useRouter()

  const validateData = async (e: any) => {
    e.preventDefault()
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/
    if (!formData.first_name.length) {
      setError({ ...error, first_name: true })
    } else if (!formData.last_name.length) {
      setError({ ...error, last_name: true })
    } else if (!formData.email.includes('@')) {
      setError({ ...error, email: true })
    } else if (!regex.test(formData.password)) {
      setError({ ...error, password: true })
    } else if (formData.phone.length < 10) {
      setError({ ...error, phone: true })
    } else if (!formData.checkbox) {
      setError({ ...error, checkbox: true })
    } else {
      handleFormData()
    }
  }
  const handleFormData = async () => {
    setShowSpin(true)
    let payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      country_code: formData.phone.substring(0, 3),
      phone: formData.phone.substring(3),
      email: formData.email,
      password: formData.password
    }
    try {
      const apiRes = await allapi.auth.signup(payload)
      allapi?.setToken(apiRes?.access_token)

      setCookie(null, 'TEMP_ACCESS_TOKEN', apiRes.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })

      const query = { email: formData.email }
      const queryString = new URLSearchParams(query).toString()
      setShowSpin(false)
      router.push(`/verify-email-otp?${queryString}`)
      toast.success('Data Received')
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
              <h2 className='mt-3 mb-3 font-semibold text-lg'>Sign Up</h2>
            </div>
          </div>
          <form onSubmit={validateData}>
            <Spin spinning={showSpin}>
              <div className='row mt-1 p-3'>
                <div className='col-12 border-2 border-gray-400 flex justify-between pl-3 pr-3 pt-2 pb-1 rounded-lg mb-1'>
                  <input
                    className='font-normal text-sm w-full'
                    name='first_name'
                    type='text'
                    value={formData.first_name}
                    onChange={(e) => {
                      setFormData({ ...formData, first_name: e.target.value })
                      setError({ ...error, first_name: false })
                    }}
                    placeholder='First Name'
                    style={{ outline: 'none' }}></input>
                  <span></span>
                </div>
                {error?.first_name && (
                  <p className='m-0 text-danger text-xs validate'>
                    <sup>*</sup>Please Enter First Name
                  </p>
                )}
                <div className='col-12 border-2 border-gray-400 flex justify-between pl-3 pr-3 pt-2 pb-2 rounded-lg mb-1'>
                  <input
                    className='font-normal text-sm w-full'
                    type='text'
                    name='last_name'
                    value={formData.last_name}
                    onChange={(e) => {
                      setFormData({ ...formData, last_name: e.target.value })
                      setError({ ...error, last_name: false })
                    }}
                    placeholder='Last Name'
                    style={{ outline: 'none' }}></input>
                </div>
                {error?.last_name && (
                  <p className='m-0 text-danger text-xs validate'>
                    <sup>*</sup>Please Enter Last Name
                  </p>
                )}
                <div className='col-12 border-2 border-gray-400 flex justify-between pl-3 pr-3 pt-2 pb-2 rounded-lg mb-1'>
                  <input
                    className='font-normal text-sm w-full'
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      setError({ ...error, email: false })
                    }}
                    placeholder='Email'
                    style={{ outline: 'none' }}></input>
                </div>
                {error?.email && (
                  <p className='m-0 text-danger text-xs validate'>
                    <sup>*</sup>Invalid Email
                  </p>
                )}
                <div className='col-12 border-2 border-gray-400 flex justify-between pl-3 pr-3 pt-2 pb-2 rounded-lg mb-1'>
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
                  <span  onClick={() => setPasswordVisible(!passwordVisible)}>
                    <Image src={passwordVisible ? Visible : Notvisible} height={10} width={20} alt='btn'></Image>
                  </span>
                </div>

                {error?.password && (
                  <p className='m-0 text-danger text-xs validate'>
                    <sup>*</sup>Please Enter a Strong Password
                  </p>
                )}
                <div className='col-12 border-2 border-gray-400 flex justify-between rounded-lg mb-0'>
                  <PhoneInput
                    className='phone'
                    name='phone'
                    defaultCountry='in'
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e })
                      setError({ ...error, phone: false })
                    }}
                  />
                </div>
                {error?.phone && (
                  <p className='m-0 text-danger text-xs validate'>
                    <sup>*</sup>Please Enter a Valid Phone Number
                  </p>
                )}
              </div>
              <div className='row pb-1'>
                <div className='col col-1'>
                  <input
                    type='checkbox'
                    name='checkbox'
                    checked={formData.checkbox}
                    className='w-10 relative right-2'
                    onChange={(e) => {
                      setFormData({ ...formData, checkbox: e.target.checked })
                      setError({ ...error, checkbox: false })
                    }}
                  />
                </div>

                <div className='col col-11 relative right-2 top-1'>
                  <p className='text-xs'>
                    By Checking it, You agree to the <span className='text-red-500 underline'>Terms of Service</span>{' '}
                    and <span className='text-red-500 underline'> Privacy Policy</span>
                  </p>
                  {error?.checkbox && (
                    <p className='m-0 text-danger text-xs validate'>
                      Can not Proceed Further Unless you agree to Privacy Policy
                    </p>
                  )}
                </div>
              </div>
              <div className='row mt-3'>
                <div className='col-12'>
                  <button
                    type='submit'
                    className=' text-center bg-red-600 p-1 w-full d-block text-white font-medium rounded-lg'>
                    Sign Up
                  </button>
                </div>
              </div>
            </Spin>
          </form>
          <div className='row mt-3'>
            <div className='col-12'>
              <h2 className='text-center text-xs text-gray-500'>
                Already Registered ?
                <Link href={'/login'} className='text-red-600'>
                  {` Sign-in`}
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

export default Details
