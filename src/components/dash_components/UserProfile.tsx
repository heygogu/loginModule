'use client'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import React, { useState } from 'react'
import { Breadcrumb } from 'antd'
import { useContext } from 'react'
import { UserContext } from './UserContext'
import allapi from '@/handleapi/allapi'
import { Spin } from 'antd'
const UserProfile = () => {
  const [showSpin, setShowSpin] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [changed, setChanged] = useState({
    first_name: false,
    last_name: false,
    email: false,
    country_code: false,
    phone: false,
    profile_pic: false
  }) as any
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('context not loaded')
  }
  const { userData, setUserData } = context

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    country_code: '',
    phone: '',
    profile_pic: ''
  }) as any

  async function updateContext() {
    try {
      const apiRes = await allapi.auth.getUser()
      const user = apiRes
      setUserData(user)
    } catch (error) {
      console.log(error)
    }
  }
  const changeName = async () => {
    setShowSpin(true)
    const payload = {
      first_name: changed.first_name ? formData.first_name : userData?.first_name,
      last_name: changed.last_name ? formData.last_name : userData?.last_name
    }
    try {
      const apiRes = await allapi.auth.updateName(payload)
      setShowSpin(false)
      updateContext()
    } catch (e: any) {
      setShowSpin(false)
      console.log(e)
    }
  }
  const changePhone = async () => {
    setShowSpin(true)
    const payload = {
      phone: changed.phone ? formData.phone : userData?.phone
    }
    try {
      await allapi.auth.updatePhone(payload)
      setShowSpin(false)
      updateContext()
    } catch (e: any) {
      setShowSpin(false)
      console.log(e)
    }
  }

  const changeEmail = async () => {
    setShowSpin(true)
    const payload = {
      email: changed.email ? formData.email : userData?.email
    }
    try {
      await allapi.auth.updateEmail(payload)
      setShowSpin(false)
      updateContext()
    } catch (e: any) {
      setShowSpin(false)
      console.log(e)
    }
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e?.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const uploadImg = async () => {
    if (imageFile) {
      try {
        let formdata = new FormData()
        formdata.append('file', imageFile)
        let response = await allapi.auth.upload(formdata)

        return response?.filename
      } catch (error: any) {
        console.log(error.message)
      }
    } else {
      setShowSpin(false)
      console.log('Please Select an Image First')
    }
  }
  async function handleProfilePhoto() {
    setShowSpin(true)
    const fileName = await uploadImg()
    const payload = {
      profile_pic: fileName
    }
    try {
      const apiRes = await allapi.auth.updateName(payload)
      updateContext()
      setShowSpin(false)
    } catch (e: any) {
      setShowSpin(false)
      console.log(e)
    }
  }

  return (
    <section className='mt-24 user'>
      <Spin spinning={showSpin}>
        <div className=' flex mt-5 '>
          <div className='relative ml-16 w-full h-10  '>
            <Breadcrumb
              separator='>'
              items={[
                {
                  className: 'font-semibold text-md',
                  title: 'My Account',
                  href: '/dashboard'
                },
                {
                  className: 'font-semibold text-md',
                  title: 'Personal info'
                }
              ]}
            />
          </div>
        </div>
        <div className='relative ml-16 mt-4'>
          <h1 className='text-3xl font-semibold'> Personal info</h1>
        </div>

        <div className='container  -mt-5'>
          <div className='row p-5'>
            <div className='col-7  p-3 shadow-best rounded-xl m-3'>
              <div className=' flex flex-col gap-3 p-4'>
                <div className='col-12 flex justify-between'>
                  <h1 className='font-semibold text-md'>Name</h1>
                  <h1 className='font-semibold text-md label-color'> Cancel</h1>
                </div>

                <div className='col-12 '>
                  <label htmlFor='first_name' className='font-semibold'>
                    First Name:
                  </label>

                  <input
                    id='first_name'
                    className='p-2 border-2 rounded-xl w-full'
                    value={!changed.first_name ? userData?.first_name : formData?.first_name}
                    onChange={(e) => {
                      handleInputChange(e)
                      setChanged({ ...changed, first_name: true })
                    }}
                    type='text'
                    name='first_name'
                    placeholder='First Name'
                  />
                </div>
                <div className='col-12'>
                  <label htmlFor='last_name' className='font-semibold'>
                    Last Name:
                  </label>
                  <input
                    id='last_name'
                    className='p-2 border-2 rounded-xl w-full'
                    value={!changed.last_name ? userData?.last_name : formData?.last_name}
                    onChange={(e) => {
                      handleInputChange(e)
                      setChanged({ ...changed, last_name: true })
                    }}
                    type='text'
                    name='last_name'
                    placeholder='Last Name'
                  />
                </div>

                <button onClick={changeName} className='label-bg-color font-semibold text-white w-20 p-2 rounded-2xl'>
                  Save
                </button>
              </div>
            </div>
            <div className='col-3 border-2 flex flex-col justify-center ml-12'>
              <div className='relative left-20 flex justify-center h-40 w-40'>
                {!changed.profile_pic ? (
                  <img
                    src={`http://139.59.47.49:4004/api/profile_image?profile_image=${userData?.profile_pic}`}
                    height={50}
                    width={150}
                    className='object-cover'
                    style={{ borderRadius: '100%' }}
                    alt='profile_pic'></img>
                ) : (
                  imageFile && (
                    <img
                      src={URL?.createObjectURL(imageFile)}
                      height={50}
                      width={150}
                      style={{ borderRadius: '100%' }}
                      alt='profile_pic'></img>
                  )
                )}
              </div>

              <div className='relative right-16'>
                <input
                  type='file'
                  id='imageInput'
                  className='relative left-44 mb-3 mt-2'
                  name='image'
                  accept='image/*'
                  onChange={(e) => {
                    setImageFile(e.target.files ? e.target.files[0] : null)
                    setChanged({ ...changed, profile_pic: true })
                  }}
                />
              </div>

              <button
                onClick={handleProfilePhoto}
                className='label-bg-color font-semibold text-white w-full p-2 rounded-2xl  '>
                Save
              </button>
            </div>

            <div className='col-7 p-3 shadow-best rounded-xl m-3'>
              <div className=' flex flex-col gap-3 p-4'>
                <div className='col-12 flex justify-between'>
                  <h1 className='font-semibold text-md'>Email</h1>
                  <h1 className='font-semibold text-md label-color'> Cancel</h1>
                </div>

                <div className='col-12 '>
                  <input
                    className='p-2 border-2 rounded-xl w-full'
                    type='text'
                    name='email'
                    value={!changed.email ? userData?.email : formData?.email}
                    onChange={(e) => {
                      handleInputChange(e)
                      setChanged({ ...changed, email: true })
                    }}
                    placeholder='Email'
                  />
                </div>

                <button onClick={changeEmail} className='label-bg-color font-semibold text-white w-20 p-2 rounded-2xl'>
                  Save
                </button>
              </div>
            </div>
            <div className='col-7 p-3 shadow-best rounded-xl m-3'>
              <div className=' flex flex-col gap-3 p-4'>
                <div className='col-12 flex justify-between'>
                  <h1 className='font-semibold text-md'>Phone Number</h1>
                  <h1 className='font-semibold text-md label-color'> Cancel</h1>
                </div>

                <div className='col-12 '>
                  <PhoneInput
                    className='p-2 border-none rounded-xl w-full outline-none '
                    name='phone'
                    value={!changed.phone ? userData?.phone : formData?.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e })
                      setChanged({ ...changed, phone: true })
                    }}
                  />
                </div>

                <button onClick={changePhone} className='label-bg-color font-semibold text-white w-20 p-2 rounded-2xl'>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </section>
  )
}
export default UserProfile
