<template>
    <el-tabs v-model="activeName" type="card" v-loading="loading">

        <el-tab-pane label="删除数据点" name="deleteData">
            <div style="display: flex; justify-content: center">
                <el-form label-position="left">
                    <metric v-on:message="updateMetric"></metric>
                    <el-form-item v-for="(item, index) in totalTags" :key="index" :label="item.label" label-width="120px">

                        <el-autocomplete style="width: 100%" @focus="onFocus(item.name)" :fetch-suggestions="querySearch" multiple v-model="item.value"></el-autocomplete>
                    </el-form-item>

                    <date-picker v-on:message="updateDate"></date-picker>

                    <el-form-item label-width="120px">
                        <el-button type="primary" @click="submit" size="small">submit</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
    </el-tabs>

</template>

<script>
    import Metric from './Metric';
    import DatePicker from "./DatePicker"
    export default {
        name: "insert",
        components: {
            'metric': Metric,
            'date-picker': DatePicker,
        },

        data() {
            return {

                labelPosition: 'right',
                totalTags:[],
                activeName: 'deleteData',
                metricName: '',
                tags: {},
                date:[],
                value: '40.3322',
                loading: false,
                tagsValue: {},
                currTagValues: [],

            }
        },

        created() {

        },

        methods: {
            updateMetric: function(metricaName) {
                this.metricName = metricaName;
                this.getTags(metricaName);
            },

            updateDate: function(date) {
                debugger;
                this.date = date.map((item)=>{
                    item.setMilliseconds(0);
                    return item.getTime();
                });

            },
            getTags: function (metricName) {

                this.totalTags = [];

                var json = {"metrics":[{"tags":{},"name": metricName}],"plugins":[],"cache_time":0,"start_absolute":0};
                this.loading = true;
                this.$util.axios.post(this.$kdb.url + '/api/v1/datapoints/query/tags', json).then(response => {
                    var tags = response.data.queries[0].results[0].tags;
                    for(var key in tags) {

                        this.totalTags.push({label: key, name: key, value: ''});
                    }

                    this.tagsValue = tags;
                    this.loading = false;

                }, response => {
                    // error callback
                    this.loading = false;

                })
            },

            submit: function () {

                this.clearParam();

                for(let i = 0, o; o = this.totalTags[i++];) {
                    this.tags[o.name] = [o.value];
                }

                let startDate = this.date[0];
                let endDate = this.date[1];

                let postJson = {};

                postJson['metrics'] = [];
                postJson.metrics.push({tags: this.tags, name: this.metricName});
                postJson['plugins'] = [];
                postJson['cache_time'] = 0;
                postJson['start_absolute'] = startDate;
                postJson['end_absolute'] = endDate;

                this.$util.axios.post(this.$kdb.url + '/api/v1/datapoints/delete', postJson).then((response)=>{

                    this.loading = false;
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }, response => {
                    this.loading = false;
                    this.$message.error('删除失败');
                });
            },

            clearParam: function () {
                this.tags = {};
                this.datapoints = [];
            },


            querySearch: function (queryString, cb) {

                debugger;
                let results = queryString ? this.currTagValues.filter(this.filter(queryString)) : this.currTagValues;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },

            filter(queryString) {
                return (item) => {
                    return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
                };
            },

            onFocus: function (name) {
                this.currTagValues = [];
                this.tagsValue[name].forEach(item => {
                    this.currTagValues.push({value: item});
                });
            }
        },
    }
</script>

<style scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>