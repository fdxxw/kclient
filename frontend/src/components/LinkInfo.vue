<template>
    <el-form>
        <el-form-item label="kairosdb url">
            <el-input v-model="kdb.url" @change="change"></el-input>
        </el-form-item>
        <el-form-item label="关系数据库 url">
            <el-input v-model="rdb.url"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    import Bus from '../bus';
    export default {
        name: "LinkInfo",

        data() {
            return {
                //kairosdb url
                kdb: {
                    url: this.$kdb.url,
                },
                //关系数据库 url
                rdb: {
                    url: this.$rdb.url,
                },
            }
        },

        created() {

        },

        methods: {
            change: function () {
                this.$kdb.url = this.kdb.url;
                Bus.$emit("change-kdb")
            }
        }
    }
</script>

<style scoped>

</style>