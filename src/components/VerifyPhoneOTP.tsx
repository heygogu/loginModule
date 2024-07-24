'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { toast,ToastContainer } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import OtpInput from 'react-otp-input'
import Logo from '@/assets/images/logo.png'
import '@/app/globals.css'
import '@/app/styles.css'
import allapi from '@/handleapi/allapi'
import { Spin } from 'antd'
const VerifyPhoneOTP = () => {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [count, setCount] = useState(3)
  const [showSpin, setShowSpin] = useState(false)
  const searchParams = useSearchParams()
  const cookie = parseCookies()

  const resendOTP = async () => {
    try {
      await allapi.auth.resendPhoneOTP({})
    } catch (error: any) {
      toast.error( error.message)
    }
  }

  useEffect(() => {
    resendOTP()
  }, [])

  const verifyOTP = async () => {
    setShowSpin(true)

    const payload = {
      otp: Number(otp),
      fcm_token: 'gfdgch'
    }

    //phone verification
    try {
      const apiRes = await allapi.auth.verifyphone(payload)
      allapi?.setToken(apiRes?.access_token)
      destroyCookie(null, 'TEMP_ACCESS_TOKEN', {
        path: '/'
      })
      console.log('Cookie Distroyed After verifying email', cookie.TEMP_ACCESS_TOKEN)
      setCookie(null, 'WEB_ACCESS_TOKEN', apiRes.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })

      const query = { whoisVerified: 'Phone' }
      const queryString = new URLSearchParams(query).toString()
      setShowSpin(false)
      router.push(`/verified?${queryString}`)
    } catch (e: any) {
      setShowSpin(false)
      toast.error(e.message)
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
              <h2 className='mt-3 mb-3 font-semibold text-lg'>{`Confirm Your Number`}</h2>
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <div>
                <h1 className='mt-3 mb-1 font-semibold text-lg text-center'>Enter the code just sent to</h1>
                <h1 className=' mb-3 font-semibold text-lg text-center'>{searchParams.get('phone')}</h1>
              </div>
              <div className='flex justify-center'>
                <Spin spinning={showSpin} >
                  <OtpInput
                    value={otp}
                    inputStyle={{ width: '40px', height: '40px' }}
                    onChange={setOtp}
                    shouldAutoFocus={true}
                    numInputs={4}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </Spin>
              </div>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-12'>
              <button
                className=' text-center bg-red-600 p-1 w-full d-block text-white font-medium rounded-lg'
                onClick={() => verifyOTP()}>
                Verify
              </button>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-12'>
              <h2 className='text-center text-md text-gray-500'>
                Didn't get a text ?{' '}
                <button
                  className='text-red-600'
                  disabled={count <= 0}
                  onClick={() => {
                    resendOTP(), setCount((prev) => prev - 1)
                  }}>
                  {` Resend(${count})`}
                </button>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default VerifyPhoneOTP
