<template>
 <div>
  <el-col :span="24" style="text-align:right;">
 <el-button style="margin:7px;"  @click="handleInsert">添加菜单项</el-button>
 </el-col>
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
        prop="parent.name"
        label="父菜单">
      </el-table-column>
      <el-table-column
        prop="status"
        label="是否可用"
        :formatter="fmtStatus">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="text" >编辑</el-button>
        <el-button @click="handaleDelete(scope.row)" type="text" >删除</el-button>
      </template>
</el-table-column>
</el-table>
<div class="block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="pageSize" layout="total, prev, pager, next" :total="total" background>
    </el-pagination>
</div>

<!--修改对话框-->
<el-dialog title="修改" :visible.sync="dialogEditVisible">
    <el-form :model="currentMenu" ref="currentMenuEditForm" label-position="left">
        <el-form-item label="名字">
            <el-input v-model="currentMenu.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="组件名">
            <el-input v-model="currentMenu.component" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径">
            <el-input v-model="currentMenu.path" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="API地址">
            <el-input v-model="currentMenu.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="currentMenu.parent!=null" label="父组件">
            <el-select v-model="currentMenu.parentId" placeholder="请选择">
                <el-option v-for="item in parents" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否可用">
            <el-select v-model="currentMenu.status" placeholder="请选择">
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
    <el-form :model="currentMenu" ref="currentMenuInsertForm" label-position="left">
        <el-form-item label="名字">
            <el-input v-model="currentMenu.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="组件名">
            <el-input v-model="currentMenu.component" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径">
            <el-input v-model="currentMenu.path" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="API地址">
            <el-input v-model="currentMenu.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="currentMenu.parentId!=0" label="父组件">
            <el-select v-model="currentMenu.parentId" placeholder="请选择">
                <el-option v-for="item in parents" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否可用">
            <el-select v-model="currentMenu.status" placeholder="请选择">
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

</div>
</template>
<script>
    import {
        getMenuList,
        getAllMenu,
        updateMenu,
        insertMenu,
        deleteMenu
    } from '../api/menu'
    export default {
        created() {
            getMenuList({
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                this.menus = res.data.list;
                this.pageNum = res.data.pageNum;
                this.pageSize = res.data.pageSize;
                this.total = res.data.total;
            });
        },
        methods: {
            loadMenuList() {
                getMenuList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.menus = res.data.list;
                    this.pageNum = res.data.pageNum;
                    this.pageSize = res.data.pageSize;
                    this.total = res.data.total;
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                getMenuList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.menus = res.data.list;
                    // this.pageNum=res.data.pageNum;
                    // this.pageSize=res.data.pageSize;
                    this.total = res.data.total;
                });
            },
            handaleDelete(val) {
                this.$confirm('此操作将永久删除该菜单项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteMenu({
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
                            this.loadMenuList();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleEdit(val) {
                this.dialogEditVisible = true;
                getAllMenu().then(res => {
                    this.parents = res.data;
                });
                this.currentMenu = JSON.parse(JSON.stringify(val));
            },
            handleDialogEdit() {
                updateMenu(this.currentMenu).then(res => {
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
                        this.loadMenuList();
                        this.currentMenu = {};
                    }
                });
            },
            handleInsert() {
              this.dialogInsertVisible = true;
              getAllMenu().then(res => {
                    this.parents = res.data;
                });
              this.currentMenu = {};
            },
            handleDialogInsert(){
              console.log(this.currentMenu);
              insertMenu(this.currentMenu).then(res => {
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
                        this.loadMenuList();
                        this.currentMenu = {};
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
        },
        data() {
            return {
                pageNum: 1,
                total: 0,
                pageSize: 7,
                menus: [],
                parents: [],
                dialogEditVisible: false,
                dialogInsertVisible: false,
                dialogSetMenuVisible: false,
                currentMenu: {},
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