'use client'
import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { Switch } from 'antd'
import { messaging } from '../Firebase'
import { getToken } from 'firebase/messaging'

const Notifications = () => {
  const [isNotificationAllowed, setIsNotificationAllowed] = useState(false)

  useEffect(() => {
    const checkPermission = async () => {
      const permission = await Notification.requestPermission()
      setIsNotificationAllowed(permission === 'granted')
      const token = await getToken(messaging, {
        vapidKey: 'BPACtdXMSoFMp0mcbWM4lCuZJlHN19xebTgcj8znfUo7W_AFG5QYCvF3ELRrdN2Kkj7nRDYO4Fvu817mUZh2uWc'
      })
      console.log(token)
    }
    checkPermission()
  }, [])

  const handleSwitchChange = async (checked: boolean) => {
    if (checked) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        setIsNotificationAllowed(true)
        const token = await getToken(messaging, {
          vapidKey: 'BPACtdXMSoFMp0mcbWM4lCuZJlHN19xebTgcj8znfUo7W_AFG5QYCvF3ELRrdN2Kkj7nRDYO4Fvu817mUZh2uWc'
        })
        console.log(token)
      } else {
        setIsNotificationAllowed(false)
        alert('Notification Access Blocked')
      }
    } else {
      setIsNotificationAllowed(false)
    }
  }

  return (
    <section className='mt-24'>
      <div className='flex mt-5'>
        <div className='relative ml-16 w-full h-10'>
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
                title: 'Notification Settings'
              }
            ]}
          />
        </div>
      </div>

      <div className='col-7 flex gap-32 ml-16 mt-3'>
        <h1 className='text-3xl font-semibold'>Notifications Settings</h1>
        <span>
          <Switch checked={isNotificationAllowed} onChange={handleSwitchChange} />
        </span>
      </div>
    </section>
  )
}

export default Notifications
