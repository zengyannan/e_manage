<template>
<div>
<el-col :span="24" style="text-align:right;">
 <el-button style="margin:7px;"  @click="handleInsert">添加检测指标</el-button>
 </el-col>
 <el-table
      :data="inspections"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="英文简称"
      >
      </el-table-column>
      <el-table-column
        prop="zhName"
        label="检测项目"
        >
      </el-table-column>
      <el-table-column
        prop="organ.zhName"
        label="所属器官病症"
        >
      </el-table-column>
      <el-table-column
        prop="checkAddress"
        label="检验地点"
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
    <el-form :model="currentInspection" ref="currentInspectionInsertForm" label-position="left">
        <el-form-item label="英文">
            <el-input v-model="currentInspection.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称">
            <el-input v-model="currentInspection.zhName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="检验地点">
            <el-input v-model="currentInspection.checkAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属器官病症">
            <el-select v-model="currentInspection.organId" placeholder="请选择">
                <el-option v-for="item in organs" :key="item.id" :label="item.zhName" :value="item.id">
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
    <el-form :model="currentInspection" ref="currentInspectionEditForm" label-position="left">
        <el-form-item label="英文">
            <el-input v-model="currentInspection.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称">
            <el-input v-model="currentInspection.zhName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="检验地点">
            <el-input v-model="currentInspection.checkAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属器官病症">
            <el-select v-model="currentInspection.organId" placeholder="请选择">
                <el-option v-for="item in organs" :key="item.id" :label="item.zhName" :value="item.id">
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
        getInspectionList,
        insertInspection,
        updateInspection,
        deleteInspection,
    } from '../api/inspection';
    import {
        getAllOrgan
    } from '../api/organ';
    export default {
        created() {
            getInspectionList({
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                this.inspections = res.data.list;
                this.pageNum = res.data.pageNum;
                this.pageSize = res.data.pageSize;
                this.total = res.data.total;
            });
        },
        methods: {
            loadInspectionList() {
                getInspectionList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.inspections = res.data.list;
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
                getInspectionList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.inspections = res.data.list;
                    // this.pageNum=res.data.pageNum;
                    // this.pageSize=res.data.pageSize;
                    this.total = res.data.total;
                });
            },
            handleEdit(val){
                this.currentInspection = JSON.parse(JSON.stringify(val));
                this.dialogEditVisible = true;
                getAllOrgan().then(res => {
                    this.organs = res.data;
                });
            },
            handleDialogEdit(){
                updateInspection(this.currentInspection).then(res => {
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
                        this.loadInspectionList();
                        this.currentInspection = {};
                    }
                });
            },
            handleDelete(val){
                this.$confirm('此操作将永久删除该检验科目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteInspection({
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
                            this.loadInspectionList();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleInsert() {
                this.dialogInsertVisible = true;
                this.currentInspection = {};
                getAllOrgan().then(res => {
                    this.organs = res.data;
                });
            },
            handleDialogInsert(){
                insertInspection(this.currentInspection).then(res => {
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
                        this.loadInspectionList();
                        this.currentInspection = {};
                    }
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
                inspections: [],
                organs: [],
                dialogEditVisible: false,
                dialogInsertVisible: false,
                dialogSetMenuVisible: false,
                currentInspection: {},
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