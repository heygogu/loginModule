'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import Verify from '@/assets/images/verfied.png'
import { Spin } from 'antd'
import '@/app/globals.css'
import '@/app/styles.css'
const Verified = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showSpin, setShowSpin] = useState(false)
  useEffect(() => {
    setShowSpin(true)
    setTimeout(() => {
      if (searchParams.get('whoisVerified') === 'Email') {
        const query = { phone: String(searchParams.get('phone')) }
        const queryString = new URLSearchParams(query).toString()
        setShowSpin(false)
        router.push(`/verify-phone-otp?${queryString}`)
      } else if (searchParams.get('whoisVerified') === 'Phone') {
        setShowSpin(false)
        router.push('/upload-img')
      } else {
        const query = { uniqueId: String(searchParams.get('uniqueId')) }
        const queryString = new URLSearchParams(query).toString()
        setShowSpin(false)
        router.push(`reset-password?${queryString}`)
      }
    }, 2000)
  }, [])
  return (
    <>
      <div className='h-screen container flex justify-center align-items-center'>
        <div className=' w-4/12 box-border p-16 shadow-best rounded-3xl '>
          <div className='row'>
            <div className='col-12 flex flex-col align-items-center'>
              <Spin spinning={showSpin} >
                <Image src={Verify} height={100} width={100} alt='logo' />
              </Spin>
              <h1 className='mt-4'>
                Your <span className='text-red-600'>{searchParams.get('whoisVerified')}</span> has been verified
                Successfully
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Verified
