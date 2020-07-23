import request from '@/utils/request'

export default {

  //线路列表
  getRouteList() {
    return request({
      url: '/plm/route/list',
      method: 'get',
    })
  },
   //根据id删除工艺线路
  deleteRouteInfoById(id){
    return request({
      url: '/plm/route/delete/'+id,
      method: 'delete',
    })
  },
  //添加路线
  addRoute(route){
    return request({
      url: '/plm/route/addRoute/',
      method: 'post',
      data:route
    })
  },
  //根据id查询线路信息
  getRouteById(id){
    return request({
      url: '/plm/route/route/'+id,
      method: 'get',
    })
  },
  //修改线路信息
  updateRouteById(route){
    return request({
      url: '/plm/route/updateRoute',
      method: 'post',
      data:route
    })
  }

}
