<template>
    <div>
        <el-form-item label="Group By">
            <el-select v-model="groupType" filterable placeholder="请选择" size="small">
                <el-option
                        label="Tags"
                        value="tags">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="Tags">
            <el-select v-model="input" size="small" :style="{width: width}" multiple filterable placeholder="请选择" @change="change">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </div>

</template>

<script>
    import Bus from '../bus'

    export default {
        name: "groupBy",

        data() {
            return {
                options: [],
                input: '',
                width: '20em',
                groupType: 'tags',
            }
        },

        mounted() {
            Bus.$on('change-metric',(metricName) => {

                this.getTags(metricName);
            });

        },

        methods: {
            getTags: function (metricName) {
                this.options.length = 0;
                let defaultWidth = 20;
                var json = {"metrics":[{"tags":{},"name": metricName}],"plugins":[],"cache_time":0,"start_absolute":0};
                this.$util.axios.post(this.$kdb.url + '/api/v1/datapoints/query/tags', json).then(response => {
                    var tags = response.data.queries[0].results[0].tags;
                    for(var key in tags) {
                        /*if(key.length > defaultWidth) {
                            this.width = key.length + 'em';
                        }*/
                        defaultWidth += key.length;
                        this.options.push({label: key, value: key});
                    }
                    this.width = defaultWidth + 'em';
                    console.log(this.options);
                    Bus.$emit('change-tags', this.options);
                }, response => {
                    // error callback
                })
            },
            
            change: function () {
                Bus.$emit('changeGroupBy', this.input);
            }
        }
    }
</script>

<style scoped>

</style>