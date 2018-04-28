<template>
<div>
<el-col :span="24" style="text-align:right;">
 <el-button style="margin:7px;"  @click="handleInsert">添加具体检测指标</el-button>
 </el-col>
 <el-table
      :data="specifics"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="英文简称"
      >
      </el-table-column>
      <el-table-column
        prop="zhName"
        label="具体检测项目名"
        >
      </el-table-column>
      <el-table-column
        prop="inspection.zhName"
        label="所属检测科目"
        >
      </el-table-column>
      <el-table-column
        prop="unit"
        label="单位"
        >
      </el-table-column>
      <el-table-column
        prop="ref"
        label="浮动参考值"
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
    <el-form :model="currentSpecific" ref="currentSpecificInsertForm" label-position="left">
        <el-form-item label="英文简称">
            <el-input v-model="currentSpecific.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称">
            <el-input v-model="currentSpecific.zhName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位">
            <el-input v-model="currentSpecific.unit" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="浮动参考值">
            <el-input v-model="currentSpecific.ref" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属检验科目">
            <el-select v-model="currentSpecific.inspectionId" placeholder="请选择">
                <el-option v-for="item in inspections" :key="item.id" :label="item.zhName" :value="item.id">
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
    <el-form :model="currentSpecific" ref="currentSpecificEditForm" label-position="left">
        <el-form-item label="英文简称">
            <el-input v-model="currentSpecific.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称">
            <el-input v-model="currentSpecific.zhName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位">
            <el-input v-model="currentSpecific.unit" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="浮动参考值">
            <el-input v-model="currentSpecific.ref" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属检验科目">
            <el-select v-model="currentSpecific.inspectionId" placeholder="请选择">
                <el-option v-for="item in inspections" :key="item.id" :label="item.zhName" :value="item.id">
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
        getSpecificList,
        insertSpecific,
        updateSpecific,
        deleteSpecific,
    } from '../api/specific';
    import {
        getAllInspection
    } from '../api/inspection';
    export default {
        created() {
            getSpecificList({
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                this.specifics = res.data.list;
                this.pageNum = res.data.pageNum;
                this.pageSize = res.data.pageSize;
                this.total = res.data.total;
            });
        },
        methods: {
            loadSpecificList() {
                getSpecificList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.specifics = res.data.list;
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
                getSpecificList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.specifics = res.data.list;
                    // this.pageNum=res.data.pageNum;
                    // this.pageSize=res.data.pageSize;
                    this.total = res.data.total;
                });
            },
            handleEdit(val){
                this.currentSpecific = JSON.parse(JSON.stringify(val));
                this.dialogEditVisible = true;
                getAllInspection().then(res => {
                    this.inspections = res.data;
                });
            },
            handleDialogEdit(){
                updateSpecific(this.currentSpecific).then(res => {
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
                        this.loadSpecificList();
                        this.currentSpecific = {};
                    }
                });
            },
            handleDelete(val){
                this.$confirm('此操作将永久删除该检验指标, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteSpecific({
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
                            this.loadSpecificList();
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
                this.currentSpecific = {};
                getAllInspection().then(res => {
                    this.inspections = res.data;
                });
            },
            handleDialogInsert(){
                insertSpecific(this.currentSpecific).then(res => {
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
                        this.loadSpecificList();
                        this.currentSpecific = {};
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
                specifics: [],
                dialogEditVisible: false,
                dialogInsertVisible: false,
                dialogSetMenuVisible: false,
                currentSpecific: {},
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