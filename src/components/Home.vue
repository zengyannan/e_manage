<template>
   <el-container>
      <banner />
      <el-container>
      <leftMenu></leftMenu>
      <el-main>
        <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" >
        </el-table-column>
      </el-table>
      </el-main>
      </el-container>
       <el-footer></el-footer>
    </el-container>
</template>

<script>
import leftMenu from './LeftMenu'
import banner from './Banner'
export default {
  components:{leftMenu,banner},
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    },
    fuck(){
      this.$notify.error({
        title:'fuck that',
        type:'danger',
        message:'no some message',
        duration:3000,
        position: 'top-left'
      })
    }
  }
  ,data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
}
</script>
