<template>
    <div>
    <template v-for="(node,index) in nodes">  
      <el-menu-item v-if="node.leaf&&node&&!node.hidden"  
                    :key="node.id" :data="node" :index="node.path" :route="{name:node.name}"
                    >  
        <i :class="node.iconCls"></i>  
        <span slot="title">{{node.name}}</span>  
      </el-menu-item>  
  
      <el-submenu v-if="!node.leaf&&node&&!node.hidden"  
                  :key="node.id" :data="node" :index="node.path">  
        <template slot="title">  
          <i :class="node.iconCls"></i>  
          <span slot="title">{{node.name}}</span>  
        </template>  
        <el-menu-item-group>
        <menu-tree :nodes="node.children"></menu-tree>
        </el-menu-item-group> 
      </el-submenu>  
    </template>  
  </div> 
</template>

<script type="text/ecmascript-6">
export default {
  name: 'MenuTree',
  data() {
    return {

    }
  },
  props: {
    nodes: {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>