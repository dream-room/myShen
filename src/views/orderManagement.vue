<template>
    <div>
        <Alert>订单管理</Alert>
        <Form ref="formInline" :model="formInline" inline :label-width="80" >
            <FormItem label="订单号">
                <Input type="text" v-model="formInline.user" placeholder="" clearable>
                </Input>
            </FormItem>
            <FormItem label="订单名称">
                <Input type="text" v-model="formInline.user" placeholder="" clearable>
                </Input>
            </FormItem>
            <FormItem label="订单时间">
                <DatePicker type="daterange" :options="options2" placement="bottom-end" placeholder="选择时间段" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem  style="float: right">
                <Button type="success" @click="addOne">新增</Button>
                <Button type="primary" shape="circle" icon="ios-search"></Button>
            </FormItem>
            <!--</Row>-->
        </Form>
        <div>
            <Table stripe :columns="columns1" :data="data1" ></Table>
            <div style="margin: 10px">
                <div style="float: right;">
                    <Page :total="count" show-elevator @on-change="getOnePage" :current="1" show-total :page-size="currentPage"></Page>
                </div>
            </div>
        </div>

    </div>



</template>
<script>
    export default {
        data(){
            return{
                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        align:'center',
                        width:"70px"
                    },
                    {
                        title: '名称',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        align:'center'
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        align:'center'
                    },
                    {
                        title: 'Date',
                        key: 'date',
                        align:'center'
                    }
                ],
                data1: [],
                formInline: {
                    user: '',
                    password: ''
                },
                count:0,
                currentPage:10,
                options2: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    },
                    shortcuts: [
                        {
                            text: '近一星期',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '近一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '近三个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            getOnePage(page){
                console.log(page)
            }
        }

    }
</script>