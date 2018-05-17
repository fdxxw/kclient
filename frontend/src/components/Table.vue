<template>
    <div>
        <div style="display: flex; justify-content: flex-start">
            <el-input style="flex: 1; margin-right: 5px" size="small" placeholder="过滤" icon="search" v-model="filterText" @change="doFilter" class="search-input"></el-input>
            <download-excel
                    style="margin-right: 5px"
                    :data   = "dataEnd.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    :fields = "excelFileds"
                    name    = "data.xls">

                <el-button type="primary" size="small">导出当前页</el-button>
            </download-excel>
            <download-excel
                    style="margin-right: 5px"
                    :data   = "dataEnd"
                    :fields = "excelFileds"
                    name    = "data.xls">

                <el-button type="primary" size="small">导出所有</el-button>
            </download-excel>

        </div>
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
                :page-sizes="[100, 500, 1000, 2000, 4000, 5000, 10000, 50000]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="dataEnd.length">
        </el-pagination>
    </div>


    <!--<div>{{columns}}</div>-->
</template>

<script>
    import Bus from '../bus';
    //https://github.com/jecovier/vue-json-excel
    import JsonExcel from 'vue-json-excel'
    export default {
        name: "table",

        components: {
            "download-excel" : JsonExcel,
        },
        props: [
            'columns', 'data', 'tags', 'metric'
        ],

        data() {
          return {

              tableData: [],
              dataEnd: [],
              currentPage: 1,
              pagesize: 100,
              filterText: '',

              excel: {
                  json_fields: {
                      'Complete name': 'name',
                  },
                  json_data: [
                      {
                          'name': 'Tony Peña',
                      },
                      {
                          'name': 'Thessaloniki',
                      }
                  ],
                  json_meta: [
                      [
                          {
                              'key': 'charset',
                              'value': 'utf-8'
                          }
                      ]
                  ],
              },

          }
        },

        computed: {
            excelFileds: function () {
                let fileds = {};
                this.tags.forEach(tag=>{
                    fileds[tag] = tag;
                });
                fileds['date'] = 'date';
                fileds['value'] = 'value';
                return fileds;
            }
        },

        created() {
            Bus.$on("table-data-change", (data)=>{
                debugger;
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
                            value['index'] = index;
                            this.dataEnd.push(value);
                        }
                    });

                    //检索后当前页设为1
                    this.currentPage = 1;
                }
            },
            alter: function(row){
                debugger;
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
            },

            handleDelete: function (index, row) {
                let postJson = {};

                let tags = {};
                this.tags.forEach(item=>{
                    tags[item] = row[item];
                });

                postJson['metrics'] = [];
                postJson.metrics.push({tags: tags, name: this.metric});
                postJson['plugins'] = [];
                postJson['cache_time'] = 0;
                postJson['start_absolute'] = row.time;
                postJson['end_absolute'] = row.time;

                this.$util.axios.post(this.$kdb.url + '/api/v1/datapoints/delete', postJson).then((response)=>{

                    this.loading = false;
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.dataEnd.splice(index, 1);
                    if(typeof row.index != 'undefined') {
                        this.tableData.splice(row.index, 1);
                    }
                }, response => {
                    this.loading = false;
                    this.$message.error('删除失败');
                })
            }
        }

    }
</script>

<style scoped>
</style>