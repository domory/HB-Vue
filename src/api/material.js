import request from '@/utils/request'

export default {
  getMaterialList(size,page,query){
    return request({
      url:'/plm/material/condition/'+page+'/'+size,
      method: 'post',
      data:query
    })
  },
  add(material){
    return request({
      url:'/plm/material/addMaterial/',
      method: 'post',
      data:material
    })
  },
  //数据回显
  getMaterialById(id){
    return request({
      url:'/plm/material/getMaterialInfoById/'+id,
      method: 'get',

    })
  },
  updateMaterial(material){
    return request({
      url:'/plm/material/updateMaterialById/',
      method: 'post',
      data:material
    })
  },
  deleteMaterialById(id){
    return request({
      url:'/plm/material/deleteById/'+id,
      method: 'delete',

    })
  }
}
