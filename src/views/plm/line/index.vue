<template>
  <div>
    <el-button type="primary" size="mini" round icon="el-icon-plus" @click="showaddLine()" style="font-size: 13px">添加生产线</el-button>
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
    <el-table-column prop="productionLineName" label="生产线名称" />
    <el-table-column prop="productionLineState" label="生产线状态" />
    <el-table-column prop="capacity" label="生产线产能" />
    <el-table-column prop="capacityUnit" label="产能单位" />
    <el-table-column label="操作" width="200" align="center">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="dialogFormVisible1=true;updateById(scope.row.productionLineId)">修改</el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.productionLineId)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    <!--添加弹框-->
    <el-dialog :visible.sync="dialogFormVisible"  title="添加生产线">
      <el-form :model="productionLine"    label-width="120px">
        <el-form-item label="生产线名称">
          <el-input v-model="productionLine.productionLineName"/>
        </el-form-item>
        <el-form-item label="所属工序名称">
          <el-select v-model="productionLine.procedureId"  placeholder="请选择工序名称">
            <el-option
              v-for="procedure in procrdureList"
              :key="procedure.procedureId"
              :label="procedure.procedureName"
              :value="procedure.procedureId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLine()">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改弹框-->
    <el-dialog :visible.sync="dialogFormVisible1"  title="修改生产线">
      <el-form :model="productionLine"    label-width="120px">
        <el-form-item label="生产线名称">
          <el-input v-model="productionLine.productionLineName"/>
        </el-form-item>
        <el-form-item label="工序名称">
          <el-select v-model="productionLine.procedureId"  placeholder="请选择工序名称">
            <el-option
              v-for="procedure in procrdureList"
              :key="procedure.procedureId"
              :label="procedure.procedureName"
              :value="procedure.procedureId">
            </el-option>
          </el-select>
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
  import line from '@/api/productionline'
  import procedure from '@/api/procedure'
  export default {
    name: 'index',
    data(){
      return{
        dialogFormVisible:false,
        dialogFormVisible1:false,
        procrdureList:null,
        list:null,
        productionLine:{
          productionLineName:null,
          procedureId:null,
          productionLineId:null
        },
      }
    },
    created() {
      this.getProductionline()
      this.showProduceInfo()
    },
    methods:{
      getProductionline(){
        line.getProductionLine()
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

      showaddLine(){
        this.dialogFormVisible=true;
        this.productionLine.productionLineName=null,
        this.productionLine.procedureId=null,
        this.productionLine.productionLineId=null


      },
      showProduceInfo(){
        procedure.getAllprocedureInfo()
          .then((response)=>{
            this.procrdureList=response.data.list
            //console.log(this.list)
          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '获取数据错误，请刷新！'
            })
          })
      },

      addLine(){
        line.addProductionline(this.productionLine)
          .then(()=>{
            //console.log(this.productionLine)
            return  this.$message({
              type: 'success',
              message: '添加成功!'
            })
          })
          .then(()=>{
            this.dialogFormVisible=false
            this.getProductionline()
          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '添加失败，请重试！'
            })
          })
      },
      //数据回显
      updateById(id){
      //  alert(id)
        line.getProductionInfoById(id)
          .then((response)=>{
            this.productionLine=response.data.line
          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '获取数据错误，请刷新！'
            })
          })
      },
      updateLine(){
        line.updateproduction(this.productionLine)
          .then(()=>{
            return  this.$message({
              type: 'success',
              message: '修改成功!'
            })
          })
          .then(()=>{
            this.dialogFormVisible1=false
            this.getProductionline()
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
            return line.deleteLineInfo(id)//删除信息
          })
          .then(() => {
            this.getProductionline()  //重新获得列表
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
        });
      }





    }

  }
</script>

<style scoped>

</style>
