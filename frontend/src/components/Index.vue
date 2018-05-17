<template>
  <el-container>
    <el-header height="30px">kclient</el-header>


    <el-container >
      <el-main>
        <tab-pane></tab-pane>
      </el-main>



    </el-container>
  </el-container>
</template>

<script>

  import tabPane from './TabPane';

  export default {
      components: {
          'tab-pane': tabPane,
      },

      data() {
          return {

          }
      },

      mounted() {},

      methods: {}
  }
</script>