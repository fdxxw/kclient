<template>

    <el-form-item label="Metric">
        <el-select v-model="input" size="small" :style="{width: width}" filterable placeholder="请选择" @change="change">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>


</template>

<script>

    import Bus from '../bus'

    export default {
        name: 'metric',
        data() {
            return {
                options: [],
                input: '',
                width: '20em',

            }
        },

        created() {
            Bus.$on("change-kdb", ()=> {
                this.getMetric();
            })
        },

        mounted() {
            this.getMetric();
        },

        methods: {
            getMetric: function () {
                this.options = [];
                var defaultWidth = 20;
                this.$util.axios.get(this.$kdb.url + '/api/v1/metricnames').then(response => {
                    var o = null;
                    for(var i = 0; o = response.data.results[i++];) {
                        if(o.length > defaultWidth) {
                            this.width = o.length + 'em';
                        }
                        this.options.push({label: o, value: o});
                    }
                    console.log(this.options);
                }, response => {
                    // error callback
                })
            },

            change: function () {
                this.$emit("message", this.input);
                Bus.$emit('change-metric', this.input);
            }
        }
    }
</script>

<style scoped>

</style>