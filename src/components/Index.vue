<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="3" class="logo">
                <span>诊断系统<!--{{nodes.length}}--></span>
            </el-col>
            <el-col :span="3" style="float:right" class="logo">
                <router-link to="/login">医生后台</router-link>
            </el-col>
        </el-col>
        <!--滚动条-->
        <el-col :span="24" class="main" style="overflow:auto;">

            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="content-wrapper">
                        <div v-if="patient==null" style="margin:10px;">
                            <el-form ref="form" :inline="true" :model="patientForm" label-width="80px">
                                <el-form-item label="姓名">
                                    <el-input v-model="patientForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证号">
                                    <el-input v-model="patientForm.idCard"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">确定</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div v-if="patient!=null" style="margin:10px;">
                            <div>
                                <span :span="8">姓名 : {{patient.name}}</span>
                                <span :span="8">身份证号 : {{patient.idCard}}</span>
                                <span :span="8">手机 : {{patient.phone}}</span>
                                <el-button style="margin-left:30px;" type="text" @click="onExit">退出</el-button>
                            </div>
                            <el-table
                                    :data="laboratorySheets"
                                    style="width: 100%">
                                <el-table-column
                                        prop="id"
                                        label="单号"
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
                                        width="180"
                                >
                                    <template slot-scope="scope">
                                        <el-popover width="200" trigger="hover" placement="top">
                                            <p>{{ scope.row.systemSuggest }}</p>
                                            <div slot="reference" class="name-wrapper">
                                                <p>移到此处查看系统建议</p>
                                            </div>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column label="医生建议" width="180" max-height="150">
                                    <template slot-scope="scope">
                                        <el-popover width="200" trigger="hover" placement="top">
                                            <p>{{ scope.row.suggest }}</p>
                                            <div slot="reference" class="name-wrapper">
                                                <p>移到此处查看医生建议</p>
                                            </div>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="status" label="是否处理" width="180" :formatter="fmtStatus">
                                </el-table-column>
                                <el-table-column fixed="right" label="操作">
                                    <template slot-scope="scope">
                                        <el-button @click="handleLook(scope.row)" type="text" >查看检验结果</el-button>
                                        <el-button style="margin-left:0;" @click="handleSetSuggest(scope.row)" type="text" >给出医生建议</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="pageSize" layout="total, prev, pager, next" :total="total" background>
                                </el-pagination>
                            </div>
                        </div>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>
<script>
    // import PatientLS from './patient/PatientLS'
    import {
        getPatientInfo,
        getLaboratorySheetList
    } from '../api/patient.js'
    export default {
        components: {
            // PatientLS
        },
        created() {
            this.patient = JSON.parse(window.sessionStorage.getItem('patient'));
        },
        data() {
            return {
                patient: null,
                patientForm: {
                    name: '',
                    idCard: ''
                },
                laboratorySheets: []
            }
        },
        methods: {
            onSubmit() {
                getPatientInfo(this.patientForm).then(res => {
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
                        this.patient = res.data;
                        window.sessionStorage.setItem('patient', JSON.stringify(this.patient));
                    }
                });
            },
            onExit() {
                this.patient = null;
                window.sessionStorage.setItem('patient', JSON.stringify(this.patient));
            },
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
        }
    }
</script>

<style scoped lang="scss">
    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        .header {
            height: 60px;
            line-height: 60px;
            background: #1F2D3D;
            color: #c0ccda;
            .userinfo {
                text-align: right;
                padding-right: 35px;
                .userinfo-inner {
                    color: #c0ccda;
                    cursor: pointer;
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin: 10px 0px 10px 10px;
                        float: right;
                    }
                }
            }
            .logo {
                font-size: 22px;
                img {
                    width: 40px;
                    float: left;
                    margin: 10px 10px 10px 18px;
                }
                .txt {
                    color: #20a0ff
                }
            }
            .logo {
                font-size: 16px;
                a {
                    line-height: 32px;
                    color: #f0f0f0;
                    text-decoration: none;
                }
                a:hover {
                    color: #20a0ff;
                }
                .txt {
                    color: #20a0ff
                }
            }
        }
        .main {
            background: #F0F0F0;
            position: absolute;
            top: 60px;
            bottom: 0px;
            overflow: hidden;
            aside {
                width: 230px;
            }
            .content-container {
                background: #f1f2f7;
                position: absolute;
                right: 0px;
                top: 0px;
                bottom: 0px;
                left: 0px;
                overflow-y: scroll;
                padding: 20px;
                .breadcrumb-container {
                    margin-bottom: 15px;
                    .title {
                        width: 200px;
                        float: left;
                        color: #475669;
                    }
                    .breadcrumb-inner {
                        float: right;
                    }
                }
                .content-wrapper {
                    background-color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>