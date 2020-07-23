<template>
  <div>
    <el-form  label-width="100px" :model="dispatch" style="width: 40%;">
      <el-form-item label="设备名称">
        <el-select v-model="dispatch.equipId"  placeholder="请选择设备">
          <el-option
            v-for="equip in list"
            :key="equip.id"
            :label="equip.equipmentName"
            :value="equip.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="生产线名称">
        <el-select v-model="dispatch.productionlineId"  placeholder="请选择生产线">
          <el-option
            v-for="line in lineList"
            :key="line.productionLineId"
            :label="line.productionLineName"
            :value="line.productionLineId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请人姓名">
        <el-input v-model="dispatch.applyName" ></el-input>
      </el-form-item>
      <el-form-item label="申请时间">
<!--        <el-input v-model="dispatch.applyTime"></el-input>-->
        <el-date-picker
          v-model="dispatch.applyTime"
          type="datetime"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="dispatch.note"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即添加</el-button>
        <el-button @click="reset">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import equ from '@/api/equip'
  export default {
    name: "index",
    data(){
      return{
        list: [],
        lineList:[],
        dispatch:{
          equipId:null,
          productionlineId:null,
          applyName:null,
          applyTime:null,
          note:null
        }
      }
    },
    created() {
      this.getEquipList()
      this.getLineList()
    },
    methods:{
      reset(){
        this.dispatch.applyName=null,
        this.dispatch.applyTime=null,
        this.dispatch.note=null,
        this.dispatch.productionlineId=null,
        this.dispatch.equipId=null
      },
      //获得设备信息
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
      //获得生产线信息
      getLineList(){
        equ.getproductionlineList()
          .then((response)=>{
            this.lineList=response.data.list
            //console.log(this.dispatch)
          })
          .catch(()=>{
            this.$message({
              type: 'error',
              message: '数据没了，请刷新！'
            })
          })
      },
      submit(){
        equ.addDispatch(this.dispatch)
          .then(()=>{
            //console.log(this.product)
            return  this.$message({
              type: 'success',
              message: '添加成功!'
            })
          })
          .then(()=>{
            this.$router.push('/dispatch/forsure')
          })
          .catch((responce)=>{

            //alert(responce.message)
          })
      }
    }

  }
</script>

<style scoped>

</style>
