<template>
    <div>
        <!-- <el-col :span="24" style="text-align:right;">
         <el-button style="margin:7px;"  @click="handleInsert">添加检验单</el-button>
         </el-col> -->
        <el-table
                :data="laboratorySheets"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="单号"
            >
            </el-table-column>
            <el-table-column
                    prop="doctor.name"
                    label="诊断医生"
            >
            </el-table-column>
            <el-table-column
                    prop="patient.name"
                    label="病人名字"
            >
            </el-table-column>
            <el-table-column
                    prop="patient.idCard"
                    label="病人身份证号"
            >
            </el-table-column>
            <el-table-column
                    prop="patient.phone"
                    label="病人手机号"
            >
            </el-table-column>
            <el-table-column
                    label="系统建议"
            >
                <template slot-scope="scope">
                    <el-popover width="200" trigger="hover" placement="top">
                        <p>{{ scope.row.systemSuggest }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>系统建议</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="医生建议"  max-height="150">
                <template slot-scope="scope">
                    <el-popover width="200" trigger="hover" placement="top">
                        <p>{{ scope.row.suggest }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>医生建议</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="是否处理"  :formatter="fmtStatus">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleLook(scope.row)" type="text" >查看检验结果</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="pageSize" layout="total, prev, pager, next" :total="total" background>
            </el-pagination>
        </div>



        <!--查看对话框-->
        <el-dialog title="查看" :visible.sync="dialogLookVisible">
            <el-table :data="specificItems" style="width: 100%" ref="specificItemsTable">
                <el-table-column prop="specific.zhName" label="检测指标">
                </el-table-column>
                <el-table-column prop="result" label="結果值">
                </el-table-column>
                <el-table-column prop="specific.ref" label="浮动参考值">
                </el-table-column>
                <el-table-column prop="tips" label="是否偏离" width="180" :formatter="fmtTips">
                </el-table-column>
                <el-table-column prop="specific.unit" label="单位">
                </el-table-column>
                <el-table-column prop="checker" label="检验人">
                </el-table-column>
                <el-table-column prop="specific.inspection.zhName" label="所属检验科目">
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogLookVisible = false">確 定</el-button>
                <!-- <el-button type="primary" @click="handleDialogEdit">确 定</el-button> -->
            </div>
            <div class="block">
                <el-pagination @current-change="handleLookCurrentChange" :current-page.sync="lookPageNum" :page-size="lookPageSize" layout="total, prev, pager, next" :total="lookTotal" background>
                </el-pagination>
            </div>
        </el-dialog>
        <!--查看对话框结束-->

    </div>
</template>



<script>
    import {
        getLaboratorySheetList,
        setSuggest
    } from '../api/laboratorySheet';
    import {
        getSpecificItemListByLsId
    }
    from '../api/specificItem';
    export default {
        created() {
            getLaboratorySheetList({
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                this.laboratorySheets = res.data.list;
                this.pageNum = res.data.pageNum;
                this.pageSize = res.data.pageSize;
                this.total = res.data.total;
            });
        },
        methods: {
            loadLaboratorySheetList() {
                getLaboratorySheetList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.laboratorySheets = res.data.list;
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
                getLaboratorySheetList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }).then(res => {
                    this.laboratorySheets = res.data.list;
                    // this.pageNum=res.data.pageNum;
                    // this.pageSize=res.data.pageSize;
                    this.total = res.data.total;
                });
            },
            handleLookCurrentChange(val) {
                this.lookPageNum = val;
                getSpecificItemListByLsId({
                    pageNum: this.lookPageNum,
                    pageSize: this.lookPageSize,
                    lsId: this.currentLaboratorySheet.id
                }).then(res => {
                    this.specificItems = res.data.list;
                    this.lookPageNum = res.data.pageNum;
                    this.lookPageSize = res.data.pageSize;
                    this.lookTotal = res.data.total;
                });
            },
            handleLook(val) {
                this.currentLaboratorySheet = val;
                getSpecificItemListByLsId({
                    pageNum: this.lookPageNum,
                    pageSize: this.lookPageSize,
                    lsId: val.id
                }).then(res => {
                    this.specificItems = res.data.list;
                    this.lookPageNum = res.data.pageNum;
                    this.lookPageSize = res.data.pageSize;
                    this.lookTotal = res.data.total;
                });
                this.dialogLookVisible = true;
            },
            fmtStatus(row, column) {
                const status = row[column.property]
                if (status == 2) {
                    return '已处理';
                } else if (status == 1) {
                    return '待处理';
                }
            },
            fmtTips(row, column) {
                const tips = row[column.property]
                if (tips == 2) {
                    return '平均值内';
                } else if (tips == 3) {
                    return '偏高';
                } else if (tips == 4) {
                    return '偏低';
                }
            }
        },
        data() {
            return {
                pageNum: 1,
                total: 0,
                pageSize: 5,
                lookPageNum: 1,
                lookTotal: 0,
                lookPageSize: 5,
                laboratorySheets: [],
                specificItems: [],
                dialogEditVisible: false,
                dialogInsertVisible: false,
                dialogLookVisible: false,
                currentLaboratorySheet: {},
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