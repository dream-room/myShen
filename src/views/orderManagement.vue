<template>
    <div>
        <Form ref="formInline" :model="formInline" inline :label-width="80" >
            <FormItem label="订单号">
                <Input type="text" v-model="formInline.user" placeholder="">
                </Input>
            </FormItem>
            <FormItem label="订单号">
                <Input type="text" v-model="formInline.user" placeholder="">
                </Input>
            </FormItem>
            <FormItem  style="float: right">
                <Button type="primary" @click="addOne">新增</Button>
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
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                },
                count:0,
                currentPage:10,
            }
        },
        methods: {
            getOnePage(page){
                console.log(page)
            }
        }

    }
</script>