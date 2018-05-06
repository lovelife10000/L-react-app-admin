module.exports = {
    prodPort: 3001,
    devPort: 3001,
    devDomain: 'http://localhost:9001',
    prodDomain: '',


    SESSION_SECRET: 'L-blog-secret',
    COOKIE_SECRET: 'L-BLOG',


    // DOMAIN:(process.env.NODE_ENV === 'production')  ? 'http://admin.lijun1991.com:9001/'  :'http://localhost:9001/',
    // cookieDomain: (process.env.NODE_ENV === 'production')    ? '.lijun1991.com'    : '',
    domain: process.env.NODE_ENV === 'production' ? 'http://admin.lijun1991.com:9001/' : 'http://localhost:9001/',
    cookieDomain: (process.env.NODE_ENV === 'production') ? '' : '',

    REDIS_HOST: '127.0.0.1',
    REDIS_PORT: 6379,
    REDIS_PSD: '',
    REDIS_DB: 0,


    BLOG: 'L-react-app-admin',
    blogName: 'L-react-app-admin',

    cookie: {
        maxAge: 60 * 30,
        httpOnly: false,

    },

    currentUser: {},
    collapsed: false,
    notices: [],

    /*
     * 博客功能列表
     * */
    panel: ['panel', '仪表盘'],
    basicInfo: ['basicInfo', '基本信息'],
    modifyPwd: ['password_modify', '修改密码'],

    userManage: ['usersManage', '用户管理'],
    allUserGroups: ['allUserGroups', '所有用户组'],
    addUserGroup: ['addUserGroup', '添加用户组'],
    allUsers: ['allUsers', '所有用户'],
    addUser: ['allUsersAdd', '添加用户'],
    LOGIN_LOG: ['loginLog', '登录记录'],

    docManage: ['docManage', '文档管理'],
    allCategories: ['allCategories', '所有分类'],
    addCategory: ['addCategory', '添加分类'],
    addDoc: ['addDoc', '添加文档'],
    allDocs: ['allDocs', '所有文档'],
    addTag: ['addTag', '添加标签'],
    allTags: ['allTags', '所有标签'],
    PUBLISHED: ['published', '已发布'],
    WAIT_FOR_VERIFY: ['waitForVerify', '待审核'],
    NO_ACCESS: ['noAccess', '未通过'],
    DRAFT: ['draft', '草稿箱'],
    RECYCLE: ['recycle', '回收站'],


    fileManage: ['filesManage', '文件管理'],
    uploadAvatar: ['uploadAvatar', '头像上传'],
    MEDIA_MANAGE: ['mediaManage', '媒体管理'],
    FILES_BACKUP: ['filesBackup', '文件备份'],
    FILES_RECOVER: ['filesRecover', '文件恢复'],


    DATA_MANAGE: ['dataManage', '数据管理'],
    DATABASE_BACKUP: ['databaseBackup', '数据库备份'],
    DATABASE_IMPORT: ['databaseImport', '数据库导入'],
    DATABASE_COMPRESS: ['databaseCompress', '数据库压缩'],
    DATABASE_OPTIMIZE: ['databaseOptimize', '数据库优化'],
    CACHE_MANAGE: ['cacheManage', '缓存管理'],
    CACHE_CLEAR: ['cacheClear', '缓存清理'],
    CACHE_SETTINGS: ['cacheSettings', '缓存设置'],
    STATISTICS_MANAGE: ['statisticsManage', '统计管理'],
    STATISTICS_COUNT: ['statisticsCount', '数据统计'],

    CUSTOMIZATION_CENTER: ['customizationCenter', '定制中心'],
    THEME_MANAGE: ['themeManage', '主题管理'],
    INSTALL_THEME: ['installTheme', '安装主题'],
    LOCAL_THEME: ['localTheme', '本地主题'],
    EDIT_TEMPLATE: ['editTemplate', '模版编辑'],
    PLUGINS_MANAGE: ['pluginsManage', '插件管理'],
    HOOKS_MANAGE: ['hooksManage', '钩子管理'],
    AD_MANAGE: ['adManage', '广告管理'],

    SYSTEM_SETTINGS: ['systemSettings', '系统设置'],
    SYSTEM_LOG: ['systemLog', '系统日志'],
    WEBSITE_SETTINGS: ['websiteSettings', '站点设置'],
    READ_SETTINGS: ['readSettings', '阅读设置'],
    ATTACHMENT_SETTINGS: ['attachmentSettings', '附件设置'],
    SOCIAL_LOGIN_SETTINGS: ['socialLoginSettings', '社交登录设置'],
    UPDATE_ONLINE: ['updateOnline', '在线更新'],
    SYSTEM_INFO: ['systemInfo', '系统信息'],
    BUGS_FEEDBACK: ['bugsFeedback', 'BUG反馈'],


    side: [
        {
            name: '仪表盘',
            url: '',
            icon: 'dashboard',
            children: [
                {
                    name: '基本信息',
                    url: '/panel/basicInfo',
                    children: []
                },
                {
                    name: '修改密码',
                    url: '/panel/modifyPwd',
                    children: []
                }],
        },
        {
            name: '用户管理',
            url: '',
            icon: 'user',
            children: [
                {
                    name: '所有用户组',
                    url: '/userManage/allUserGroups',
                    children: []
                },
                {
                    name: '添加用户组',
                    url: '/userManage/addUserGroup',
                    children: []
                },
                {
                    name: '所有用户',
                    url: '/userManage/allUsers',
                    children: []
                },
                {
                    name: '添加用户',
                    url: '/userManage/addUser',
                    children: []
                }
            ],
        },
        {
            name: '文档管理',
            url: '',
            icon: 'file-word',
            children: [
                {
                    name: '分类管理',
                    url: '',
                    children: [
                        {
                            name: '所有分类',
                            url: '/docManage/allCategories',
                            children: []
                        },
                        {
                            name: '添加分类',
                            url: '/docManage/addCategory',
                            children: []
                        },
                    ]
                },
                {
                    name: '菜单管理',
                    url: '',
                    children: [
                        {
                            name: '编辑菜单',
                            url: '/docManage/menuManage/editMenu',
                            children: []
                        },
                        {
                            name: '菜单位置',
                            url: '/docManage/menuManage/menuLocation',
                            children: []
                        },
                    ]
                },
                {
                    name: '标签管理',
                    url: '',
                    children: [{
                        name: '所有标签',
                        url: '/docManage/allTags',
                        children: []
                    },
                        {
                            name: '添加标签',
                            url: '/docManage/addTag',
                            children: []
                        },]
                },
                {
                    name: '评论管理',
                    url: '',
                    children: [{
                        name: '评论管理1',
                        url: '/docManage/commentsManage',
                        children: []
                    }]
                },
                {
                    name: '消息管理',
                    url: '',
                    children: [{
                        name: '消息管理1',
                        url: '/docManage/msgManage',
                        children: []
                    }]
                },
                {
                    name: '文档管理',
                    url: '',
                    children: [{
                        name: '添加文档',
                        url: '/docManage/addDoc',
                        children: []
                    }, {
                        name: '所有文档',
                        url: '/docManage/allDocs',
                        children: []
                    }]
                },
                {
                    name: '轮播管理',
                    url: '/docManage/bannerManage',
                    children: []
                },
            ],
        },
        {
            name: '文件管理',
            url: '',
            icon: 'folder-open',
            children: [
                {
                    name: '头像上传',
                    url: '/fileManage/uploadAvatar',
                    children: []
                },
                {
                    name: '媒体管理',
                    url: '/fileManage/mediaManage',
                    children: []
                },
                {
                    name: '文件备份',
                    url: '/fileManage/filesBackup',
                    children: []
                },
                {
                    name: '文件恢复',
                    url: '/fileManage/filesRecover',
                    children: []
                }
            ],
        },
        {
            name: '数据管理',
            url: '',
            icon: 'database',
            children: [
                {
                    name: '数据库管理',
                    url: '',
                    children: [
                        {
                            name: '数据库备份',
                            url: '/dataManage/databaseManage/databaseBackup',
                            children: []
                        },
                        {
                            name: '数据库导入',
                            url: '/dataManage/databaseManage/databaseImport',
                            children: []
                        },
                        {
                            name: '数据库压缩',
                            url: '/dataManage/databaseManage/databaseCompress',
                            children: []
                        },
                        {
                            name: '数据库优化',
                            url: '/dataManage/databaseManage/databaseoptimize',
                            children: []
                        },
                    ]
                },
                {
                    name: '缓存管理',
                    url: '',
                    children: [
                        {
                            name: '缓存清理',
                            url: '/dataManage/cacheManage/cacheClear',
                            children: []
                        },
                        {
                            name: '缓存设置',
                            url: '/dataManage/cacheManage/cacheSettings',
                            children: []
                        },
                    ]
                },
                {
                    name: '统计管理',
                    url: '',
                    children: [{
                        name: '数据统计',
                        url: '/dataManage/statisticsManage/count',
                        children: []
                    },]
                },

            ],
        },
        {
            name: '定制中心',
            url: '',
            icon: 'setting',
            children: [
                {
                    name: '主题管理',
                    url: '',
                    children: [
                        {
                            name: '安装主题',
                            url: '/customizationCenter/themeManage/installTheme',
                            children: []
                        },
                        {
                            name: '本地主题',
                            url: '/customizationCenter/themeManage/localTheme',
                            children: []
                        },
                        {
                            name: '模版编辑',
                            url: '/customizationCenter/themeManage/editTemplate',
                            children: []
                        },

                    ]
                },
                {
                    name: '插件管理',
                    url: '/customizationCenter/pluginsManage',
                    children: []
                },
                {
                    name: '钩子管理',
                    url: '/customizationCenter/hooksManage',
                    children: []
                },
                {
                    name: '广告管理',
                    url: '/customizationCenter/adManage',
                    children: []
                },


            ],
        },
        {
            name: '系统设置',
            url: '',
            icon: 'setting',
            children: [
                {
                    name: '系统日志',
                    url: '/systemSettings/systemLog',
                    children: []
                },
                {
                    name: '站点设置',
                    url: '/systemSettings/websiteSettings',
                    children: []
                },
                {
                    name: '阅读设置',
                    url: '/systemSettings/readSettings',
                    children: []
                },
                {
                    name: '附件设置',
                    url: '/systemSettings/attachmentSettings',
                    children: []
                },
                {
                    name: '社交登录设置',
                    url: '/systemSettings/socialLoginSettings',
                    children: []
                }, {
                    name: '在线更新',
                    url: '/systemSettings/updateOnline',
                    children: []
                }, {
                    name: '系统信息',
                    url: '/systemSettings/systemInfo',
                    children: []
                }, {
                    name: 'BUG反馈',
                    url: '/systemSettings/bugsFeedback',
                    children: []
                },

            ],
        },
    ]


};