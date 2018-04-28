<template>
 <div>
 <el-col :span="24" style="text-align:right;">
 <el-button style="margin:7px;" @click="handleInsert">添加用户</el-button>
 </el-col>
 <el-table
      :data="hrs"
      style="width: 100%">
      <el-table-column
      prop="username"
      label="用户名"
      width="180">
    </el-table-column>
      <el-table-column
        prop="name"
        label="名字"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="roles"
        label="角色"
        :formatter="fmtRoles"
        >
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="text" >编辑</el-button>
        <el-button @click="handleDelete(scope.row)" type="text" >删除</el-button>
        <el-button @click="handleSetRole(scope.row)" type="text" >分配角色</el-button>
      </template>
</el-table-column>
</el-table>
<div class="block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="pageSize" layout="total, prev, pager, next" :total="total" background>
    </el-pagination>
</div>
<!--修改对话框-->
<el-dialog title="修改" :visible.sync="dialogEditVisible">
    <el-form :model="currentHr" :rules="hrDialogRule" ref="currentHrEditForm" label-position="left">
        <el-form-item prop="name" label="名字">
            <el-input v-model="currentHr.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
            <el-input v-model="currentHr.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="currentHr.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
            <el-input v-model="currentHr.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="currentHr.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="currentHr.remark" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用">
            <el-select v-model="currentHr.status" placeholder="请选择">
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


<!--新增对话框-->
<el-dialog title="新增" :visible.sync="dialogInsertVisible">
    <el-form :model="currentHr" :rules="hrDialogRule" ref="currentHrInsertForm" label-position="left">
        <el-form-item prop="name" label="名字">
            <el-input v-model="currentHr.name" auto-complete="off" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
            <el-input v-model="currentHr.username" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="currentHr.phone" auto-complete="off" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="地址">
            <el-input v-model="currentHr.address" auto-complete="off" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="currentHr.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="currentHr.remark" auto-complete="off" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="是否可用">
            <el-select v-model="currentHr.status" placeholder="请选择">
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
<!--新增对话框 结束-->

<!--分配角色对话框-->
<el-dialog title="分配角色" :visible.sync="dialogSetRolesVisible" label-position="left">
    <el-table :data="roles" style="width: 100%" @row-click="handleRoleSelsChange"  @selection-change="roleSelsChange" ref="rolesTable" >
        <el-table-column  type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="英文名">
        </el-table-column>
        <el-table-column prop="nameZh" label="中文名">
        </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleDialogSetRoles" :disabled="this.sels.length === 0">分配角色</el-button>
        <el-button @click="dialogSetRolesVisible = false">取 消</el-button>
        <!--disabled值动态显示，默认为true,当选中复选框后值为false-->
    </div>
    <div class="block">
        <el-pagination @current-change="handleRolesCurrentChange" :current-page.sync="rolesPageNum" :page-size="rolesPageSize" layout="total, prev, pager, next" :total="rolesTotal" background>
        </el-pagination>
    </div>
