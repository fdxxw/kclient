<template>
    <el-tabs v-model="activeName" type="card" v-loading="loading">
        <el-tab-pane label="添加Metric" name="addMetric">

            <div style="display: flex; justify-content: center">
                <el-form label-position="left">
                    <el-form-item label="Metric" label-width="80px">
                        <el-input v-model="inputMetricName" placeholder="输入Metric名称"></el-input>
                    </el-form-item>
                    <el-form-item label="Tags" label-width="80px">
                        <el-tag
                                :key="tag"
                                v-for="tag in dynamicTags"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                                class="input-new-tag"
                                v-if="inputTagVisible"
                                v-model="inputTagValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </el-form-item>
                    <el-form-item label-width="80px">
                        <el-button type="primary" @click="addMetric" size="small">Add</el-button>
                    </el-form-item>
                </el-form>
            </div>
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
                value: '40.3322',
                loading: false,

                //添加Metric
                inputMetricName: '',
                dynamicTags: [],
                inputTagVisible: false,
                inputTagValue: ''
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

                    this.loading = false;

                }, response => {
                    // error callback
                    this.loading = false;

                })
            },

            submit: function () {

                if(this.value.indexOf('.') === -1) {
                    this.$message.warning('数据值必须为浮点数');
                    return;
                }

                this.clearParam();

                for(let i = 0, o; o = this.totalTags[i++];) {
                    this.tags[o.name] = o.value;
                }

                let timestamp = this.date[0];

                while (timestamp <= this.date[1]) {
                    this.datapoints.push([timestamp, parseFloat(this.value)]);
                    timestamp = timestamp + this.range*60*1000;
                }
                let postJson = [{
                    name: this.metricName,
                    tags: this.tags,
                    datapoints: this.datapoints,
                }];
                debugger;
                this.$util.axios.post(this.$kdb.url + '/api/v1/datapoints', postJson).then((response)=>{
                    console.log(response);
                    if(response.status = '') {

                    }
                    this.loading = false;
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                }, response => {
                    this.loading = false;
                    this.$message.error('添加失败');
                })
            },

            addMetric: function() {
                let tags = {};
                this.dynamicTags.forEach(item => {
                   tags[item] = 'first';
                });
                let postJson = [{
                    name: this.inputMetricName,
                    datapoints: [[0,0]],
                    tags: tags,
                }];
                debugger;

                this.$util.axios.post(this.$kdb.url + '/api/v1/datapoints', postJson).then((response)=>{
                    console.log(response);
                    if(response.status = '') {

                    }
                    this.loading = false;
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                }, response => {
                    debugger;
                    this.loading = false;
                    this.$message.error('添加失败');
                })
            },
            clearParam: function () {
                this.tags = {};
                this.datapoints = [];
            },


            /* 添加Metric方法区域 */

            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputTagVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputTagValue = this.inputTagValue;
                if (inputTagValue) {
                    this.dynamicTags.push(inputTagValue);
                }
                this.inputTagVisible = false;
                this.inputTagValue = '';
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