import request from '@/utils/request'

export default {
  getEquipList(){
    return request({
      url: '/equ/equipment/getList',
      method: 'get',
    })
  },
  getEquipById(id){
    return request({
      url: '/equ/equipment/getEquById/'+id,
      method: 'get',
    })
  },
  updateEquip(equip){
    return request({
      url: '/equ/equipment/updateEquById',
      method: 'post',
      data:equip
    })
  },
  deleteEquipById(id){
    return request({
      url: '/equ/equipment/deleteById/'+id,
      method: 'delete',
    })
  },
  //获得生产线信息 productlineList
  getproductionlineList(){
    return request({
      url: '/equ/productionline/productlineList',
      method: 'get',
    })
  },
  addDispatch(dispatch){
    return request({
      url:'/equ/dispatch/add',
      method: 'post',
      data:dispatch
    })
  },


  //获得调度申请列表
  getList(){
    return request({
      url: '/equ/dispatch/getList',
      method: 'get',
    })
  },
  //审核通过
  updateDispatch(id){
    return request({
      url: '/equ/dispatch/updateById/'+id,
      method: 'post',
    })
  },
  //审核不通过
  updateUnsuccess(id){
    return request({
      url: '/equ/dispatch/failupdateById/'+id,
      method: 'post',
    })
  }

  // //获得某个设备的调度信息
  // getDispatchById(id){
  //   return request({
  //     url: '/equ/dispatch/getDispatchById/'+id,
  //     method: 'get',
  //   })
  // }


}
