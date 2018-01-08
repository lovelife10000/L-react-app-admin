/**
 * Created by v_lljunli on 2017/4/17.
 */
var mongoose=require('mongoose');

//用户的表结构，定义字段
var AdminUserSchema=new mongoose.Schema({
  id:Number,
  adminUser_uid:Number,
  adminUser_username:String,
  adminUser_nickname:String,
  adminUser_avatar:{ type: String, default: "/upload/images/defaultlogo.png" },
  adminUser_password:String,
  adminUser_repassword:String,
  adminUser_status:{
    type:Number,
    default:1
  },
  adminUser_userGroup: {
    type : String,
    ref : 'AdminUserGroup',
    // set:function(string) {
    //   switch (string){
    //     case 1:
    //       string= '超级管理员';
    //       break;
    //     case 2:
    //       string= '网站管理员';
    //       break;
    //     case 3:
    //       string= '内容管理员';
    //       break;
    //     case 4:
    //       string= '投稿员';
    //       break;
    //   }
    //   return string;
    // }

  },
  adminUser_phone:Number,
  adminUser_email:String,
  adminUser_remark:String,
  date:{ type: Date, default: Date.now }
});

// AdminUserSchema.findGroup=function () {
//
// };


var AdminUser=mongoose.model('AdminUser',AdminUserSchema);



module.exports=AdminUser;