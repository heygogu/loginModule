'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'react-toastify'
import Logo from '@/assets/images/logo.png'
import '@/app/globals.css'
import '@/app/styles.css'
import allapi from '@/handleapi/allapi'
import { Spin } from 'antd'
import Link from 'next/link'

const UploadImg = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [showSpin, setShowSpin] = useState(false)
  const router = useRouter()

  const uploadImg = async () => {
    if (imageFile) {
      try {
        let formdata = new FormData()
        formdata.append('file', imageFile)
        let response = await allapi.auth.upload(formdata)
        console.log('File Uploaded to FB Module Page', response.filename)
        return response?.filename
      } catch (error: any) {
        toast.error(error.message)
      }
    } else {
      toast.warn('Please Select an Image First')
    }
  }

  const handleSubmit = async (e: any) => {
    setShowSpin(true)
    e.preventDefault()
    const fileName = await uploadImg()
    const payload = {
      profile_pic: fileName
    }

    try {
      const apiRes = await allapi.auth.postImage(payload)
      if (apiRes?.profile_pic) {
        setShowSpin(false)
        router.push('/login')
      } else {
        setShowSpin(false)
        toast.warn("Couldn't Upload Image")
      }
    } catch (e: any) {
      console.log('error')
      setShowSpin(false)
      toast.error(e)
    }
  }

  return (
    <div className='h-screen container flex justify-center items-center'>
      <div className='w-4/12 box-border p-12 shadow-best rounded-3xl'>
        <Link href={'/login'}>
          <span className='font-semibold'>{'<-'}</span>
        </Link>
        <div className='flex flex-col items-center'>
          <div className='flex flex-col items-center'>
            <Image src={Logo} height={100} width={100} alt='Logo' />
            <h2 className='mt-3 mb-3 font-semibold text-lg'>Finish Signing Up</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h1 className='text-red-600 text-center text-xs font-semibold'>Step 3 of 3</h1>
          <div className='mt-1 p-3'>
            <Spin spinning={showSpin}>
              <div className='flex justify-center p-1 rounded-lg mb-0'>
                {imageFile && (
                  <Image
                    src={URL?.createObjectURL(imageFile)}
                    height={100}
                    width={100}
                    alt=''
                    className='rounded-full border-2 border-red-600'
                  />
                )}
              </div>
            </Spin>
          </div>
          <div className='flex justify-center'>
            <div style={{ width: '100%', display: 'flex' }}>
              <input
                type='file'
                id='imageInput'
                className='relative left-24 mb-2'
                name='image'
                accept='image/*'
                onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
              />
            </div>
          </div>
          <div className='mt-1 mb-2'>
            <button type='submit' className='bg-red-600 p-1 w-full text-white font-medium rounded-lg'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadImg
