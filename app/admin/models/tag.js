/**
 * Created by v_lljunli on 2017/5/18.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var tagSchema=Schema({
  tag:String,
  tag_post:String
});
var tag=mongoose.model('tags',tagSchema);
module.exports=tag;