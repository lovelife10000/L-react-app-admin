/**
 * Created by v_lljunli on 2017/5/8.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var CategorySchema=Schema({
  cate_id:Number,
  cate_parent:String,
  cate_slug:String,
  cate_name:String,
  cate_order:Number,
  cate_remark:String,
  uid:Number,

});
var Category=mongoose.model('Categories',CategorySchema);
module.exports=Category;