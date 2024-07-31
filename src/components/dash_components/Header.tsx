'use client'
import React, { useContext } from 'react'
import Logo from '@/assets/d_assets/logo.png'
import Image from 'next/image'
import { UserContext } from './UserContext'

const Header = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('UserData not Available')
  }
  const { userData, setUserData } = context
  return (
    <section className=' pl-14 pr-24 bg-white z-50 pt-1 border-b-2 fixed w-full'>
      <div className='row flex justify-between align-items-center'>
        <div className='col'>
          <div>
            <Image src={Logo} height={30} width={60} alt='logo'></Image>
          </div>
        </div>
        <div className='col col-lg-2 w-40 h-12 flex justify-center border-2 mr-1'>
          <div className='flex align-items-center  '>
            <div className='pr-2 h-5 w-8 relative bottom-1'>
              {userData?.profile_pic && (
                <img
                  src={`http://139.59.47.49:4004/api/profile_image?profile_image=${userData?.profile_pic}`}
                  
                  style={{ borderRadius: '100%', objectFit: 'cover' }}
                  alt='profile_pic'></img>
              )}
            </div>
            <div>
              <h1 className='text-sm label-color font-semibold '>
                {userData?.first_name}&nbsp;{userData?.last_name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Header
