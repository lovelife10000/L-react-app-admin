import Login from 'components/Login'
import Layout from 'components/Layout'


import BasicInfo from 'components/Layout/Content/Panel/BasicInfo'
import AddUserGroup from 'components/Layout/Content/UserManage/AddUserGroup'
import AllUserGroups from 'components/Layout/Content/UserManage/AllUserGroups'
import AllUsers from 'components/Layout/Content/UserManage/AllUsers'
import AddUser from 'components/Layout/Content/UserManage/AddUser'



import AddCategory from 'components/Layout/Content/DocManage/CategoryManage/AddCategory'
import AllCategories from 'components/Layout/Content/DocManage/CategoryManage/AllCategories'
import AddDoc from 'components/Layout/Content/DocManage/AddDoc'
import AllDocs from 'components/Layout/Content/DocManage/AllDocs'
import AddTag from 'components/Layout/Content/DocManage/AddTag'
import AllTags from 'components/Layout/Content/DocManage/AllTags'
import BannerManage from 'components/Layout/Content/DocManage/BannerManage'


import UploadAvatar from 'components/Layout/Content/FileManage/UploadAvatar'








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
        component: BasicInfo
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


      {
        path: '/docManage/bannerManage',
        exact: true,
        component: BannerManage
      },
      {
        path: '/docManage/addCategory',
        exact: true,
        component: AddCategory
      },
      {
        path: '/docManage/allCategories',
        exact: true,
        component: AllCategories
      },
      {
        path: '/docManage/addDoc',
        exact: true,
        component: AddDoc
      },
        {
            path: '/docManage/allDocs',
            exact: true,
            component: AllDocs
        },
      {
        path: '/docManage/addTag',
        exact: true,
        component: AddTag
      },  {
        path: '/docManage/allTags',
        exact: true,
        component: AllTags
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
