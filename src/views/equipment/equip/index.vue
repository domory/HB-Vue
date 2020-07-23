<template>
<div>

  <el-table
    :data="list"
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
    <el-table-column prop="equipmentName" label="设备名称" />
    <el-table-column prop="equipmentType" label="设备所属类型" />
    <el-table-column prop="equipmentLocation" label="设备位置" />
    <el-table-column prop="equipmentCapacity" label="设备产能" />
    <el-table-column prop="equipmentUnit" label="产能单位" />
    <el-table-column prop="equipmentState" label="设备状态" />
    <el-table-column prop="equipmentTime" label="设备到场日期" />
    <el-table-column label="操作" width="200" align="center">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="dialogFormVisible1=true;updateById(scope.row.id)">修改</el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog :visible.sync="dialogFormVisible1"  title="修改设备信息">
    <el-form :model="equip"    label-width="120px">
      <el-form-item label="设备名称">
        <el-input v-model="equip.equipmentName"/>
      </el-form-item>

      <el-form-item label="设备类型">
        <el-input v-model="equip.equipmentType"/>
      </el-form-item>

      <el-form-item label="设备产能">
        <el-input v-model="equip.equipmentCapacity"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible1 = false">取 消</el-button>
      <el-button type="primary" @click="updateLine()">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import equ from '@/api/equip'
  export default {
    name: "index",
    data(){
      return {
        dialogFormVisible1:false,
        list: null,
        equip:{
          equipmentName:null,
          equipmentType:null,
          equipmentCapacity:null
        }
      }
    },
    created() {
      this.getEquipList();
    },
    methods:{
      getEquipList(){
        equ.getEquipList()
          .then((response)=>{
            this.list=response.data.list
            //console.log(this.list)
          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '数据没了，请刷新！'
            })
          })
      },
      updateById(id){
        equ.getEquipById(id)
          .then((response)=>{
            this.equip=response.data.data
            //console.log(this.equip)

          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '获取数据错误，请刷新！'
            })
          })
      },
      updateLine(){
        equ.updateEquip(this.equip)
          .then(()=>{
            return  this.$message({
              type: 'success',
              message: '修改成功!'
            })
          })
          .then(()=>{
            this.dialogFormVisible1=false
            this.getEquipList()
          })
          .catch(()=>{
            return  this.$message({
              type: 'error',
              message: '添加失败!'
            });
          })
      },
      removeDataById(id){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            return equ.deleteEquipById(id)//删除信息
          })
          .then(() => {
            this.getEquipList()  //重新获得列表
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch((response) => {
          if (response === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
      }
    }

  }
</script>

<style scoped>

</style>
