<template>
  <div>
    <el-table
      :data="dispatchlist"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{  scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="equipId" label="设备名称" />
      <el-table-column prop="productionlineId" label="生产线名称" />

      <el-table-column prop="state" label="设备状态" />
      <el-table-column prop="applyName" label="申请人姓名" />
      <el-table-column prop="applyTime" label="申请时间" />
      <el-table-column prop="note" label="备注" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="checkById(scope.row.equipId)">通过</el-button>
          <el-button type="danger" size="mini" icon="el-icon-edit" @click="checkById2(scope.row.equipId)">不通过</el-button>
        </template>
      </el-table-column>
    </el-table>


  </div>
</template>

<script>
  import equ from '@/api/equip'
  export default {
    name: "check",
    data(){
      return{
        dispatchlist:null,
        dialogFormVisible1:false,
        // dispatch:{
        //   equipId:null,
        //   productionlineId:null,
        //   applyName:null,
        //   applyTime:null,
        //   state:null,
        //   note:null
        // },

      }
    },
    created() {
      this.getDispatchList()
    },
    methods:{
      getDispatchList(){
        equ.getList()
          .then((response)=>{
            this.dispatchlist=response.data.list
            //console.log(this.list)
          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '数据没了，请刷新！'
            })
          })
      },
      //审核通过
      checkById(id){
        //alert(id)
        equ.updateDispatch(id)
          .then(()=>{
            return  this.$message({
              type: 'success',
              message: '审核成功!'
            })
          })
          .then(()=>{
            this.getDispatchList()
          })
          .catch(()=>{
            return  this.$message({
              type: 'error',
              message: '添加失败!'
            });
          })
        },
      //不通过
      checkById2(id){
        equ.updateUnsuccess(id)
          .then(()=>{
            return  this.$message({
              type: 'success',
              message: '审核成功!'
            })
          })
          .then(()=>{
            this.getDispatchList()
          })
          .catch(()=>{
            return  this.$message({
              type: 'error',
              message: '添加失败!'
            });
          })
      }

    }
  }
</script>

<style scoped>

</style>
