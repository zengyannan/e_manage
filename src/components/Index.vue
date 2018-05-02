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
                            <span :span="10">{{patient.name}}</span>
                             <span :span="10">{{patient.idCard}}</span>
                    </div>
                    <PatientLS></PatientLS>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>
<script>
    import PatientLS from './patient/PatientLS'
    export default {
        components: {
            PatientLS
        },
        created() {
            this.patient = JSON.parse(window.sessionStorage.getItem('patient'));
        },
        data() {
            return {
                patient:null,
                patientForm: {
                    name: '',
                    idCard: ''
                }
            }
        },
        methods:{
            onSubmit(){
                this.patient = this.patientForm;
                window.sessionStorage.setItem('patient',JSON.stringify(this.patient));
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