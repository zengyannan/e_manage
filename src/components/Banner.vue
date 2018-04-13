<template>
    <el-header style="padding:0px;">
        <div class="banner_header">
            <el-row>
                <el-col :lg="6" :xs="6">
                    <span class="banner_title">{{title}}|{{title_suffix}}</span>
                </el-col>
                <el-col :lg="6" :xs="6">
                    <el-container>
                    <el-header style="text-align: right; font-size: 12px;height:32px;">
                        <el-dropdown>
                            <i class="el-icon-setting" style="margin-right: 15px"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>查看</el-dropdown-item>
                                <el-dropdown-item>新增</el-dropdown-item>
                                <el-dropdown-item>删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <span>王小虎</span>
                    </el-header>
                </el-container>
                </el-col>
            </el-row>
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
