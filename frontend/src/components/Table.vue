<template>
    <el-table :data="data" border stripe height="500" fit size="small" cellpadding="2" >
        <el-table-column
                v-for="(item,index) in columns"
                :key="index"
                :prop="item.key"
                :label="item.name"

                sortable
                show-overflow-tooltip
                >
        </el-table-column>
    </el-table>

    <!--<div>{{columns}}</div>-->
</template>

<script>
    export default {
        name: "table",
        props: [
            'columns', 'data'
        ],

        data() {
          return {

          }
        },

        mounted() {
            debugger;
            console.log(this.tableData);
        }


    }
</script>

<style scoped>
</style>