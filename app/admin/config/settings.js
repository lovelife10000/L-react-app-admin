/**
 * Created by v_lljunli on 2017/5/5.
 */
module.exports = {
  SESSION_SECRET: 'L-blog-secret',
  COOKIE_SECRET: 'L-BLOG',


  /*
   * 本地缓存设置
   * */
  REDIS_HOST: '127.0.0.1',
  REDIS_PORT: 6379,
  REDIS_PSD: '',
  REDIS_DB: 0,

  /*
   * 博客配置
   * */
  BLOG: 'L-blog博客管理系统',
  BLOG_NAME: 'L-blog',

  /*
   * 博客功能列表
   * */
  PANEL: ['panel', '仪表盘'],
  BASIC_INFO: ['basicInfo', '基本信息'],
  PASSWORD_MODIFY: ['password_modify', '修改密码'],

  USERS_MANAGE: ['usersManage', '用户管理'],
  ALL_USERS_GROUP: ['allUsersGroup', '所有用户组'],
  ALL_USERS_GROUP_ADD: ['allUsersGroupAdd', '添加用户组'],
  ALL_USERS: ['allUsers', '所有用户'],
  ALL_USERS_ADD: ['allUsersAdd', '添加用户'],
  LOGIN_LOG: ['loginLog', '登录记录'],

  DOCUMENT_MANAGE: ['documentManage', '文档管理'],
  CATEGORIES_ALL: ['categories_all', '所有分类'],
  ARTICLES_CATEGORY_ADD: ['CategoriesAdd', '添加分类'],
  DOCUMENT_WRITE: ['documentWrite', '写文档'],
  DOCUMENT_EDIT: ['documentEdit', '编辑文档'],
  PUBLISHED: ['published', '已发布'],
  WAIT_FOR_VERIFY: ['waitForVerify', '待审核'],
  NO_ACCESS: ['noAccess', '未通过'],
  DRAFT: ['draft', '草稿箱'],
  RECYCLE: ['recycle', '回收站'],

  FILES_MANAGE: ['filesManage', '文件管理'],
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