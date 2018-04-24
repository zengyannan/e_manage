<template>
 <div>
<<<<<<< HEAD
主页
 </div>
</template>
<script>
=======
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
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handaleLook(scope.row)" type="text" >查看</el-button>
        <el-button @click="handleEdit(scope.row)" type="text" >编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
      background
      >
    </el-pagination>
  </div>
  </div>
</template>
<script>
import {getAllMenu} from '../api/menu'
export default {
  created(){
    getAllMenu({pageNum:this.pageNum,pageSize:this.pageSize}).then(res=>{
      this.menus=res.data.list;
      this.pageNum=res.data.pageNum;
      this.pageSize=res.data.pageSize;
      this.total=res.data.total;
    });
  },
  methods:{
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    handleCurrentChange(val) {
        this.pageNum=val;
        getAllMenu({pageNum:this.pageNum,pageSize:this.pageSize}).then(res=>{
        this.menus=res.data.list;
        // this.pageNum=res.data.pageNum;
        // this.pageSize=res.data.pageSize;
        this.total=res.data.total;
    });
    },
    handaleLook(val){
      console.log(val);
    },
    handleEdit(val){
      console.log(val);
    }
  },
  data(){
    return {
      pageNum: 1,
      total:0,
      pageSize:10,
      menus:[]
    }
  }
}
>>>>>>> 50842c368ee1ef0a2b23f76d57ad9d5e4cacb250
</script>
