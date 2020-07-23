<template>
  <div>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.materialName" placeholder="原料名称"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.type" placeholder="原料种类"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getMaterialList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

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
        <el-table-column prop="materialName" label="原料名称" />
        <el-table-column prop="standards" label="原料规格" />
        <el-table-column prop="color" label="原料颜色" />
        <el-table-column prop="type" label="原料种类" />
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="primary" round  size="small" icon="el-icon-edit" @click="dialogFormVisible=true;updateById(scope.row.materialId)"></el-button>
            <el-button type="danger" round size="small" icon="el-icon-delete" @click="removeDataById(scope.row.materialId)"></el-button>
          </template>
        </el-table-column>
      </el-table>

    <!--修改弹框-->
    <el-dialog :visible.sync="dialogFormVisible"  title="修改原料">
      <el-form :model="material"    label-width="120px">
        <el-form-item label="原料名称">
          <el-input v-model="material.materialName"/>
        </el-form-item>
        <el-form-item label="原料规格">
          <el-input v-model="material.standards"/>
        </el-form-item>
        <el-form-item label="原料颜色">
          <el-input v-model="material.color"/>
        </el-form-item>
        <el-form-item label="原料种类">
          <el-input v-model="material.type"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatematerial()">确 定</el-button>
      </div>
    </el-dialog>

    <!--  分页-->
<!--    <el-pagination-->
<!--      @current-change="getMaterialList"-->
<!--      :current-page="page"-->
<!--      :page-size="size"-->
<!--      layout="total, prev, pager, next, jumper"-->
<!--      :total="total">-->
<!--    </el-pagination>-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getMaterialList"
      :current-page="page"
      :page-sizes="[9, 20, 30]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import material from '@/api/material'
  export default {
    name: 'index',
    data(){
      return{
        dialogFormVisible:false,
        total: 0, // 总记录数
        page: 1, // 当前页码
        size: 9, // 每页记录数
        searchObj: {},// 查询条件
        list:null,
        material: {
          materialName: null,
          standards: null,
          color: null,
          type: null
        }
      }
    },
    created() {
      this.getMaterialList()
    },
    methods:{
      handleSizeChange(val) {
        this.size=val
        this.getMaterialList()
      },
      getMaterialList(page=1){
        this.page=page,
        material.getMaterialList(this.size,this.page,this.searchObj)
          .then((response)=>{
            this.list=response.data.list,
              this.total=response.data.total
          })
          .catch(() =>{
            this.$message({
              type: 'info',
              message: '数据没了，请刷新！'
            });
          })
      },
      resetData(){
        this.searchObj={},
          this.getMaterialList()
      },
      //数据回显
      updateById(id){
        material.getMaterialById(id)
          .then((response)=>{
            this.material=response.data.data
          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '获取数据错误，请刷新！'
            })
          })
      },
      updatematerial(){
        material.updateMaterial(this.material)
          .then(()=>{
            return  this.$message({
              type: 'success',
              message: '修改成功!'
            })
          })
          .then(()=>{
            this.dialogFormVisible=false
            this.getMaterialList()
          })
          .catch(()=>{
            return  this.$message({
              type: 'error',
              message: '添加失败!'
            });
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
            return material.deleteMaterialById(id)//删除信息
          })
          .then(() => {
            this.getMaterialList()  //重新获得列表
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
    }
  }
</script>

<style scoped>

</style>
