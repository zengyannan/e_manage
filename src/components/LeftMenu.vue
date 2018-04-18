<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" theme="dark" unique-opened router>
					<menu-tree :nodes="$router.options.routes"></menu-tree>
		</el-menu>
  </el-aside>
</template>

<script>
import MenuTree from './MenuTree'
  export default {
    data() {
		return {
			nodes: this.$router.options.routes
		}
	},
	created() {
		//这里没有直接使用this.$router.options.routes，是因为addRoute的路由规则，在这里this.$router.options.routes获取不到
		//有兴趣的可以看一下源码，是为什么获取不到，但是却又有规则了 
		//另外在开发的时候，可能由于是热部署，也会不断重复的给nodes添加元素，造成导航条有重复的，简单解决，可以设置一个开关
		let isLoadNodes = sessionStorage.getItem('isLoadNodes')
		if (!isLoadNodes) {
			let menus = JSON.parse(window.sessionStorage.getItem('menus'))
			this.nodes.push(...menus)
			console.log(this.nodes)
			sessionStorage.setItem('isLoadNodes', 'true')
		}
	 },
    methods: {
		onSubmit() {
			console.log('submit!');
		},
		handleopen() {
			//console.log('handleopen');
		},
		handleclose() {
			//console.log('handleclose');
		},
		handleselect: function(a, b) {
		}
	},
	mounted() {

	},
	components: {
		MenuTree
	}
  }
</script>