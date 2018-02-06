import Login from '../components/Login'
import Layout from '../components/Layout'

import Panel from '../components/Body/Panel'
import BasicInfo from '../components/Body/Panel/BasicInfo'
// import ModifyPwd from '../components/Body/Panel/ModifyPwd'

// import UserManage from '../components/Body/UserManage'
import AddUserGroup from '../components/Body/UserManage/AddUserGroup'
import AllUserGroups from '../components/Body/UserManage/AllUserGroups'
import AllUsers from '../components/Body/UserManage/AllUsers'
import AddUser from '../components/Body/UserManage/AddUser'


// import DocManage from '../components/Body/DocManage'
import AddCategory from '../components/Body/DocManage/CategoryManage/AddCategory'


// import FileManage from '../components/Body/FileManage'
import UploadAvatar from '../components/Body/FileManage/UploadAvatar'


// import DataManage from '../components/Body/DataManage'




// import CustomCenter from '../components/Body/CustomCenter'
// import SysConfig from '../components/Body/SysConfig'


const routes = [
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: Panel
      },


      // {
      //   path: '/panel',
      //   exact: true,
      //   component: Panel
      // },
      {
        path: '/panel/basicInfo',
        // exact: true,
        component: BasicInfo
      },
      // {
      //   path: '/panel/modifyPwd',
      //   exact: true,
      //   component: ModifyPwd
      // },


      // {
      //   path: '/userManage',
      //   exact: true,
      //   component: UserManage
      // },
      {
        path: '/userManage/addUserGroup',
        // exact: true,
        component: AddUserGroup
      },
      {
        path: '/userManage/allUserGroups',
        exact: true,
        component: AllUserGroups
      },
      {
        path: '/userManage/allUsers',
        exact: true,
        component: AllUsers
      },
      {
        path: '/userManage/addUser',
        exact: true,
        component: AddUser
      },


      // {
      //   path: '/docManage',
      //   exact: true,
      //   component: DocManage
      // },
      {
        path: '/docManage/addCategory',
        exact: true,
        component: AddCategory
      },



      // {
      //   path: '/fileManage',
      //   exact: true,
      //   component: FileManage
      // },
      {
        path: '/fileManage/uploadAvatar',
        exact: true,
        component: UploadAvatar
      },



      // {
      //   path: '/dataManage',
      //   exact: true,
      //   component: DataManage
      // },
      // {
      //   path: '/customCenter',
      //   exact: true,
      //   component: CustomCenter
      // },
      // {
      //   path: '/sysConfig',
      //   exact: true,
      //   component: SysConfig
      // },


    ]
  }
]

export default routes
