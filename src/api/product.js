import request from '@/utils/request'

export default {
  add(product){
    return request({
      url:'/plm/product/addProduct/',
      method: 'post',
      data:product
    })
  },
  getProductList(size,page,query){
    return request({
      url:'/plm/product/condition/'+page+'/'+size,
      method: 'post',
      data:query
    })
  },
  getProductById(id){
    return request({
      url:'/plm/product/getProductInfoById/'+id,
      method: 'get',
    })
  },
  updateProduct(product){
    return request({
      url:'/plm/product/updateProductById/',
      method: 'post',
      data:product
    })
  },
  deleteProductById(id){
    return request({
      url:'/plm/product/deleteById/'+id,
      method: 'delete',
    })
  },
  //为产品添加对应的原料（配方）
  addMP(mp){
    return request({
      url:'/plm/product/addMaterialOfProduct/',
      method: 'post',
      data:mp
    })
  },
  //更新配方信息
  updateMP(mp){
    return request({
      url:'/plm/product/updateMaterialOfProduct/',
      method: 'post',
      data:mp
    })
  },
  //根据产品和原料id获得配方
  getMP(mid,pid){
    return request({
      url:'/plm/product/getMP/'+mid+'/'+pid,
      method: 'get',
    })
  },
  //查询产品对应的配方
  getMandP(pid){
    return request({
      url:'/plm/product/getMPByProductId/'+pid,
      method: 'get',
    })
  },
  //删除产品的某一配方 delMP/{mid}/{pid}
  deleteMP(mid,pid){
    return request({
      url:'/plm/product/delMP/'+mid+'/'+pid,
      method: 'delete',
    })  }
}
