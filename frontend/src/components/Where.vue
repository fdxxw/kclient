<template>
    <div>

        Where:
        Tags


        <el-button icon="el-icon-plus" circle size="mini" @click="addWhere"></el-button>

        <el-input placeholder="请输入内容" v-model="item.value" v-for="(item, index) in wheres" :key="index" @change="change">
            <el-select v-model="item.name" slot="prepend" placeholder="请选择" style="width: 130px" @change="change">
                <el-option
                        v-for="tag in tags"
                        :key="tag.value"
                        :label="tag.label"
                        :value="tag.value">
                </el-option>
            </el-select>
            <el-button slot="append" @click="deleteCurr(index)">-</el-button>
        </el-input>


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
            }
        },

        mounted() {
            Bus.$on('change-tags', (tags)=> {
                this.tags = tags;
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
            }
        }
    }
</script>

<style scoped>

</style>