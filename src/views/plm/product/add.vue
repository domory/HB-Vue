<template>
  <div>
    <el-form  label-width="80px" :model="product" style="width: 40%;">
      <el-form-item label="成品名称">
        <el-input v-model="product.productName" ></el-input>
      </el-form-item>
      <el-form-item label="成品规格">
        <el-input v-model="product.productStandards" ></el-input>
      </el-form-item>
      <el-form-item label="成品颜色">
        <el-input v-model="product.productColor"></el-input>
      </el-form-item>
      <el-form-item label="成品种类">
        <el-input v-model="product.productType"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button @click="reset">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import product from '@/api/product'
  export default {
    name: 'add',
    data(){
      return{
        product:{
          productName:null,
          productStandards:null,
          productColor:null,
          productType:null,
        }
      }
    },
    methods:{
      onSubmit(){
        product.add(this.product)
          .then(()=>{
            console.log(this.product)
            return  this.$message({
              type: 'success',
              message: '添加成功!'
            })
          })
          .then(()=>{
            this.$router.push('/product/list')
          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '添加失败，请重试！'
            })
          })
      },
      reset(){
        this.product.productColor=null,
          this.product.productName=null,
          this.product.productStandards=null,
          this.product.productType=null
      }
    }
  }
</script>

<style scoped>

</style>
