<template>
    <div>
        <Alert>物品管理</Alert>
        <Form  :model="formInline" inline :label-width="80" >
            <FormItem label="物品名称">
                <Input type="text" v-model="formInline.name" placeholder="" clearable disabled>
                </Input>
            </FormItem>
            <!--<FormItem label="订单名称">-->
                <!--<Input type="text" v-model="formInline.user" placeholder="" clearable>-->
                <!--</Input>-->
            <!--</FormItem>-->
            <!--<FormItem label="订单时间">-->
                <!--<DatePicker type="daterange" :options="options2" placement="bottom-end" placeholder="选择时间段" style="width: 200px"></DatePicker>-->
            <!--</FormItem>-->
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
    export default{
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
                        title: '规格',
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
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.changeOne(params.row)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteOne(params.row)
                                        }
                                    }
                                }, '禁用')
                            ]);
                        }
                    }
                ],

            }
        },
        methods:{

        }

    }
</script>