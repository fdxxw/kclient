<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick"
             v-loading="loading"
             element-loading-text="拼命加载中">
        <el-tab-pane label="链接信息" name="urlInfo">

            <link-info></link-info>
        </el-tab-pane>
        <el-tab-pane label="条件" name="condition">

            <el-form :inline="true" label-position="left">
                <metric v-on:message="updateMetric"></metric>
                <date-picker v-on:message="updateDate"></date-picker>
                <el-form-item>
                    <el-button type="primary" @click="submit" size="small">submit</el-button>
                </el-form-item>
            </el-form>

            <el-form :inline="true" label-position="left">
                <group-by v-bind:metric-name="metric"></group-by>
            </el-form>


            <where></where>
        </el-tab-pane>
        <el-tab-pane label="结果" name="queryResult">

            <data-table v-bind="tableData"></data-table>
        </el-tab-pane>

        <el-tab-pane label="添加" name="insert">

            <insert></insert>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import Metric from "./Metric"
    import DatePicker from "./DatePicker"
    import Table from "./Table"
    import GroupBy from "./GroupBy"
    import Where from './Where'
    import LinkInfo from './LinkInfo';
    import Insert from './Insert';
    import Bus from '../bus'
    export default {
        name: 'tabPane',
        components: {
            'metric': Metric,
            'date-picker': DatePicker,
            'data-table': Table,
            'group-by': GroupBy,
            'where': Where,
            'link-info': LinkInfo,
            'insert': Insert,
        },
        data() {
            return {
                activeName: 'urlInfo',
                metric: '',
                startDate: null,
                endDate: null,
                tableData:{columns: [], data: [], tags: [], metric: ''},
                tags: [],
                where: {},
                loading: false,
            };
        },
        created () {
            let that = this;
        },
        mounted() {
            Bus.$on('changeGroupBy', (data)=>{
                this.tags = data;

                this.tableData.columns.length = 0;
                this.tableData.data.length = 0;
                this.pointTemplate = {};
                let o;
                for(let i = 0; o = this.tags[i++];) {
                    this.tableData.columns.push({key: o, name: o});
                    this.pointTemplate[o] = '';
                }

            });

            Bus.$on('change-where', (wheres) => {
                debugger;
                let o;
                var where = {};
                for(let i = 0; o = wheres[i++];) {
                    if(typeof  where[o.name] === 'undefined') {
                        where[o.name] = [];
                    }
                    where[o.name].push(o.value);
                }
                this.where = where;
            })
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            updateMetric: function(metric) {
                console.log(metric);
                this.metric = metric;
            },

            updateDate: function (date) {
                console.log(date);
                this.startDate = date[0];
                this.endDate = date[1];
            },

            submit: function () {
                debugger;
                const json = {};
                const groupBy = [];
                groupBy.push({name: 'tag', tags: this.tags});
                json['metrics'] = [];
                json.metrics.push({tags: this.where, name: this.metric, group_by: groupBy});
                json['plugins'] = [];
                json['cache_time'] = 0;
                this.startDate.setMilliseconds(0);
                this.endDate.setMilliseconds(0);
                json['start_absolute'] = this.startDate.getTime();
                json['end_absolute'] = this.endDate.getTime();

                this.loading = true;

                this.$util.axios.post(this.$kdb.url + '/api/v1/datapoints/query',json).then((response)=> {
                    console.log(response);
                    let results = response.data.queries[0].results;
                    let o;
                    let dataPoints = [];
                    let dataPoint;
                    let value;
                    for(let i = 0; o = results[i++];) {

                        if(Object.keys(o['tags']).length === this.tags.length) {

                            for(let j = 0; value = o.values[j++];) {
                                dataPoint = {};
                                for(let key in o.tags) {
                                    dataPoint[key + ''] = o.tags[key + ''][0];
                                }
                                dataPoint['date'] = this.$util.moment(new Date(value[0])).format('YYYY-MM-DD HH:mm:ss.SSS');
                                dataPoint['time'] = value[0];
                                dataPoint['value'] = value[1];
                                dataPoint['editFlag'] = false;
                                dataPoints.push(dataPoint)
                            }
                        }
                    }

                    this.tableData.data = dataPoints;
                    this.tableData.metric = this.metric;
                    this.tableData.tags = this.tags;
                    Bus.$emit('table-data-change', dataPoints);
                    this.loading = false;
                    this.activeName = 'queryResult';

                })
                    .catch(function (error) {
                        console.log(error);
                        this.loading = false;
                    });
            }

        }
    };
</script>

<style scoped>

</style>
