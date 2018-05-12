<template>
<div>
<el-col :span="24" style="text-align:right;">
 <el-button style="margin:7px;"  @click="handleInsert">添加患者</el-button>
 </el-col>
 <el-table
      :data="patients"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="住址"
        >
      </el-table-column>
      <el-table-column
        prop="idCard"
        label="身份证号"
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
    <el-form :model="currentPatient" ref="currentPatientInsertForm" label-position="left">
        <el-form-item label="姓名">
            <el-input v-model="currentPatient.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
            <el-input v-model="currentPatient.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址">
            <el-input v-model="currentPatient.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
            <el-input v-model="currentPatient.idCard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用">
            <el-select v-model="currentPatient.status" placeholder="请选择">
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
    <el-form :model="currentPatient" ref="currentPatientEditForm" label-position="left">
       <el-form-item label="姓名">
            <el-input v-model="currentPatient.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
            <el-input v-model="currentPatient.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址">
            <el-input v-model="currentPatient.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
            <el-input v-model="currentPatient.idCard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用">
            <el-select v-model="currentPatient.status" placeholder="请选择">
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
        getPatientList,
        insertPatient,
        updatePatient,
        deletePatient
    } from '../api/patient';
export default {
  created() {
            getPatientList({
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                this.patients = res.data.list;
                this.pageNum = res.data.pageNum;
                this.pageSize = res.data.pageSize;
                this.total = res.data.total;
            });
        },
        methods: {
            loadPatientList() {
                getPatientList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.patients = res.data.list;
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
                getPatientList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.patients = res.data.list;
                    // this.pageNum=res.data.pageNum;
                    // this.pageSize=res.data.pageSize;
                    this.total = res.data.total;
                });
            },
            handleInsert(){
                this.dialogInsertVisible=true;
                this.currentPatient = {};
            },
            handleDialogInsert(){
                insertPatient(this.currentPatient).then(res => {
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
                        this.loadPatientList();
                        this.currentPatient = {};
                    }
                });
            },
            handleEdit(val){
                this.currentPatient = JSON.parse(JSON.stringify(val));
                this.dialogEditVisible = true;
            },
            handleDialogEdit(){
                updatePatient(this.currentPatient).then(res => {
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
                        this.loadPatientList();
                        this.currentPatient = {};
                    }
                });
            },
            handleDelete(val){
                this.$confirm('此操作将永久删除该患者账号, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deletePatient({
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
                            this.loadPatientList();
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
                patients: [],
                dialogEditVisible: false,
                dialogInsertVisible: false,
                dialogSetMenuVisible: false,
                currentPatient: {},
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