</el-dialog>
<!--分配角色对话框 结束-->
</div>
</template>
<script>
    import {
        getHrList,
        updateHr,
        insertHr,
        deleteHr,
        setRoles
    } from '../api/hr';
    import {
        getAllRole
    } from '../api/role';
    export default {
        created() {
            getHrList({
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                this.hrs = res.data.list;
                this.pageNum = res.data.pageNum;
                this.pageSize = res.data.pageSize;
                this.total = res.data.total;
            });
        },
        methods: {
            //加载分页列表
            loadHrList() {
                getHrList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.hrs = res.data.list;
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
                getHrList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.hrs = res.data.list;
                    // this.pageNum=res.data.pageNum;
                    // this.pageSize=res.data.pageSize;
                    this.total = res.data.total;
                });
            },
            //响应分配角色对话框表格分页点击事件
            handleRolesCurrentChange(val) {
                this.rolesPageNum=val;
                getAllRole({
                    pageNum: this.rolesPageNum,
                    pageSize: this.rolesPageSize
                }).then(res => {
                    this.roles = res.data.list;
                    // this.pageNum=res.data.pageNum;
                    // this.pageSize=res.data.pageSize;
                    this.rolesTotal = res.data.total;
                    // this.roleCheckboxInit();
                });
            },
            //响应删除事件
            handleDelete(val) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteHr({
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
                            this.loadHrList();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //响应分配角色点击事件 打开分配角色窗口
            handleSetRole(val) {
                this.currentHr = val;
                getAllRole({
                    pageNum: this.rolesPageNum,
                    pageSize: this.rolesPageSize
                }).then(res => {
                    this.roles = res.data.list;
                    // this.pageNum=res.data.pageNum;
                    // this.pageSize=res.data.pageSize;
                    this.rolesTotal = res.data.total;
                    // this.roleCheckboxInit();
                    this.dialogSetRolesVisible = true;
                });
            },
            //打开新增窗口
            handleInsert(val) {
                this.dialogInsertVisible = true;
                this.currentHr = {};
            },
            //打开编辑窗口
            handleEdit(val) {
                this.dialogEditVisible = true;
                this.currentHr = JSON.parse(JSON.stringify(val));
                // this.currentHr = val;
            },
            //执行修改操作
            handleDialogEdit() {
                // let _this = this;
                this.$refs.currentHrEditForm.validate((valid) => {
                    if (valid) {
                        updateHr(this.currentHr).then(res => {
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
                                this.loadHrList();
                                // console.log(this.currentHr);
                                this.currentHr = {};
                            }
                        });
                    }
                });
            },
            //执行新增操作
            handleDialogInsert() {
                this.$refs.currentHrInsertForm.validate((valid) => {
                    if (valid) {
                        insertHr(this.currentHr).then(res => {
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
                                this.loadHrList();
                                console.log(this.currentHr);
                                this.currentHr = {};
                            }
                        });
                    }
                    console.log(this.currentHr);
                })
            },
            //格式化角色列
            fmtRoles(row, column) {
                const roles = row[column.property]
                    /* 这里的 if(arr === undefined)
                     * 是根据自己的需求，决定arr长度为0时的判断条件
                     * 可以和这个不同
                     */
                if (roles.length === 0) {
                    return '无'
                } else {
                    let str = ""
                    for (var i = 0; i < roles.length; i++) {
                        if (i === 0) {
                            str += roles[i].nameZh;
                        } else {
                            str += "," + roles[i].nameZh;
                        }
                    }
                    return str;
                }
            },
            roleSelsChange(sels) {
                this.sels = sels;
                // console.log(this.sels);
            },
            //处理对话框分配角色事件
            handleDialogSetRoles() {
                var ids = this.sels.map(item => item.id).join(); //获取所有选中行的id组成的字符串，以逗号分隔
                var uid = this.currentHr.id;
                setRoles({
                    uid: uid,
                    ids: ids
                }).then(res => {
                    this.dialogSetRolesVisible = false;
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
                        this.loadHrList();
                        this.currentHr = {};
                        this.sels=[];
                    }
                });
            },
            handleRoleSelsChange(row, event, column) {
                // console.log(row);
                this.$refs.rolesTable.toggleRowSelection(row)
            }
            // ,roleCheckboxInit(){
            //     let roleArr = this.currentHr.roles;
            //     console.log(roleArr);
            //     this.roles.forEach((item,index)=>{
            //         let rid = item.id;
            //         roleArr.forEach((item,index)=>{
            //             if(item.id===rid){
            //                 console.log(this.$refs.rolesTable);
            //                 // this.$refs.rolesTable.toggleRowSelection(rid,true);
            //             }
            //         });
            //     });
            // }
        },
        data() {
            return {
                pageNum: 1,
                total: 0,
                pageSize: 7,
                hrs: [],
                roles: [],
                dialogEditVisible: false,
                dialogInsertVisible: false,
                dialogSetRolesVisible: false,
                currentHr: {},
                statusOptions: [{
                    value: 1,
                    label: '可用'
                }, {
                    value: 2,
                    label: '禁用'
                }],
                hrDialogRule: {
                    name: [{
                        required: true,
                        message: '请输入名字',
                        trigger: 'blur'
                    }, ],
                },
                rolesPageNum: 1,
                rolesTotal: 0,
                rolesPageSize: 5,
                sels: []
            }
        }
    }
</script>