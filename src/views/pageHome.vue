<template>

        <div id="main" style="width: 800px;height:600px;margin:0 auto;"></div>


</template>
<script>
    import {getToday} from '../Tools/timeMethod'
    export default {
        data(){
            return{

            }
        },
        mounted () {
            this.showCharts();
        },
        methods:{
            showCharts(){
                //根据id获取图表
                let myChart = this.$echarts.init(document.getElementById('main'))
                let dateData=[]
                let oneDate=getToday()
                for(let i=0;i<7;i++)
                {
                    dateData.push(getToday(oneDate))
                }
                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: '订单详情'
                    },
                    tooltip: {},
                    legend: {
                        data:['数量']
                    },
                    xAxis: {
                        data: dateData
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20,50]
                    }]
                };
                myChart.setOption(option);

            }



        }



    }

</script>