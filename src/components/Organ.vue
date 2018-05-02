<template>
<div>
<el-col :span="24" style="text-align:right;">
<<<<<<< HEAD
 <el-button style="margin:7px;"  @click="handleInsert">添加器官病症项</el-button>
=======
 <el-button style="margin:7px;"  @click="handleInsert">增加器官项</el-button>
>>>>>>> 649502967aece8873c6c5ca43a0bbabf6f858ab5
 </el-col>
 <el-table
      :data="organs"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="英文名字"
      >
      </el-table-column>
      <el-table-column
        prop="zhName"
        label="中文名字"
        >
      </el-table-column>
      <el-table-column
        prop="status"
        label="是否可用"
        width="180"
        :formatter="fmtStatus"
        >
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="text" >编辑</el-button>
        <el-button @click="handleDelete(scope.row)" type="text" >删除</el-button>
      </template>
     </el-table-column>
</el-table>
<div class="block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="pageSize" layout="total, prev, pager, next" :total="total" background>
    </el-pagination>
</div>


<!--新增对话框-->
<el-dialog title="新增" :visible.sync="dialogInsertVisible">
    <el-form :model="currentOrgan" ref="currentOrganInsertForm" label-position="left">
        <el-form-item label="英文名">
            <el-input v-model="currentOrgan.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="中文名">
            <el-input v-model="currentOrgan.zhName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用">
            <el-select v-model="currentOrgan.status" placeholder="请选择">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInsertVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogInsert">确 定</el-button>
    </div>
</el-dialog>
<!--新增对话框结束-->

<!--修改对话框-->
<el-dialog title="修改" :visible.sync="dialogEditVisible">
    <el-form :model="currentOrgan" ref="currentOrganEditForm" label-position="left">
        <el-form-item label="英文名">
            <el-input v-model="currentOrgan.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="中文名">
            <el-input v-model="currentOrgan.zhName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用">
            <el-select v-model="currentOrgan.status" placeholder="请选择">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogEdit">确 定</el-button>
    </div>
</el-dialog>
<!--修改对话框结束-->


</div>
</template>
<script>
import {
        getOrganList,
        insertOrgan,
        updateOrgan,
        deleteOrgan
    } from '../api/organ';
export default {
  created() {
            getOrganList({
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                this.organs = res.data.list;
                this.pageNum = res.data.pageNum;
                this.pageSize = res.data.pageSize;
                this.total = res.data.total;
            });
        },
        methods: {
            loadOrganList() {
                getOrganList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.organs = res.data.list;
                    this.pageNum = res.data.pageNum;
                    this.pageSize = res.data.pageSize;
                    this.total = res.data.total;
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //响应分页点击事件
            handleCurrentChange(val) {
                this.pageNum = val;
                getOrganList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.organs = res.data.list;
                    // this.pageNum=res.data.pageNum;
                    // this.pageSize=res.data.pageSize;
                    this.total = res.data.total;
                });
            },
            handleInsert(){
                this.dialogInsertVisible=true;
                this.currentOrgan = {};
            },
            handleDialogInsert(){
                insertOrgan(this.currentOrgan).then(res => {
                    this.dialogInsertVisible = false;
                    let {
                        meta,
                        data
                    } = res;
                    if (meta.success === false) {
                        this.$message.error(meta.message);
                    } else {
                        this.$message({
                            message: "操作成功",
                            type: 'success'
                        });
                        this.loadOrganList();
                        this.currentOrgan = {};
                    }
                });
            },
            handleEdit(val){
                this.currentOrgan = JSON.parse(JSON.stringify(val));
                this.dialogEditVisible = true;
            },
            handleDialogEdit(){
                updateOrgan(this.currentOrgan).then(res => {
                    this.dialogEditVisible = false;
                    let {
                        meta,
                        data
                    } = res;
                    if (meta.success === false) {
                        this.$message.error(meta.message);
                    } else {
                        this.$message({
                            message: "操作成功",
                            type: 'success'
                        });
                        this.loadOrganList();
                        this.currentOrgan = {};
                    }
                });
            },
            handleDelete(val){
<<<<<<< HEAD
                this.$confirm('此操作将永久删除该病症, 是否继续?', '提示', {
=======
                this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
>>>>>>> 649502967aece8873c6c5ca43a0bbabf6f858ab5
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteOrgan({
                        id: val.id
                    }).then(res => {
                        let {
                            meta,
                            data
                        } = res;
                        if (meta.success === false) {
                            this.$message.error(meta.message);
                        } else {
                            this.$message({
                                message: "删除成功",
                                type: 'success'
                            });
                            this.loadOrganList();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            fmtStatus(row, column) {
                const status = row[column.property]
                if (status == 2) {
                    return '禁用';
                } else if (status == 1) {
                    return '可用';
                }
            }
        },
        data() {
            return {
                pageNum: 1,
                total: 0,
                pageSize: 5,
                organs: [],
                dialogEditVisible: false,
                dialogInsertVisible: false,
                dialogSetMenuVisible: false,
                currentOrgan: {},
                statusOptions: [{
                    value: 1,
                    label: '可用'
                }, {
                    value: 2,
                    label: '禁用'
                }],
            }
        }
}
</script>
