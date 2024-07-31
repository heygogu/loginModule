'use client'
import React, { useState } from 'react'

import Link from 'next/link'
import Logo from '@/assets/images/logo.png'
import '@/app/globals.css'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

const Phone = () => {
  const [phone, setPhone] = useState('')
  return (
    <>
      <div className=' w-4/12 box-border p-16 shadow-best rounded-3xl '>
        <h1 className='font-semibold text-md'>Enter Phone Number:</h1>
        <PhoneInput
          style={{ width: '100%', marginTop: '10px', marginLeft: '50px' }}
          defaultCountry='in'
          value={phone}
          onChange={(phone) => setPhone(phone)}
        />
      </div>

      <div className='col-12'>
        <Link
          className=' text-center bg-red-600 p-1 w-full d-block text-white font-medium rounded-lg'
          href={{
            pathname: '/verify-otp',
            query: {
              phoneNo: phone
            }
          }}>
          Continue
        </Link>
      </div>
    </>
  )
}

export default Phone
