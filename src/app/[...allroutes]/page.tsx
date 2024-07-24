import Details from '@/components/SignUp'
import Forgot from '@/components/Forgot'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Reset from '@/components/Reset'
import UploadImg from '@/components/UploadImg'
import VerifyEmailOTP from '@/components/VerifyEmailOTP'
import VerifyPhoneOTP from '@/components/VerifyPhoneOTP'
import Verified from '@/components/Verified'
import VerifyOTP from '@/components/VerifyOTP'

const MainComponent = ({ params }: { params: { allroutes: string } }) => {
  const path: string = params.allroutes[0]
  console.log(path)

  switch (path) {
    case 'step-1':
      return <Home />
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
    case 'forgot':
      return <Forgot />
    case 'reset':
      return <Reset />
    case 'verify-otp':
      return <VerifyOTP/>
    case 'upload-img':
      return <UploadImg/>
  }
}
export default MainComponent
