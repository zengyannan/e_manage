<template>
 <el-table
      :data="menus"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名字"
        width="180">
      </el-table-column>
      <el-table-column
        prop="component"
        label="组件名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        label="url">
      </el-table-column>
    </el-table>
    </template>
<script>
import {getAllMenu} from '../api/menu'
export default {
  created(){
    getAllMenu().then(res=>{
      console.log(res.data);
      this.menus=res.data;
    });
  },
  methods:{

  },
  data(){
    return {
      menus:[]
    }
  }
}
</script>
