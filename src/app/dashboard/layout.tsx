'use client'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import BootstrapClient from '@/components/BootStrapClient'
import { ToastContainer } from 'react-toastify'
import '@/app/globals.css'
import '@/app/styles.css'
import 'react-toastify/dist/ReactToastify.css'
import Header from '@/components/dash_components/Header'
import Footer from '@/components/dash_components/Footer'
import { UserContext } from '@/components/dash_components/UserContext'
import { parseCookies } from 'nookies'
import allapi from '@/handleapi/allapi'

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [userData, setUserData] = useState() as any

  useEffect(() => {
    const cookies = parseCookies()

    allapi.setToken(cookies.WEB_ACCESS_TOKEN)
    const fetchUserData = async () => {
      try {
        const apiRes = await allapi.auth.getUser()
        const user = apiRes
        setUserData({
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          country_code: user.country_code,
          phone: user.phone,
          profile_pic: user.profile_pic
        })
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserData()
  }, [])
  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className='d-flex flex-column h-100'>
          <div className='w-100'>
            <div>
              <Header />
            </div>
            <main>{children}</main>
            <BootstrapClient />
          </div>
          <div className='mt-auto foot'>
            <Footer />
          </div>
          <ToastContainer />
        </div>
      </UserContext.Provider>
    </>
  )
}
