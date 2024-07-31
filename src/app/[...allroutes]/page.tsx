import Details from '@/components/login_components/SignUp'
import Forgot from '@/components/login_components/Forgot'

import Login from '@/components/login_components/Login'
import Reset from '@/components/login_components/Reset'
import UploadImg from '@/components/login_components/UploadImg'
import VerifyEmailOTP from '@/components/login_components/VerifyEmailOTP'
import VerifyPhoneOTP from '@/components/login_components/VerifyPhoneOTP'
import Verified from '@/components/login_components/Verified'
import VerifyOTP from '@/components/login_components/VerifyOTP'

const MainComponent = ({ params }: { params: { allroutes: string } }) => {
  const path: string = params.allroutes[0]
  console.log(path)

  switch (path) {
    case 'sign-up':
      return <Details />
    case 'verify-email-otp':
      return <VerifyEmailOTP />
    case 'verify-phone-otp':
      return <VerifyPhoneOTP />
    case 'verified':
      return <Verified />
    case 'login':
      return <Login />
    case 'forgot-password':
      return <Forgot />
    case 'reset-password':
      return <Reset />
    case 'verify-otp':
      return <VerifyOTP />
    case 'upload-img':
      return <UploadImg />
  }
}
export default MainComponent
