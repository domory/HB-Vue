import request from '@/utils/request'

export default {
  //获得所有生产线列表
  getProductionLine(){
    return request({
      url: '/plm/productionline/list',
      method: 'get',
    })
  },
  //添加生产线
  addProductionline(Line){
    return request({
      url: '/plm/productionline/addLine',
      method: 'post',
      data:Line
    })
  },
  //根据id获取生产线信息
  getProductionInfoById(id){
    return request({
      url: '/plm/productionline/getProductionline/'+id,
      method: 'get',

    })
  },
  //更新生产线信息
  updateproduction(Line){
    return request({
      url: '/plm/productionline/updateLine',
      method: 'post',
      data:Line
    })
  },
  //删除生产线信息
  deleteLineInfo(id){
    return request({
      url: '/plm/productionline/deleteLine/'+id,
      method: 'delete',

    })
  }


}
