<template>
<div>
  <el-form  label-width="80px" :model="material" style="width: 40%;">
    <el-form-item label="原料名称">
      <el-input v-model="material.materialName" ></el-input>
    </el-form-item>
    <el-form-item label="原料规格">
      <el-input v-model="material.standards" ></el-input>
    </el-form-item>
    <el-form-item label="原料颜色">
      <el-input v-model="material.color"></el-input>
    </el-form-item>
    <el-form-item label="原料种类">
      <el-input v-model="material.type"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即添加</el-button>
      <el-button @click="reset">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  import material from '@/api/material'
  export default {
    name: 'add',
    data() {
      return {
        material: {
          materialName: null,
          standards: null,
          color: null,
          type: null
        }
      }
    },
    methods:{
      onSubmit(){
        material.add(this.material)
          .then(()=>{
            console.log(this.material)
            return  this.$message({
              type: 'success',
              message: '添加成功!'
            })
          })
          .then(()=>{
            this.$router.push('/material/list')
          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '添加失败，请重试！'
            })
          })
      },
      reset(){
        this.material.color=null,
        this.material.materialName=null,
        this.material.standards=null,
        this.material.type=null
      }
    }
  }
</script>

<style scoped>

</style>
