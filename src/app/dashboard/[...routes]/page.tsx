import ChangePassword from '@/components/dash_components/ChangePassword'
import Notifications from '@/components/dash_components/Notifications'
import UserProfile from '@/components/dash_components/UserProfile'

const DashboardRoutes = ({ params }: { params: { routes: string } }) => {
  const route = params.routes[0]
  switch (route) {
    case 'profile':
      return <UserProfile />
    case 'password':
      return <ChangePassword />
    case 'notifications':
      return <Notifications />
    default:
      return <h1>No Such Route Available</h1>
  }
}
export default DashboardRoutes
