<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="3" class="logo">
				<span>诊断系统<!--{{nodes.length}}--></span>
			</el-col>
			<el-col :span="3" style="float:right" class="logo">
				<router-link to="/login">退出登录</router-link>
			</el-col>
		</el-col>
		<el-col :span="24" class="main" style="overflow:auto;">
			<aside>
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" theme="dark" unique-opened  router>
					<menu-tree :nodes="$router.options.routes"></menu-tree>
				</el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<!--separator="/" separator-class="el-icon-arrow-right" -->
						<el-breadcrumb  separator-class="el-icon-arrow-right" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="(item,index) in $route.matched" :key="item.name">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition>
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
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
		handleopen(key, keyPath) {
			console.log('handleopen');
			console.log(key, keyPath);
		},
		handleclose(key, keyPath) {
			console.log('handleclose');
			console.log(key, keyPath);
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
			a{
				line-height: 32px;
				color: #f0f0f0;
				text-decoration: none;
			}
			a:hover{
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
			left: 230px;
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