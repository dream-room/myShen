<template>
        <div>
                <Row>
                        <Col span="4" offset="6">
                                <Alert >
                                        <h1>20</h1>
                                        <template slot="desc">正在进行的订单</template>
                                </Alert>
                        </Col>
                        <Col span="4">
                                <Alert type="warning">
                                        <h1 style="color: red">10</h1>
                                        <template slot="desc">今天需要交货的订单数量</template>
                                </Alert>
                        </Col>
                        <Col span="4">
                                <Alert type="success">
                                        <h1 >10</h1>
                                        <template slot="desc">本月已完成订单</template>
                                </Alert>
                        </Col>
                </Row>
                <div class="line"></div>

                <div id="main" style="width: 1000px;height:600px;margin:0 auto;"></div>
        </div>


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
                        text: '堆叠区域图'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : dateData
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'邮件营销',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'联盟广告',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'视频广告',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'直接访问',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'搜索引擎',
                            type:'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {normal: {}},
                            data:[820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };
                myChart.setOption(option);

            }



        }



    }

</script>
<style>
        .line{
                width: 100%;
                height: 2px;
                background-color: #dddddd;
                margin-top: 20px;
                margin-bottom: 20px;
        }
</style>