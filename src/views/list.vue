
<template>
    <div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline >
            <FormItem>
                <Input type="text" v-model="formInline.user" placeholder="用户名" >
                <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem  style="float: right">
                <Button type="primary" @click="addOne">新增</Button>
                <Button type="primary" shape="circle" icon="ios-search" @click="selectDate"></Button>
            </FormItem>
        </Form>
        <div>
            <Table stripe :columns="columns1" :data="model" border></Table>
        <div style="margin: 10px">
            <div style="float: right;">
                <Page :total="count" show-elevator @on-change="getOnePage" :current="1" show-total :page-size="currentPage"></Page>
            </div>
        </div>
        </div>
        <div>
            <Modal
                    v-model="modal1"
                    title="Common Modal dialog box title"
                    @on-ok="add"
                    @on-cancel="cancel">
                <Form :model="formItem" :label-width="80" :rules="addRuleInline">
                    <FormItem label="姓名" prop="name">
                        <Input v-model="formItem.name" placeholder="请输入姓名" />
                    </FormItem>
                    <FormItem label="编号" prop="no">
                        <Input v-model="formItem.no" placeholder="请输入编号" />
                    </FormItem>
                    <FormItem label="密码" prop="password">
                        <Input v-model="formItem.password" placeholder="请输入密码" />
                    </FormItem>
                </Form>
            </Modal>
        </div>
    </div>

</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: 'Name',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        align: 'center',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        align: 'center',
                        key: 'address'
                    },
                    {
                        title: 'Date',
                        align: 'center',
                        key: 'date'
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
                                            this.ok(params)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
//                                            this.remove(params.index)
                                            this.cancel(params)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                model: [],
                count:0,
                currentPage:10,
                modal1: false,
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                },
                formItem: {
                    name: '',
                    no:'',
                    password:''

                },
                addRuleInline: {
                    name: [
                        { required: true, message: '请输入信息', trigger: 'blur' }
                    ],
                    no: [
                        { required: true, message: '请输入编号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            selectDate(){


            },
            getOnePage(page){
                console.log("当前页面为："+page)
            },
            add (data) {
                this.$Message.info('Clicked ok');
            },
            cancel (data) {
                this.$Message.info('Clicked cancel');
            },
            addOne(){
                var self= this;
                self.modal1=true;
            }
        }

    }
</script>