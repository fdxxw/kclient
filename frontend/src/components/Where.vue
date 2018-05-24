<template>
    <div>

        Where:
        Tags


        <el-button icon="el-icon-plus" circle size="mini" @click="addWhere"></el-button>

        <el-autocomplete :fetch-suggestions="querySearch" @focus="onFocus(item.name)" style="display: block" placeholder="请输入内容" v-model="item.value" v-for="(item, index) in wheres" :key="index" @change="change">
            <el-select v-model="item.name" slot="prepend" placeholder="请选择" style="width: 130px" @change="change">
                <el-option
                        v-for="tag in tags"
                        :key="tag.value"
                        :label="tag.label"
                        :value="tag.value">
                </el-option>
            </el-select>
            <el-button slot="append" @click="deleteCurr(index)">-</el-button>
        </el-autocomplete>


    </div>
</template>

<script>

    import Bus from '../bus'
    export default {
        name: "Where",
        data() {
            return {
                wheres: [],
                tags:[],
                tagsValue: {},
                currTagValues: [],
            }
        },

        mounted() {
            Bus.$on('change-tags', (tags)=> {
                this.tags = tags[0]; //tag key
                this.tagsValue = tags[1]; //tag key and value
            })
        },

        methods: {
            deleteCurr: function (index) {
                this.wheres.splice(index, 1);
                Bus.$emit('change-where', this.wheres);
            },

            addWhere: function () {
                this.wheres.push({name: this.tags[0].value, value: ''});
            },

            change: function () {
                Bus.$emit('change-where', this.wheres);
            },

            querySearch: function (queryString, cb) {

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
        }
    }
</script>

<style scoped>

</style>