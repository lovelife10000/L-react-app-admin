/**
 * Created by v_lljunli on 2017/5/8.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DocumentSchema = Schema({
  document_id: Number,
  document_title: String,
  document_publish_date:  {
    type: Date,
    default: Date.now
  },
  document_category: String,
  document_from: String,
  document_type: String,
  document_recommend: Number,
  document_hot: Number,
  document_view: Number,
  document_collection: Number,
  document_comment_num: Number,
  document_like: Number,
  document_display: Number,
  document_author: String,
  document_tags: String,
  document_keywords: String,
  document_abstract: String,
  document_img: String,
  document_content: String,

});

/*
 * 查询所有热门文档
 * */
DocumentSchema.statics.findByHot = function (hot, callback) {
  this.find({document_hot: hot}).then(function (info) {
    callback(info);
  });
};

/*
 * 查询所有推荐文档
 * */
DocumentSchema.statics.findByRecommend = function (rec, callback) {
  this.find({document_recommend: rec}).then(function (info) {
    callback(info);
  });
};

var Document = mongoose.model('Documents', DocumentSchema);


module.exports = Document;