'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import OtpInput from 'react-otp-input'
import Logo from '@/assets/images/logo.png'
import { toast } from 'react-toastify'
import '@/app/globals.css'
import '@/app/styles.css'
import allapi from '@/handleapi/allapi'
import { Spin } from 'antd'

const VerifyOTP = () => {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [showSpin, setShowSpin] = useState(false)
  const searchParams = useSearchParams()
  const uniqueId = searchParams.get('uniqueId')
  const email = searchParams.get('email')
  const [count, setCount] = useState(3)
  const resendOTP = async () => {
    setCount((prev) => prev - 1)
    
    try {
      await allapi.auth.resendEmailOTP({ email: email })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const verifyOTP = async () => {
    setShowSpin(true)
    const payload = {
      otp: Number(otp),
      unique_id: uniqueId
    }
    try {
      const apiRes = await allapi.auth.verifyotp(payload)

      const query = { whoisVerified: 'OTP', uniqueId: String(uniqueId) }
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
            <div className='col-12 flex flex-col align-items-center'>
              <Image src={Logo} height={100} width={100} alt='Logo' />
              <h2 className='mt-3 mb-3 font-semibold text-lg'>{`Confirm OTP`}</h2>
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <div>
                <h1 className='mt-3 mb-1 font-semibold text-lg text-center'>Enter the code just sent to</h1>
                <h1 className=' mb-3 font-semibold text-lg text-center'>your registered email</h1>
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
                <button className='text-red-600' disabled={count <= 0} onClick={() => resendOTP()}>
                  {` Resend(${count})`}
                </button>
              </h2>
            </div>
          </div>
        </div>
      </div>
     
    </>
  )
}

export default VerifyOTP
