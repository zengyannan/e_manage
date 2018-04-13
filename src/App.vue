
<template>
  <div id="app">
    <el-container>
      <banner />
      <leftMenu></leftMenu>
      <el-main></el-main>
      <el-footer></el-footer>
    </el-container>
  
    <!-- <div>
      <el-button @click="startHacking">Start</el-button>
      <el-button @click="fuck">Fuck</el-button>
    </div> -->
  </div>
</template>

<script>
import leftMenu from './components/LeftMenu'
import banner from './components/Banner'
export default {
  components:{leftMenu,banner},
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    },
    fuck(){
      this.$notify.error({
        title:'fuck that',
        type:'danger',
        message:'no some message',
        duration:3000,
        position: 'top-left'
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
  margin: 0 auto;
}
</style>
