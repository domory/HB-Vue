<template>
  <div>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.productName" placeholder="成品名称"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.productType" placeholder="成品种类"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getProductList()">查询</el-button>
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
      <el-table-column prop="productName" label="成品名称" />
      <el-table-column prop="productStandards" label="成品规格" />
      <el-table-column prop="productColor" label="成品颜色" />
      <el-table-column prop="productType" label="成品种类" />
      <el-table-column label="操作" width="400" align="center">
        <template slot-scope="scope">
          <el-button type="primary" round  size="small" icon="el-icon-edit" @click="dialogFormVisible=true;updateById(scope.row.productId)"></el-button>
          <router-link :to="'/product/addMaterial/'+scope.row.productId">  <!-- 点击按钮 跳转到添加页面-->
                <el-button type="primary" round  size="small" icon="el-icon-plus" >添加原料</el-button>
          </router-link>
          <el-button type="primary" round  size="small" icon="el-icon-view" @click="dialogFormVisible1=true;getMaterial(scope.row.productId)">查看原料</el-button>
          <el-button type="danger" round size="small" icon="el-icon-delete" @click="removeDataById(scope.row.productId)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--修改弹框-->
    <el-dialog :visible.sync="dialogFormVisible"  title="修改原料">
      <el-form :model="product"    label-width="120px">
        <el-form-item label="成品名称">
          <el-input v-model="product.productName"/>
        </el-form-item>
        <el-form-item label="成品规格">
          <el-input v-model="product.productStandards"/>
        </el-form-item>
        <el-form-item label="成品颜色">
          <el-input v-model="product.productColor"/>
        </el-form-item>
        <el-form-item label="成品种类">
          <el-input v-model="product.productType"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateproduct()">确 定</el-button>
      </div>
    </el-dialog>

    <!--    产品的配方信息-->
    <el-dialog :visible.sync="dialogFormVisible1"  title="">
      <el-table :data="MP" border fit highlight-current-row>
        <el-table-column prop="materialName" label="原料名称" />
        <el-table-column prop="amount" label="数量" />
        <el-table-column prop="unit" label="单位" />
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button type="danger" @click="deleteMP(scope.row.materialId,scope.row.productId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      @current-change="getProductList"
      :current-page="page"
      :page-sizes="[9, 20, 30]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import product from '@/api/product'
  export default {
    name: 'index',
    data(){
      return{
        dialogFormVisible1:false,
        dialogFormVisible:false,
        total: 0, // 总记录数
        page: 1, // 当前页码
        size: 9, // 每页记录数
        searchObj: {},// 查询条件
        list:null,
        product:{
          productName:null,
          productStandards:null,
          productColor:null,
          productType:null,
        },
        MP:null,//配方
      }
    },
    created() {
      this.getProductList()
    },
    methods:{
      deleteMP(materialId,productId){
       // alert(materialId)
       //  alert(productId)
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            return  product.deleteMP(materialId,productId)//删除信息
          })
          .then(() => {
             this.getMaterial(productId)  //重新获得列表
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
      getMaterial(productId){
        product.getMandP(productId)
          .then((response)=>{
            this.MP=response.data.list
            console.log(this.list)
          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '数据没了，请刷新！'
            })
          })
      },
      handleSizeChange(val) {
        this.size=val
        this.getProductList()
      },
      getProductList(page=1){
        this.page=page,
          product.getProductList(this.size,this.page,this.searchObj)
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
        this.searchObj={}
        this.getProductList()
      },
      updateById(id){
        product.getProductById(id)
          .then((response)=>{
            this.product=response.data.data
          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '获取数据错误，请刷新！'
            })
          })
      },
      updateproduct(){
        product.updateProduct(this.product)
          .then(()=>{
            return  this.$message({
              type: 'success',
              message: '修改成功!'
            })
          })
          .then(()=>{
            this.dialogFormVisible=false
            this.getProductList()
          })
          .catch(()=>{
            return  this.$message({
              type: 'error',
              message: '添加失败!'
            });
          })
      },
      //删除产品
      removeDataById(id){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            return product.deleteProductById(id)//删除信息
          })
          .then(() => {
            this.getProductList()  //重新获得列表
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
