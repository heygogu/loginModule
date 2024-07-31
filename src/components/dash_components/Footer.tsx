"use client"
import '@/app/styles.css'
import Google from './Google'
import Apple from './Apple'
import { FaFacebook } from 'react-icons/fa'
import { TiSocialInstagramCircular } from 'react-icons/ti'
import { useRouter } from 'next/navigation'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { FaGithub } from 'react-icons/fa'
const Footer = () => {
  const router=useRouter()
  return (
    <>
      <footer className='w-100 footer'>
        <div className='container w-100 '>
          <div className='row w-100 justify-content-center'>
            <div className='col-4'>
              <div className='d-flex gap-3 flex-column'>
                {/* Icons */}
                <div className='footer-icons-wrapper d-flex justify-content-center'>
                  <div className='d-flex gap-2 mt-2'>
                    <span className='mr-5  border-2 border-black rounded-full border-dashed'>
                      <FaFacebook style={{ width: '27px', height: '25px', color: '#401414', paddingTop: '2.7px' }}
                      onClick={()=>router.push("https://www.facebook.com")} />
                    </span>
                    <span className='mr-5  border-2 border-black rounded-full border-dashed'>
                      <TiSocialInstagramCircular style={{ width: '27px', height: '28px', color: '#401414' }}
                      onClick={()=>router.push("https://www.instagram.com")} />
                    </span>
                    <span className='mr-5  border-2 border-black rounded-full border-dashed'>
                      <AiFillTwitterCircle
                        style={{ width: '27px', height: '26px', color: '#401414', paddingTop: '2px' }}
                        onClick={()=>router.push("https://www.twitter.com")}
                      />
                    </span>
                    <span className='mr-5  border-2 border-black rounded-full border-dashed'>
                      <FaGithub
                        style={{ width: '27px', height: '26px', color: '#401414', padding: '2px', marginTop: '1.3px' }}
                        onClick={()=>router.push("https://www.github.com")}
                      />
                    </span>
                  </div>
                </div>
                {/* text wrapper */}
                <div className='footer-text-wrapper mt-3'>
                  <p className='m-0 text-center text-gray-200 text-sm'>
                    &copy; Copyright 2024 Henceforth Awards - All Rights Reserved. <br /> Terms & Conditions
                  </p>
                </div>
                {/* google &app icons */}
                <div className='flex justify-center mt-2'>
                  <Google />
                  <span className='m-3'></span>
                  <Apple />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
export default Footer
