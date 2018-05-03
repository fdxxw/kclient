<template>
    <div>
        <el-input placeholder="过滤" icon="search" v-model="filterText" @change="doFilter" class="search-input">
        </el-input>
        <el-table :data="dataEnd.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe height="600" fit size="small" cellpadding="2" >
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

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100, 500, 1000]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="dataEnd.length">
        </el-pagination>
    </div>


    <!--<div>{{columns}}</div>-->
</template>

<script>
    import Bus from '../bus';
    export default {
        name: "table",
        props: [
            'columns', 'data'
        ],

        data() {
          return {

              tableData: [],
              dataEnd: [],
              currentPage: 1,
              pagesize: 20,
              filterText: '',
          }
        },

        created() {
            Bus.$on("table-data-change", (data)=>{
                this.tableData = data;
                this.doFilter();
            })
        },

        mounted() {

        },

        methods: {
            doFilter: function() {
                debugger;
                if(this.filterText.length === 0) {
                    this.dataEnd = this.tableData;
                } else {
                    this.dataEnd = [];
                    this.tableData.forEach((value, index) => {
                        let has = false;

                        for(let key in value) {
                            if(value[key]){
                                if((value[key] + '').indexOf(this.filterText)>=0){
                                    has = true;
                                    break;
                                }
                            }
                        }

                        if(has) {
                            this.dataEnd.push(value);
                        }
                    });
                }
            },
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
            }
        }

    }
</script>

<style scoped>
</style>