<template>
    <div>
        <el-input placeholder="过滤" icon="search" v-model="filterText" @change="doFilter" class="search-input">
        </el-input>
        <el-table :data="dataEnd.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe height="600" fit size="" cellpadding="2" >
            <el-table-column
                    v-for="(item,index) in columns"
                    :key="index"
                    :prop="item.key"
                    :label="item.name"

                    sortable
                    show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column label="date" prop="date" sortable>

            </el-table-column>

            <el-table-column label="value" sortable>
                <template slot-scope="scope">
                    <div @dblclick="scope.row.editFlag = true">
                        <span v-show="!scope.row.editFlag" >{{scope.row.value}}</span>
                        <span v-show="scope.row.editFlag"><el-input @keyup.enter.native="alter(scope.row)" v-model="scope.row.value"></el-input></span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
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
            'columns', 'data', 'tags', 'metric'
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

                    //检索后当前页设为1
                    this.currentPage = 1;
                }
            },
            alter: function(row){
                row.editFlag = false;

                let tags = {};
                this.tags.forEach(item=>{
                   tags[item] = row[item];
                });

                let postJson = [{
                    name : this.metric,
                    datapoints: [[row.time, row.value]],
                    tags: tags,
                }];

                this.$util.axios.post(this.$kdb.url + '/api/v1/datapoints', postJson).then((response)=>{

                    this.loading = false;
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }, response => {
                    this.loading = false;
                    this.$message.error('修改失败');
                })
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