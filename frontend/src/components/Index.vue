<template>
  <el-container>
    <el-header>Header</el-header>


    <el-container >
      <el-main>
        <tab-pane></tab-pane>
      </el-main>



    </el-container>
  </el-container>
</template>

<script>

  import tabPane from './tabPane';

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