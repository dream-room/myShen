<template>
<div>
    <Alert>权限管理</Alert>
        <Row>
            <Form ref="formInline" :model="formInline" inline :label-width="80" >
                <FormItem label="订单号">
                    <Input type="text" v-model="formInline.user" placeholder="">
                    </Input>
                </FormItem>
                <FormItem label="订单号">
                    <Input type="text" v-model="formInline.name" placeholder="">
                    </Input>
                </FormItem>
                <FormItem  style="float: right">
                    <Button type="success" @click="addOne">新增权限</Button>
                    <Button type="primary" shape="circle" icon="ios-search"  @click="selectDate"></Button>
                </FormItem>

            </Form>
        </Row>
    <Table stripe :columns="columns1" :data="data1" border no-data-text="点击搜索查看数据吧！" width="100%" style="margin-top: 10px"></Table>
    <div style="margin: 10px">
        <div style="float: right;">
            <Page :total="count" show-elevator @on-change="getOnePage" :current="current" show-total :page-size="currentPage"></Page>
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
                        title: '姓名',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '编号',
                        align: 'center',
                        key: 'no'
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
//                                            this.show(params.index)
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
//
                                            this.deleteOne(params.row)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                formInline: {
                    user: ''
                },
                data1:[],
                current:1,
                currentPage:10,
                count:0

            }
        },
        methods:{
            selectDate(){

            },
            addOne(){

            },

        }

    }
</script>