<template>
    <el-header style="padding:0px;height:32px;margin-bottom:30px;">
        <div class="banner_header" style="height:32px;">
                <el-col :lg="8" :xs="24" style="line-height:32px;">
                    <span class="banner_title">{{title}}|{{title_suffix}}</span>
                </el-col>
                <el-col :lg="8" :xs="24" style="float:right;line-height:32px">
                        <el-col :lg="3" :xs="24" style="float:right;">
                        <el-dropdown style="text-align: right; font-size: 12px;">
                            <i class="el-icon-setting" style="margin-right: 15px"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>查看信息</el-dropdown-item>
                                <el-dropdown-item>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        </el-col>
                        <el-col style="float:right;" :lg="3">
                        <span style="text-align:center;display:block;vertical-align:middle;">王小虎</span>
                        </el-col>
                </el-col>
        </div>
    </el-header>
</template>

<script>
export default {
  name: "banner",
  data() {
    return {
      title: "智能诊断系统",
      title_suffix: "后台管理系统",
      login_name: "赖一申"
    };
  }
};
</script>

<style>
.banner_title {
  float: left;
  margin-left: 30px;
  font-size: 28px;
  font-family: "Microsoft YaHei";
}
.banner_header {
  background: dodgerblue;
  color: #ffffff;
  margin-bottom: 5px;
  padding: 10px;
}
.banner_header::after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.banner_header {
  zoom: 1;
}
.banner_right {
  font-size: 28px;
  float: right;
}
</style>
