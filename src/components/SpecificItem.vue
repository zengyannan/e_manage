<template>
<div>
<el-col :span="24" style="text-align:right;">
 <el-button style="margin:7px;"  @click="handleInsert">添加具体检测指标</el-button>
 </el-col>
 <el-table
      :data="specificItems"
      style="width: 100%">
      <el-table-column
        prop="specific.zhName"
        label="所属检测指标名"
      >
      </el-table-column>
      <el-table-column
        prop="result"
        label="结果值"
        >
      </el-table-column>
      <el-table-column
        prop="specific.ref"
        label="浮动参考值"
        >
      </el-table-column>
      <el-table-column
        prop="specific.unit"
        label="单位"
        >
      </el-table-column>
      <el-table-column
        prop="lsId"
        label="所属检验单号"
        >
      </el-table-column>
      <el-table-column
        prop="tips"
        label="偏离"
        width="180"
        :formatter="fmtTips"
        >
      </el-table-column>
      <el-table-column
        prop="checker"
        label="检验人"
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
    <el-form :model="currentSpecificItem" ref="currentSpecificItemInsertForm" label-position="left">
        <el-form-item label="所属检验指标">
            <el-select v-model="currentSpecificItem.specificId" placeholder="请选择">
                <el-option v-for="item in specifics" :key="item.id" :label="item.zhName" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="结果值">
            <el-input v-model="currentSpecificItem.result" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="检验人">
            <el-input v-model="currentSpecificItem.checker" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属单号">
            <el-select v-model="currentSpecificItem.lsId" placeholder="请选择">
                <el-option v-for="item in laboratorySheets" :key="item.id" :label="item.id" :value="item.id">
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
    <el-form :model="currentSpecificItem" ref="currentSpecificItemEditForm" label-position="left">
        <el-form-item label="所属检验指标">
            <el-select v-model="currentSpecificItem.specificId" placeholder="请选择">
                <el-option v-for="item in specifics" :key="item.id" :label="item.zhName" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="结果值">
            <el-input v-model="currentSpecificItem.result" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="检验人">
            <el-input v-model="currentSpecificItem.checker" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属单号">
            <el-select v-model="currentSpecificItem.lsId" placeholder="请选择">
                <el-option v-for="item in laboratorySheets" :key="item.id" :label="item.id" :value="item.id">
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
        getSpecificItemList,
        insertSpecificItem,
        updateSpecificItem,
        deleteSpecificItem,
    } from '../api/specificItem';
    import {
        getAllSpecific
    } from '../api/specific';
    import {
        getAllLaboratorySheet
    } from '../api/laboratorySheet';
    export default {
        created() {
            getSpecificItemList({
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                this.specificItems = res.data.list;
                this.pageNum = res.data.pageNum;
                this.pageSize = res.data.pageSize;
                this.total = res.data.total;
            });
        },
        methods: {
            loadSpecificItemList() {
                getSpecificItemList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.specificItems = res.data.list;
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
                getSpecificItemList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.specificItems = res.data.list;
                    // this.pageNum=res.data.pageNum;
                    // this.pageSize=res.data.pageSize;
                    this.total = res.data.total;
                });
            },
            handleEdit(val){
                this.currentSpecificItem = JSON.parse(JSON.stringify(val));
                this.dialogEditVisible = true;
                getAllSpecific().then(res => {
                    this.specifics = res.data;
                });
                getAllLaboratorySheet().then(res => {
                    this.laboratorySheets = res.data;
                });
            },
            handleDialogEdit(){
                updateSpecificItem(this.currentSpecificItem).then(res => {
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
                        this.loadSpecificItemList();
                        this.currentSpecificItem = {};
                    }
                });
            },
            handleDelete(val){
                this.$confirm('此操作将永久删除该检验指标, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteSpecificItem({
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
                            this.loadSpecificItemList();
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
                this.currentSpecificItem = {};
                getAllSpecific().then(res => {
                    this.specifics = res.data;
                });
                getAllLaboratorySheet().then(res => {
                    this.laboratorySheets = res.data;
                });\
            },
            handleDialogInsert(){
                insertSpecificItem(this.currentSpecificItem).then(res => {
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
                        this.loadSpecificItemList();
                        this.currentSpecificItem = {};
                    }
                });
            },
            fmtTips(row, column) {
                const tips = row[column.property]
                if (tips == 2) {
                    return '平均值内';
                } else if (tips == 3) {
                    return '偏高';
                }
                else if (tips == 4) {
                    return '偏低';
                }
            }
        },
        data() {
            return {
                pageNum: 1,
                total: 0,
                pageSize: 5,
                specificItems: [],
                specifics: [],
                laboratorySheets:[],
                dialogEditVisible: false,
                dialogInsertVisible: false,
                dialogSetMenuVisible: false,
                currentSpecificItem: {},
                statusOptions: [{
                    value: 2,
                    label: '平均值内'
                }, {
                    value: 3,
                    label: '偏高'
                },{
                    value: 4,
                    label: '偏低'
                }],
            }
        }
    }
</script>