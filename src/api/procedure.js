import request from '@/utils/request'

export default {

  getAllprocedureInfo(){
    return request({
      url:'/plm/workingprocedure/procedureList',
      method: 'get',
    })
  },
  //添加工序
  addProcedure(procedure){
    return request({
      url:'/plm/workingprocedure/addProcedure',
      method: 'post',
      data:procedure
    })
  },
  //删除工序
  deleteProcedureById(id){
    return request({
      url:'/plm/workingprocedure/deleteProcedureById/'+id,
      method: 'delete',
    })
  },
  //根据id查询工序信息 getProcedureInfoById
  getProcedureInfoById(id){
    return request({
      url:'/plm/workingprocedure/getProcedureInfoById/'+id,
      method: 'get',
    })
  },
  //更新工序信息  updateProcedureById
  updateProcedure(procedure){
    return request({
      url:'/plm/workingprocedure/updateProcedureById/',
      method: 'post',
      data:procedure
    })
  },
  //查询工序下的生产线信息
  getLineInfo(id){
    return request({
      url:'/plm/workingprocedure/getProductionLineInfo/'+id,
      method: 'get',
    })
  }


}
