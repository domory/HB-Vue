<template>
  <div>
    <router-link :to="'/product/list/'">  <!-- 点击按钮 跳转到产品列表页面-->
      <el-button type="primary" round  size="small" icon="el-icon-plus" >返回</el-button>
    </router-link>
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
          <el-button type="primary" round  size="small" icon="el-icon-circle-plus-outline" @click="dialogFormVisible=true;addMaterialOfProduct(scope.row.materialId)">添加</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加弹框-->
    <el-dialog :visible.sync="dialogFormVisible"  title="">
      <el-form :model="mAndP"    label-width="120px">
        <el-form-item label="数量">
          <el-input-number v-model="mAndP.amount" :min="0" :precision="2" :step="0.1" ></el-input-number>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="mAndP.unit"/>
<!--          <el-select v-model="mAndP.unit" placeholder="请选择">-->
<!--            <el-option label="g" value="g"> </el-option>-->
<!--            <el-option label="kg" value="kg"> </el-option>-->
<!--            <el-option label="t" value="t"></el-option>-->
<!--          </el-select>-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate()">确 定</el-button>
      </div>
    </el-dialog>

    <!--分页-->
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
  import product from '@/api/product'
  export default {
    name: 'addMaterialOfProduct',
    data()
    {
      return {
        dialogFormVisible: false,
        total: 0, // 总记录数
        page: 1, // 当前页码
        size: 9, // 每页记录数
        searchObj: {},// 查询条件
        list: null,
        mAndP:{
          productId:null,
          amount:null,
          unit:null,
          materialId:null,
          id:null,
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
      addMaterialOfProduct(id){//拿到产品和原料id
        this.mAndP.productId=this.$route.params.id
        this.mAndP.materialId=id
        this.mAndP.amount=null
        this.mAndP.unit=null
        product.getMP(this.mAndP.materialId,this.mAndP.productId)
          .then((response)=>{
            console.log(response.data.data.id)
            if(response.data.data.id!=null){//有配方表的id
             // alert(1)
              this.mAndP=response.data.data
            }
          })
          .catch(() =>{
            this.mAndP.productId=this.$route.params.id
            this.mAndP.materialId=id
            this.mAndP.amount=null
            this.mAndP.unit=null
            this.mAndP.id=null
          })
      },
      addOrUpdate(){
        if(this.mAndP.id!=null){
            this.update()
        }else {
          this.add()
        }
      },
      update(){//更改配方
        product.updateMP(this.mAndP)
          .then(()=>{
              this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.dialogFormVisible=false
            this.getMaterialList()//重新获得列表
          })
          .catch(()=>{
            return  this.$message({
              type: 'error',
              message: '添加失败!'
            });
          })
      },
      add(){//添加配方
        console.log(this.mAndP)

        product.addMP(this.mAndP)
          .then(()=>{
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.dialogFormVisible=false
            this.getMaterialList()//重新获得列表
          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '添加失败，请重试！'
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>
