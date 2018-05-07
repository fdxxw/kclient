<template>
    <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="添加Metric" name="addMetric">

        </el-tab-pane>
        <el-tab-pane label="添加数据点" name="addData">
            <div style="display: flex; justify-content: center">
                <el-form label-position="left">
                    <metric v-on:message="updateMetric"></metric>
                    <el-form-item v-for="(item, index) in totalTags" :key="index" :label="item.label" label-width="120px">

                        <el-input v-model="item.value"></el-input>
                    </el-form-item>
                    <el-form-item label-width="120px" label="数据粒度/分钟">
                        <el-input-number v-model="range"></el-input-number>
                    </el-form-item>
                    <date-picker v-on:message="updateDate"></date-picker>

                    <el-form-item label="数据值" label-width="120px">
                        <el-input v-model="value"></el-input>
                    </el-form-item>
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
                range: 5,
                activeName: 'addData',
                metricName: '',
                tags: {},
                datapoints: [],
                date:[],
                value: 30.3333,
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
                this.$util.axios.post(this.$kdb.url + '/api/v1/datapoints/query/tags', json).then(response => {
                    var tags = response.data.queries[0].results[0].tags;
                    for(var key in tags) {

                        this.totalTags.push({label: key, name: key, value: ''});
                    }
                }, response => {
                    // error callback
                })
            },

            submit: function () {

                this.clearParam();

                for(let i = 0, o; o = this.totalTags[i++];) {
                    this.tags[o.name] = o.value;
                }

                let timestamp = this.date[0];

                while (timestamp <= this.date[1]) {
                    this.datapoints.push([timestamp, this.value]);
                    timestamp = timestamp + this.range*60*1000;
                }
                let postJson = [{
                    name: this.metricName,
                    tags: this.tags,
                    datapoints: this.datapoints,
                }];
                this.$util.axios.post(this.$kdb.url + '/api/v1/datapoints', postJson).then((response)=>{
                    console.log(response);
                })
            },

            clearParam: function () {
                this.tags = {};
                this.datapoints = [];
            }
        },
    }
</script>

<style scoped>

</style>