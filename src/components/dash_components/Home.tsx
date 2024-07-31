'use client'
import Profile from '@/assets/d_assets/personal_info.png'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import Enter from '@/assets/d_assets/right_arrow.png'
import Password from '@/assets/d_assets/change_password.png'
import Notification from '@/assets/d_assets/notification.png'
import Logout from '@/assets/d_assets/logout.png'
import allapi from '@/handleapi/allapi'
import { useRouter } from 'next/navigation'
import { parseCookies, destroyCookie } from 'nookies'
const Home = () => {
  const router = useRouter()
  async function logOut() {
    const cookies = parseCookies()
    try {
      const apiRes = await allapi.auth.logout()
      destroyCookie(null, 'WEB_ACCESS_TOKEN', {
        path: '/'
      })

      toast.success('Logout Successful')
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className='pt-12 mt-16 prof'>
      <div className='container'>
        <div className='row flex justify-center'>
          <div className='col-12 pb-2'>
            <div>
              <h1 className='text-3xl font-semibold account-heading mb-4'>My Account</h1>
            </div>
          </div>
          <div className='col-12  box-border'>
            <div className='row  flex justify-evenly '>
              <div className='col-4 card shadow-best  w-96 pt-8 pb-10 overflow-hidden rounded-xl'>
                <Link href={'/dashboard/profile'}>
                  <div className='w-full  '>
                    <div className='icon-and-name  flex justify-evenly align-items-center relative right-7'>
                      <div className='icon'>
                        <Image src={Profile} width={50} height={50} alt='profile-icon'></Image>
                      </div>
                      <div className='heading flex'>
                        <h1 className='font-semibold text-lg'>Personal Info</h1>
                        <div>
                          <Image src={Enter} width={30} height={30} alt='enter-icon'></Image>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className='ml-4 pt-4'>
                      <p className='text-xs text-gray-500 '>Personal details</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='col-4 card shadow-best  w-96 pt-8 pb-10 overflow-hidden rounded-xl'>
                <Link href={'/dashboard/password'}>
                  <div className='w-full  '>
                    <div className='icon-and-name  flex justify-evenly align-items-center relative right-4'>
                      <div className='icon'>
                        <Image src={Password} width={50} height={50} alt='password-icon'></Image>
                      </div>
                      <div className='heading flex'>
                        <h1 className='font-semibold text-lg'>Change Password</h1>
                        <div>
                          <Image src={Enter} width={30} height={30} alt='enter-icon'></Image>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className='ml-4 pt-4'>
                      <p className='text-xs text-gray-500 '>Update your password and secure your account</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='col-4 card shadow-best  w-96 pt-8 pb-10 overflow-hidden rounded-xl'>
                <Link href={'/dashboard/notifications'}>
                  <div className='w-full  '>
                    <div className='icon-and-name  flex justify-evenly align-items-center relative right-4'>
                      <div className='icon'>
                        <Image src={Notification} width={45} height={50} alt='profile-icon'></Image>
                      </div>
                      <div className='heading flex'>
                        <h1 className='font-semibold text-lg'>Notification Settings</h1>
                        <div>
                          <Image src={Enter} width={30} height={30} alt='enter-icon'></Image>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className='ml-4 pt-4'>
                      <p className='text-xs text-gray-500 '>
                        Review payment, payouts, coupans, gift cards
                        <br /> and taxes
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-10 mt-20 rounded-lg pt-3 pb-2.5 pr-5 pl-5 shadow-best relative bottom-6 '>
            <div className='flex justify-between w-full'>
              <div>
                <h1 className='label-color font-semibold'>Logout</h1>
              </div>
              <div>
                <button onClick={logOut}>
                  <Image src={Logout} height={20} width={20} alt='logout'></Image>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Home
