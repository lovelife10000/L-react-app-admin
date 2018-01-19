import App from '../components/App'
import DashboardV1 from '../components/DashboardV1/dashboard'
import Panel from '../components/Panel'
import AllUserGroups from '../components/UserManage/AllUserGroups'
import AddUserGroup from '../components/UserManage/AddUserGroup'
import Login from '../components/Login'

const routes = [
  { path: '/login',
    exact: true,
    component: Login
  },
  {
    component: App,
    routes: [
      { path: '/',
        exact: true,
        component: DashboardV1
      },
      { path: '/panel',
        component: Panel
      },
      { path: '/allUserGroups',
        component: AllUserGroups
      },
      { path: '/addUserGroup',
        component: AddUserGroup
      },
    ]
  }
]

export default routes
