<template>
<div>
  <el-button type="primary" size="mini" round icon="el-icon-plus" @click="dialogFormVisible=true;showaddRoute()" style="font-size: 13px">添加工艺线路</el-button>
<!--  <el-button type="primary" plain @click="dialogFormVisible=true;addRoute()">添加工艺线路</el-button>-->
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
    <el-table-column prop="routeName" label="工艺线路名称" />
    <el-table-column prop="routeDescript" label="工艺线路描述" />
    <el-table-column label="操作" width="200" align="center">
      <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="dialogFormVisible1=true;showupdateById(scope.row.id)">修改</el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--添加弹框-->
  <el-dialog :visible.sync="dialogFormVisible"  title="添加分类">
    <el-form :model="route"    label-width="120px">
      <el-form-item label="工艺线路名称">
        <el-input v-model="route.routeName"/>
      </el-form-item>
      <el-form-item label="工艺线路描述">
        <el-input v-model="route.routeDescript"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addRoute()">确 定</el-button>
    </div>
  </el-dialog>
  <!--修改弹框-->
  <el-dialog :visible.sync="dialogFormVisible1"  title="修改分类">
    <el-form :model="route"    label-width="120px">
      <el-form-item label="工艺线路名称">
        <el-input v-model="route.routeName"/>
      </el-form-item>
      <el-form-item label="工艺线路描述">
        <el-input v-model="route.routeDescript"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible1 = false">取 消</el-button>
      <el-button type="primary" @click="updateRoute()">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
  import route from '@/api/route'
  export default {
    name: "index",
    data(){
      return{
        dialogFormVisible:false,
        dialogFormVisible1:false,
        list:null,
        route:{
          routeName:null,
          routeDescript:null,
          id:null
        }
      }
    },
    created(){
      this.routeList();
    },
    methods:{
      routeList(){
        route.getRouteList()
          .then( response => {
            this.list=  response.data.list

          })
          .catch(  () =>{
            this.$message({
              type: 'info',
              message: '数据没了，请刷新！'
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
            return  route.deleteRouteInfoById(id)//删除信息
          })
          .then(() => {
            this.routeList()  //重新获得列表
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
    //修改线路信息 数据回显
      showupdateById(id){
        route.getRouteById(id)
          .then((response)=>{
            this.route=response.data.route
          })
      },
      updateRoute(){
          route.updateRouteById(this.route)
            .then(()=>{
              return  this.$message({
                type: 'success',
                message: '修改成功!'
              })

            })
            .then(()=>{
              this.dialogFormVisible1=false
              this.routeList()
            })
            .catch(()=>{
              return  this.$message({
                type: 'error',
                message: '添加失败!'
              });
            })
      },
      //弹框显示
      showaddRoute(){
        this.route.routeName=null;
        this.route.routeDescript=null;
        this.route.id=null;
      },
      //添加路线
      addRoute(){
        route.addRoute(this.route)
          .then(() => {
            return  this.$message({
              type: 'success',
              message: '添加成功!'
            })
          })
          .then(()=>{
            this.dialogFormVisible=false
            this.routeList()
          })
          .catch(() =>{
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
