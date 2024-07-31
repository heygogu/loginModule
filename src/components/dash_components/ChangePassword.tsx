'use client'
import { useState } from 'react'
import { Breadcrumb } from 'antd'
import { Spin } from 'antd'
import allapi from '@/handleapi/allapi'
import Visible from '@/assets/images/visibility.png'
import Notvisible from '@/assets/images/visibility_off.png'
import Image from 'next/image'
import { toast } from 'react-toastify'
const ChangePassword = () => {
  const [showSpin, setShowSpin] = useState<boolean>(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [oldVisible, setOldVisible] = useState(false)
  const [newVisible, setNewVisible] = useState(false)

  const [error, setError] = useState({
    newPasswordAvailable: false,
    strongNewPasswordAvailable: false,
    oldPasswordAvailable: false
  })

  function validate() {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/
    if (!oldPassword.length) {
      setError({ ...error, oldPasswordAvailable: true })
    } else if (!newPassword.length) {
      setError({ ...error, newPasswordAvailable: true })
    } else if (!regex.test(newPassword)) {
      setError({ ...error, strongNewPasswordAvailable: true })
    } else {
      updatePassword()
    }
  }

  async function updatePassword() {
    setShowSpin(true)
    const payload = {
      old_password: oldPassword,
      new_password: newPassword
    }
    try {
      const apiRes = await allapi.auth.changePassword(payload)
      setShowSpin(false)
      toast.success('Password Changed Successfully')
      setOldPassword('')
      setNewPassword('')
    } catch (error: any) {
      setShowSpin(false)
      toast.warn(error.message)
    }
  }
  return (
    <section className='mt-24 passwd'>
      <div className=' flex mt-5'>
        <div className='relative ml-16'>
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
                title: 'Change Password'
              }
            ]}
          />
        </div>
      </div>
      <div className='relative ml-16 mt-4'>
        <h1 className='text-3xl font-semibold'>Change Password</h1>
      </div>
      <Spin spinning={showSpin}>
        <div className='container  -mt-5'>
          <div className='row p-5'>
            <div className='col-7  p-3 shadow-best rounded-xl m-3'>
              <div className=' flex flex-col gap-2 p-4'>
                <div className='col-12 flex justify-start'>
                  <h1 className='font-semibold text-md'>Old Password</h1>
                </div>
                <div className='col-12 mb-3 flex justify-between '>
                  <input
                    className='p-2 border-2 rounded-xl w-full'
                    type={oldVisible ? 'text' : 'password'}
                    value={oldPassword}
                    name='old-password'
                    onChange={(e) => {
                      setOldPassword(e.target.value)
                      setError({ ...error, oldPasswordAvailable: false })
                    }}
                    placeholder='Old Password'
                  />
                  <span className='relative right-10 top-3' onClick={() => setOldVisible(!oldVisible)}>
                    <Image src={oldVisible ? Visible : Notvisible} height={10} width={20} alt='btn'></Image>
                  </span>
                </div>
                {error.oldPasswordAvailable && (
                  <p className='text-danger text-xs relative bottom-5 left-2'>Please Enter Password</p>
                )}

                <div className='col-12 flex justify-start'>
                  <h1 className='font-semibold text-md'>New Password</h1>
                </div>
                <div className='col-12 flex justify-between '>
                  <input
                    className='p-2 border-2 rounded-xl w-full'
                    type={newVisible ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value)
                      setError({ ...error, newPasswordAvailable: false, strongNewPasswordAvailable: false })
                    }}
                    name='new-password'
                    placeholder='New Password'
                  />
                  <span className='relative right-10 top-3' onClick={() => setNewVisible(!newVisible)}>
                    <Image src={newVisible ? Visible : Notvisible} height={10} width={20} alt='btn'></Image>
                  </span>
                </div>
                {error.newPasswordAvailable && (
                  <p className='text-danger text-xs relative bottom-2 left-2'>Please Enter Password</p>
                )}
                {error.strongNewPasswordAvailable && (
                  <p className='text-danger text-xs relative bottom-2 left-2'>Please Enter a Strong Password</p>
                )}
                <button
                  onClick={validate}
                  className='label-bg-color mt-2 font-semibold text-white w-40 p-2 rounded-2xl'>
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </section>
  )
}
export default ChangePassword
