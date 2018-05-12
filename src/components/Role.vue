<template>
<div><el-col :span="24" style="text-align:right;">
 <el-button style="margin:7px;" @click="handleInsert">添加角色</el-button>
 </el-col>
 <el-table
      :data="roles"
      style="width: 100%">
      <el-table-column
      prop="name"
      label="代号"
      width="180">
    </el-table-column>
      <el-table-column
        prop="nameZh"
        label="名字"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="是否可用"
        width="180"
        :formatter="fmtStatus"
        >
      </el-table-column>
      <el-table-column
        prop="menus"
        label="菜单"
        :formatter="fmtMenus"
        >
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="text" >编辑</el-button>
        <el-button @click="handleDelete(scope.row)" type="text" >删除</el-button>
        <el-button @click="handleSetMenu(scope.row)" type="text" >分配权限</el-button>
      </template>
</el-table-column>
</el-table>
<div class="block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="pageSize" layout="total, prev, pager, next" :total="total" background>
    </el-pagination>
</div>

<!--修改对话框-->
<el-dialog title="修改" :visible.sync="dialogEditVisible">
    <el-form :model="currentRole" ref="currentRoleEditForm" label-position="left">
        <el-form-item label="代号">
            <el-input v-model="currentRole.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名字">
            <el-input v-model="currentRole.nameZh" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用">
            <el-select v-model="currentRole.status" placeholder="请选择">
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

<!--新增对话框-->
<el-dialog title="新增" :visible.sync="dialogInsertVisible">
    <el-form :model="currentRole" ref="currentRoleInsertForm" label-position="left">
        <el-form-item label="代号">
            <el-input v-model="currentRole.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名字">
            <el-input v-model="currentRole.nameZh" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用">
            <el-select v-model="currentRole.status" placeholder="请选择">
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


<!--分配权限对话框-->
<el-dialog title="分配权限" :visible.sync="dialogSetMenuVisible">
    <el-tree :data="tree" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
    </el-tree>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSetMenuVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogSetAuth">分配权限</el-button>
    </div>
</el-dialog>
<!--修改对话框结束-->

</div>
</template>

<script>
    import {
        getRoleList,
        updateRole,
        insertRole,
        deleteRole,
        setRoleMenu
    } from '../api/role';
    import {
        getAllMenuTree
    } from '../api/menu';
    export default {
        created() {
            getRoleList({
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                this.roles = res.data.list;
                this.pageNum = res.data.pageNum;
                this.pageSize = res.data.pageSize;
                this.total = res.data.total;
            });
        },
        methods: {
            loadRoleList() {
                getRoleList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.roles = res.data.list;
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
                getRoleList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.roles = res.data.list;
                    // this.pageNum=res.data.pageNum;
                    // this.pageSize=res.data.pageSize;
                    this.total = res.data.total;
                });
            },
            handleInsert() {
                this.dialogInsertVisible = true;
                this.currentRole = {};
            },
            //执行新增操作
            handleDialogInsert() {
                insertRole(this.currentRole).then(res => {
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
                        this.loadRoleList();
                        console.log(this.currentRole);
                        this.currentRole = {};
                    }
                });
            },
            //响应打开编辑对话框事件
            handleEdit(val) {
                this.currentRole = JSON.parse(JSON.stringify(val));
                this.dialogEditVisible = true;
            },
            //执行修改操作
            handleDialogEdit() {
                // let _this = this;
                updateRole(this.currentRole).then(res => {
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
                        this.loadRoleList();
                        console.log(this.currentRole);
                        this.currentRole = {};
                    }
                });
            },
            //响应删除事件
            handleDelete(val) {
                this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteRole({
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
                            this.loadRoleList();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSetMenu(val) {
                this.currentRole = val;
                getAllMenuTree().then(res => {
                    this.tree = res.data;
                    // this.pageNum=res.data.pageNum;
                    // this.pageSize=res.data.pageSize;
                    // this.roleCheckboxInit();
                    this.dialogSetMenuVisible = true;
                });
            },
            handleDialogSetAuth() {
                this.sels = this.sels.concat(this.$refs.tree.getCheckedKeys());
                this.sels = this.sels.concat(this.$refs.tree.getHalfCheckedKeys());
                var ids = this.sels.map(item => item).join();
                setRoleMenu({
                    ids: ids,
                    rid: this.currentRole.id
                }).then(res => {
                    this.dialogSetMenuVisible = false;
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
                        this.loadRoleList();
                        this.sels = [];
                        this.currentRole = {};
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
            },
            fmtMenus(row, column) {
                const menus = row[column.property]
                    /* 这里的 if(arr === undefined)
                     * 是根据自己的需求，决定arr长度为0时的判断条件
                     * 可以和这个不同
                     */
                if (menus.length === 0) {
                    return '无'
                } else {
                    let str = ""
                    for (var i = 0; i < menus.length; i++) {
                        if (i === 0) {
                            str += menus[i].name;
                        } else {
                            str += "," + menus[i].name;
                        }
                    }
                    return str;
                }
            },
        },
        data() {
            return {
                pageNum: 1,
                total: 0,
                pageSize: 5,
                roles: [],
                tree: [],
                //树控件的映射
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                dialogEditVisible: false,
                dialogInsertVisible: false,
                dialogSetMenuVisible: false,
                currentRole: {},
                statusOptions: [{
                    value: 1,
                    label: '可用'
                }, {
                    value: 2,
                    label: '禁用'
                }],
                sels: []
            }
        }
    }
</script>