<template>
  <div>
    <el-button type="primary" size="mini" round icon="el-icon-plus" @click="showaddRoute()" style="font-size: 13px">添加工序</el-button>
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
      <el-table-column prop="procedureName" label="工序名称" />
      <el-table-column prop="procedureDecript" label="工序描述" />
      <el-table-column prop="routeName" label="工艺线路名称" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" round  size="small" icon="el-icon-edit" @click="dialogFormVisible1=true;updateById(scope.row.procedureId)"></el-button>

          <el-button type="info" round size="mini" @click="dialogFormVisible2=true;getLineInfo(scope.row.procedureId)">查看</el-button>
          <el-button type="danger" round size="small" icon="el-icon-delete" @click="removeDataById(scope.row.procedureId)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加弹框-->
    <el-dialog :visible.sync="dialogFormVisible"  title="添加分类">
      <el-form :model="procedure"    label-width="120px">
        <el-form-item label="工序名称">
          <el-input v-model="procedure.procedureName"/>
        </el-form-item>
        <el-form-item label="工序描述">
          <el-input v-model="procedure.procedureDecript"/>
        </el-form-item>
        <el-form-item label="工艺线路名称">
          <el-select v-model="procedure.routeId"  placeholder="请选择工艺线路">
            <el-option
              v-for="route in routeList"
              :key="route.id"
              :label="route.routeName"
              :value="route.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addprocedure()">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改弹框-->
    <el-dialog :visible.sync="dialogFormVisible1"  title="修改分类">
      <el-form :model="procedure"    label-width="120px">
        <el-form-item label="工序名称">
          <el-input v-model="procedure.procedureName"/>
        </el-form-item>
        <el-form-item label="工序描述">
          <el-input v-model="procedure.procedureDecript"/>
        </el-form-item>
        <el-form-item label="工艺线路名称">
          <el-select v-model="procedure.routeId"  placeholder="请选择工艺线路">
            <el-option
              v-for="route in routeList"
              :key="route.id"
              :label="route.routeName"
              :value="route.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="updateprocedure()">确 定</el-button>
      </div>
    </el-dialog>

<!--    工序下的生产线信息-->
    <el-dialog :visible.sync="dialogFormVisible2"  title="">
      <el-table :data="productionLineList"
                border
                fit
                highlight-current-row>
        <el-table-column prop="productionLineName" label="生产线名称" />
        <el-table-column prop="productionLineState" label="生产线状态" />
        <el-table-column prop="capacity" label="生产线产能" />
        <el-table-column prop="capacityUnit" label="产能单位" />
      </el-table>
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogFormVisible2 = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="updateLine()">确 定</el-button>-->
<!--      </div>-->
    </el-dialog>
  </div>
</template>

<script>
  import procedure from '@/api/procedure'
  import route from '@/api/route'
  export default {
    name: "index",
    data(){
      return{
        dialogFormVisible:false,
        dialogFormVisible1:false,
        dialogFormVisible2:false,
        list:null,
        procedure:{
          procedureName:null,
          procedureDecript:null,
          routeId:null,
          procedureId:null
        },
        routeList:[],
        productionLineList:null
      }
    },
    created() {
      this.getProcedureList();
      this.getRouteName()
    },
    methods:{
      getProcedureList(){
          procedure.getAllprocedureInfo()
            .then((response)=>{
              this.list=response.data.list
              console.log(this.list)
            })
            .catch(()=>{
              this.$message({
                type: 'error',
                message: '数据没了，请刷新！'
              })
            })
      },


      //数据回显
      updateById(id){
          procedure.getProcedureInfoById(id)
            .then((response)=>{
              this.procedure=response.data.procedure
            })
            .catch(()=>{
              this.$message({
                type: 'error',
                message: '获取数据错误，请刷新！'
              })
            })
      },
      //更新
      updateprocedure(){
        procedure.updateProcedure(this.procedure)
          .then(()=>{
            return  this.$message({
              type: 'success',
              message: '修改成功!'
            })
          })
          .then(()=>{
            this.dialogFormVisible1=false
            this.getProcedureList()
          })
          .catch(()=>{
            return  this.$message({
              type: 'error',
              message: '添加失败!'
            });
          })
      },


      showaddRoute(){
        this.dialogFormVisible=true;
          this.procedure.procedureName=null,
          this.procedure.procedureDecript=null,
          this.procedure.routeId=null,
          this.procedure.procedureId=null
          // this.getRouteName()
      },
      getRouteName(){
        route.getRouteList()
          .then((responce)=>{
            this.routeList=responce.data.list
          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '获取数据错误，请刷新！'
            })
          })
      },
      //添加工序
      addprocedure(){
        procedure.addProcedure(this.procedure)
          .then(()=>{
            console.log(this.procedure)
            return  this.$message({
              type: 'success',
              message: '添加成功!'
            })
          })
          .then(()=>{
            this.dialogFormVisible=false
            this.getProcedureList()
          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '添加失败，请重试！'
            })
          })
      },
      //删除工序
      removeDataById(id){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            return procedure.deleteProcedureById(id)//删除信息
          })
          .then(() => {
            this.getProcedureList()  //重新获得列表
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
      },
      //查询工序下的生产线信息  lineList
      getLineInfo(id){
        procedure.getLineInfo(id)

          .then((response)=>{
            this.productionLineList=response.data.lineList
            console.log(this.productionLineList)
          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '获取数据错误，请刷新！'
            })
          })
      }

    }
  }
</script>

<style scoped>

</style>
