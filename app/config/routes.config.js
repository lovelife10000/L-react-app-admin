import Home from '../components/Home'
import DashboardV1 from '../components/Body/DashboardV1/dashboard'
import Panel from '../components/Body/Panel'
import AllUserGroups from '../components/Body/UserManage/AllUserGroups'
import AddUserGroup from '../components/Body/UserManage/AddUserGroup'
import Login from '../components/Login'

const routes = [
  { path: '/login',
    exact: true,
    component: Login
  },
  {
    component: Home,
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
