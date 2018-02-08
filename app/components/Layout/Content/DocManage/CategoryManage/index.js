import React, {Component} from 'react'


class CategoryManage extends Component {
  constructor(props) {
    super(props)

  }


  render() {

    return (
      <div className="content-wrapper">


        <section className="content-header">
          <h1>
            $cms
            <small>$item</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i>主页</a></li>
            <li><a href="#">$category</a></li>
            <li className="active">$item</li>
          </ol>
        </section>


        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="panel">
                <a href="" style={{display: 'inline-block', marginLeft: '10px'}}><i className="fa fa-list"></i></a>
                <a href="" style={{display: 'inline-block', margin: '0 10px'}}><i className="fa fa-th"></i></a>
                <a href="" role="button" className="btn btn-primary btn-sm">
                  <span className="fa fa-plus-square" aria-hidden="true">&nbsp;</span>添加媒体</a>


                <select className="form-control input-sm" style={{width: '16%', display: 'inline-block', marginLeft: '10px'}} name="media_type">


                </select>
                <select className="form-control input-sm" style={{width: '16%', display: 'inline-block', marginLeft: '10px'}} name="unique_year_month">

                </select>
                <select className="form-control input-sm " style={{width: '16%', display: 'inline-block', marginLeft: '10px'}} name="every_page_limit">
                </select>
                <button href="" role="button" className="btn btn-primary btn-sm">筛选</button>
                <div className="pull-right">

                  <form name="searchForm" className="">
                    <div className="input-group">
                      <input type="text" name="searchKey" className="form-control input-sm pull-right"                             placeholder="请输入需要查询的关键字" value=""/>
                      <div className="input-group-btn" style={{width: 'auto'}}>
                        <button className="btn btn-sm btn-primary" type="submit"><i
                          className="fa fa-search"></i>&nbsp;搜索
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/*<div className="box box-default">*/}
              {/*<div className="box-header with-border">*/}
              {/*<h3 className="box-title">{{$item}}</h3>*/}
              {/*</div>*/}


              {/*<div className="box-body table-responsive no-padding">*/}
              {/*<table className="table table-bordered  table-striped" >*/}
              {/*<tr>*/}
              {/*<th style={{width: '10px'}}><input type="checkbox" className="minimal"/></th>*/}
              {/*<th>文件</th>*/}
              {/*<th>作者</th>*/}
              {/*<th>上传至</th>*/}
              {/*<th>文件大小</th>*/}
              {/*<th>上传日期</th>*/}


              {/*<th>操作</th>*/}
              {/*</tr>*/}
              {/*<tr >*/}

              {/*<td><input type="checkbox" className="minimal"/></td>*/}
              {/*<td style={{width: '200px'}}>*/}


              {/*<div className="media_manage_all_list"                         >*/}
              {/*<img  title=""                           alt="Product Image"/>x.filename_now*/}
              {/*</div>*/}
              {/*<div className="media_manage_all_list"                         >*/}
              {/*<img                            title=""                           alt="Product Image"/>x.filename_now*/}
              {/*</div>*/}

              {/*</td>*/}
              {/*<td>x.admin_user</td>*/}
              {/*<td>x.url</td>*/}
              {/*<td>x.size | sizeFormat</td>*/}
              {/*<td>x.upload_time</td>*/}


              {/*<td>*/}
              {/*<button type="button" className="btn btn-primary btn-xs btn-flat"*/}
              {/*data-toggle="modal"*/}
              {/*data-target="#category_all_edit_modal" >编辑*/}
              {/*</button>*/}
              {/*<button type="button" className="btn btn-danger btn-xs btn-flat" data-toggle="modal"*/}
              {/*data-target="#category_all_remove_modal" >删除*/}
              {/*</button>*/}
              {/*</td>*/}
              {/*</tr>*/}

              {/*</table>*/}
              {/*<div className=""  ng-if="!listStyle" ng-repeat="x in data">*/}
              {/*<div className="col-lg-2 col-xs-6">*/}
              {/*<div className="small-box bg-white">*/}
              {/*<img ng-src="@{{ x.url | urlCut}}/@{{x.filename_now}}"*/}
              {/*title=""*/}
              {/*alt="Product Image" ng-if="x.type_real==='jpeg' || x.type_real==='jpg' || x.type_real==='png' || x.type_real==='gif'">*/}
              {/*<img ng-src="@{{ x.url | urlCutNoNumber}}/@{{ x.type_real }}-default.jpg"*/}
              {/*title=""*/}
              {/*alt="Product Image" ng-if="x.type_real==='zip' || x.type_real==='rar' || x.type_real==='pdf'">*/}

              {/*<a href="javascript:void(0)" className="small-box-footer">*/}
              {/*@{{x.filename_now}}*/}
              {/*</a>*/}
              {/*</div>*/}
              {/*</div>*/}

              {/*</div>*/}

              {/*</div>*/}
              {/*<div className="box-footer">*/}
              {/*<div className="row">*/}
              {/*<div className="col-sm-5">*/}
              {/*<div className="dataTables_info" id="example1_info" role="status" aria-live="polite">*/}
              {/*共@{{count}}条文档*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*<div className="col-sm-7">*/}
              {/*<div className="dataTables_paginate paging_simple_numbers" id="">*/}
              {/*<ul className="pagination">*/}
              {/*<li className="paginate_button previous" id=""*/}
              {/*ng-click="goToPage(currentPage-1)"*/}
              {/*ng-class="{'disabled':currentPage<=1}">*/}
              {/*<a href="#" aria-controls="example1" tabindex="0">&laquo;</a>*/}
              {/*</li>*/}
              {/*<li className="paginate_button" ng-click="goToPage(1)"*/}
              {/*ng-hide="currentPage==1 || currentPage==2">*/}
              {/*<a href="#" tabindex="0">1</a>*/}
              {/*</li>*/}
              {/*<li className="paginate_button" ng-show="currentPage>3">*/}
              {/*<a href="#" tabindex="0">...</a>*/}
              {/*</li>*/}
              {/*<li className="paginate_button" ng-click="goToPage(currentPage-1)"*/}
              {/*ng-show="currentPage>1 ">*/}
              {/*<a href="#" tabindex="0" ng-bind="currentPage-1"></a>*/}
              {/*</li>*/}
              {/*<li className="paginate_button active" ng-click="goToPage(currentPage)">*/}
              {/*<a href="#" tabindex="0" ng-bind="currentPage"></a>*/}
              {/*</li>*/}
              {/*<li className="paginate_button" ng-click="goToPage(currentPage+1)"*/}
              {/*ng-show="currentPage<allPage-1">*/}
              {/*<a href="#" tabindex="0" ng-bind="currentPage+1"></a>*/}
              {/*</li>*/}
              {/*<li className="paginate_button" ng-show="currentPage<allPage-2">*/}
              {/*<a href="#" tabindex="0">...</a>*/}
              {/*</li>*/}
              {/*<li className="paginate_button" ng-click="goToPage(allPage)"*/}
              {/*ng-show="currentPage<allPage">*/}
              {/*<a href="#" tabindex="0" ng-bind="allPage"></a>*/}
              {/*</li>*/}
              {/*<li className="paginate_button next" id="" ng-click="goToPage(currentPage+1)"*/}
              {/*ng-class="{'disabled':currentPage>=allPage}">*/}
              {/*<a href="#" tabindex="0">&raquo;</a>*/}
              {/*</li>*/}
              {/*</ul>*/}

              {/*</div>*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*</div>*/}


              {/*</div>*/}
            </div>

          </div>

        </section>

      </div>


    )
  }
}

export default CategoryManage