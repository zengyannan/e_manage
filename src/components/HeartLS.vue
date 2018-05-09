<template>
    <div>
        <el-col :span="24" style="text-align:right;">
         <el-button style="margin:7px;"  @click="handleInsert">申请检验单</el-button>
         </el-col>
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
<el-table-column label="医生建议" max-height="150">
    <template slot-scope="scope">
                    <el-popover width="200" trigger="hover" placement="top">
                        <p>{{ scope.row.suggest }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>医生建议</el-tag>
                        </div>
                    </el-popover>
    </template>
</el-table-column>
<el-table-column prop="status" label="是否处理" :formatter="fmtStatus">
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
    <el-col :span="24" style="text-align:right;">
        <el-button style="margin:7px;" @click="handleSpecificItemInsert">添加指标项</el-button>
    </el-col>
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


<!--新增病人指标数值对话框-->
<el-dialog title="新增" :visible.sync="dialogSpecificItemInsertVisible">
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
            <el-input readonly v-model="currentSpecificItem.lsId" auto-complete="off">
            </el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSpecificItemInsertVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogSpecificItemInsert">确 定</el-button>
    </div>
</el-dialog>
<!--新增病人指标数值对话框结束-->


<!--新增对话框-->
<el-dialog title="添加检验单" :visible.sync="dialogInsertVisible">
    <el-form :model="currentLaboratorySheet" ref="currentLaboratorySheetInsertForm" label-position="left">
        <el-form-item label="患者身份证号">
            <!-- <el-select @change="changePatient" v-model="currentLaboratorySheet.patientId" placeholder="请选择">
                <el-option v-for="item in patients" :key="item.id" :label="item.idCard" :value="item.id">
                </el-option>
            </el-select> -->
            <el-input readonly v-model="currentPatient.idCard" auto-complete="off">
            </el-input>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input readonly v-model="currentPatient.name" auto-complete="off">
            </el-input>
        </el-form-item>
        <el-form-item label="手机号">
            <el-input readonly v-model="currentPatient.phone" auto-complete="off">
            </el-input>
        </el-form-item>
        <el-form-item label="所属医生">
            <el-select v-model="currentLaboratorySheet.doctorId" placeholder="请选择">
                <el-option v-for="item in doctors" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属器官检验单的类型">
            <el-input readonly v-model="organ.zhName" auto-complete="off">
            </el-input>
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
        getLaboratorySheetListByOrgan,
        setSuggest,
        insertLaboratorySheetByPatient
    } from '../api/laboratorySheet';
    import {
        insertSpecificItem,
        getSpecificItemListByLsId
    }
    from '../api/specificItem';
    import {
        getSpecificListByOrganId
    } from '../api/specific';
    import {
        getPatientByToken
    } from '../api/patient';
    import {
        getOrganById
    } from '../api/organ';
    import {
        getHrListByRoleName
    } from '../api/hr';
    export default {
        created() {
            getLaboratorySheetListByOrgan({
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                organId: this.organId
            }).then(res => {
                this.laboratorySheets = res.data.list;
                this.pageNum = res.data.pageNum;
                this.pageSize = res.data.pageSize;
                this.total = res.data.total;
            });
        },
        methods: {
            loadLaboratorySheetList() {
                getLaboratorySheetListByOrgan({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    organId: this.organId
                }).then(res => {
                    this.laboratorySheets = res.data.list;
                    this.pageNum = res.data.pageNum;
                    this.pageSize = res.data.pageSize;
                    this.total = res.data.total;
                });
            },
            loadSpecificItemListByLsId() {
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //响应分页点击事件
            handleCurrentChange(val) {
                this.pageNum = val;
                getLaboratorySheetListByOrgan({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    organId: this.organId
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
                    lsId: val.id
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
            handleSetSuggest(val) {
                this.currentLaboratorySheet = JSON.parse(JSON.stringify(val));
                this.dialogSetSuggestVisible = true;
            },
            handleDialogSetSuggest() {
                if (this.currentLaboratorySheet.suggest.length > 256) {
                    this.$message.error("建议长度不能大于256");
                    return;
                }
                setSuggest({
                    suggest: this.currentLaboratorySheet.suggest,
                    lsId: this.currentLaboratorySheet.id
                }).then(res => {
                    this.dialogSetSuggestVisible = false;
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
                        this.loadLaboratorySheetList();
                        this.currentLaboratorySheet = {};
                    }
                });
            },
            handleSpecificItemInsert() {
                this.dialogSpecificItemInsertVisible = true;
                this.currentSpecificItem = {};
                this.currentSpecificItem.lsId = this.currentLaboratorySheet.id;
                getSpecificListByOrganId({
                    id: this.organId
                }).then(res => {
                    this.specifics = res.data;
                });
            },
            handleDialogSpecificItemInsert() {
                insertSpecificItem(this.currentSpecificItem).then(res => {
                    this.dialogSpecificItemInsertVisible = false;
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
                        this.loadSpecificItemListByLsId();
                        this.currentSpecificItem = {};
                    }
                });
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
            },
            changePatient(value) {
                console.log(value);
                let obj = {};
                obj = this.patients.find((item) => {
                    if (item.id === value)
                        return item;
                });
                this.currentPatient = obj;
                console.log(obj);
            },
            handleInsert() {
                this.currentLaboratorySheet = {};
                this.currentLaboratorySheet.organId = this.organId;
                this.dialogInsertVisible = true;
                getPatientByToken().then(res => {
                    this.currentPatient = res.data;
                });
                getHrListByRoleName({
                    roleName: "ROLE_heart_doctor"
                }).then(res => {
                    this.doctors = res.data;
                });
                getOrganById({
                    id: this.organId
                }).then(res => {
                    this.organ = res.data;
                });
            },
            handleDialogInsert() {
                insertLaboratorySheetByPatient(this.currentLaboratorySheet).then(res => {
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
                        this.loadLaboratorySheetList();
                        this.currentLaboratorySheet = {};
                        this.currentPatient = {};
                    }
                });
            },
            querySearch(queryString, cb) {
                var patients = this.patients;
                var results = queryString ? patients.filter(this.createFilter(queryString)) : patients;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (patient) => {
                    return (patient.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
                this.currentPatient = item;
                // this.currentLaboratorySheet.patientId = item.id;
                console.log(this.currentLaboratorySheet);
            }
        },
        data() {
            return {
                organId: 1,
                currentIdCard: '',
                pageNum: 1,
                total: 0,
                pageSize: 5,
                lookPageNum: 1,
                lookTotal: 0,
                lookPageSize: 5,
                laboratorySheets: [],
                specificItems: [],
                specifics: [],
                doctors: [],
                organ: {},
                patient: {},
                dialogEditVisible: false,
                dialogInsertVisible: false,
                dialogLookVisible: false,
                dialogSetSuggestVisible: false,
                dialogSpecificItemInsertVisible: false,
                currentLaboratorySheet: {},
                currentPatient: {},
                currentSpecificItem: {},
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