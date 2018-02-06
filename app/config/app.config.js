export const AppConfig = {
  SESSION_SECRET: 'L-blog-secret',
  COOKIE_SECRET: 'L-BLOG',


  // DOMAIN:(process.env.NODE_ENV === 'production')  ? 'http://admin.lijun1991.com:9001/'  :'http://localhost:9001/',
  // cookieDomain: (process.env.NODE_ENV === 'production')    ? '.lijun1991.com'    : '',
  DOMAIN:(process.env.NODE_ENV === 'production')  ? 'http://localhost:9001/'  :'http://localhost:9001/',
  cookieDomain: (process.env.NODE_ENV === 'production')    ? ''    : '',

  REDIS_HOST: '127.0.0.1',
  REDIS_PORT: 6379,
  REDIS_PSD: '',
  REDIS_DB: 0,


  BLOG: 'L-react-app-admin',
  blogName: 'L-react-app-admin',

  cookie:{
    maxAge:60*30,
    httpOnly:false,
  },

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


};