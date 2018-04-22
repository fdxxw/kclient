<template>
  <el-container>
    <el-header>Header</el-header>


    <el-container >
      <el-main>
        <el-form :inline="true">
          <metric v-on:message="updateMetric"></metric>
          <date-picker v-on:message="updateDate"></date-picker>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">submit</el-button>
          </el-form-item>
        </el-form>

        <el-form :inline="true">
          <group-by></group-by>
        </el-form>
        <data-table v-bind="tableData"></data-table>
      </el-main>



    </el-container>
  </el-container>
</template>

<script>
  import Metric from "./Metric"
  import DatePicker from "./DatePicker"
  import Table from "./Table"
  import GroupBy from "./GroupBy"
  import Bus from '../bus'

  export default {
      components: {
          'metric': Metric,
          'date-picker': DatePicker,
          'data-table': Table,
          'group-by': GroupBy
      },

      data() {
          return {
              metric: '',
              startDate: null,
              endDate: null,
              tableData:{columns: [], data: []},
              tags: [],
          }
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

              this.tableData.columns.push({key: 'date', name: 'date'});
              this.tableData.columns.push({key: 'value', name: 'value'});
          })
      },

      methods: {
          updateMetric: function(metric) {
              console.log(metric);
              this.metric = metric;
          },

          updateDate: function (date) {
              console.log(date);
              this.startDate = date[0];
              this.endDate = date[1];
          },

          onSubmit: function () {
              const json = {};
              const groupBy = [];
              groupBy.push({name: 'tag', tags: this.tags});
              json['metrics'] = [];
              json.metrics.push({tags: {}, name: this.metric, group_by: groupBy});
              json['plugins'] = [];
              json['cache_time'] = 0;
              this.startDate.setMilliseconds(0);
              this.endDate.setMilliseconds(0);
              json['start_absolute'] = this.startDate.getTime();
              json['end_absolute'] = this.endDate.getTime();
              this.$http.post(this.$url + '/api/v1/datapoints/query',json).then((response)=> {
                  console.log(response);
                  let results = response.data.queries[0].results;
                  let o;
                  let dataPoints = [];
                  let dataPoint;
                  let value;
                  for(let i = 0; o = results[i++];) {

                      if(Object.keys(o['tags']).length === 5) {

                          for(let j = 0; value = o.values[j++];) {
                              dataPoint = {};
                              for(let key in o.tags) {
                                  dataPoint[key + ''] = o.tags[key + ''][0];
                              }
                              dataPoint['date'] = this.$moment(new Date(value[0])).format('YYYY-MM-DD HH:mm:ss.SSS');
                              dataPoint['value'] = value[1];
                              dataPoints.push(dataPoint)
                          }
                      }
                  }

                  this.tableData.data = dataPoints;

              })
              .catch(function (error) {
                  console.log(error);
              });
          }
      }
  }
</script>