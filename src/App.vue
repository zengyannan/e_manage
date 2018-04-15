
<template>
  <div id="app">
   <router-view>
   </router-view>
    <!-- <div>
      <el-button @click="startHacking">Start</el-button>
      <el-button @click="fuck">Fuck</el-button>
    </div> -->
  </div>
</template>

<script>
// import index from './components/Index'
export default {
  // components:{index},
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
  },
  // watch:{
  //   '$route'(to,from){
  //     let user = JSON.parse(sessionStorage.getItem('user'));
  //     if(!user){
  //       this.$router.replace('/login');
  //     }
  //   }
  // }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
  margin: 0 auto;
}
body{
    background-color: #F0F0F0;
}
</style>