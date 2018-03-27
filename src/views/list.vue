
<template>
    <div>
        <Row>
            <Col span="24">
            <div  style="float: right">
                <Button type="success" @click="addOne" size="large">新增</Button>
                <!--<Button type="primary" shape="circle" icon="ios-search" @click="selectDate"></Button>-->
                <Button type="primary"@click="selectDate" size="large">搜索</Button>
            </div>
            </Col>
        </Row>
        <div>
            <Table stripe :columns="columns1" :data="model" border no-data-text="点击搜索查看数据吧！" width="100%" style="margin-top: 10px" size="large"></Table>
            <div style="margin: 10px">
                <div style="float: right;">
                    <Page :total="count" show-elevator @on-change="getOnePage" :current="current" show-total :page-size="currentPage"></Page>
                </div>
            </div>
        </div>
        <div>
            <Modal
                    v-model="modal1"
                    title="新增用户"
                    :loading="addLoading"
                    @on-ok="addOk"
                    :mask-closable="false"
                    @on-cancel="addCancel">
                <Form :model="formItem" :label-width="80" :rules="addRuleInline">
                    <FormItem label="姓名" prop="name">
                        <Input v-model="formItem.name" placeholder="请输入姓名" />
                    </FormItem>
                    <FormItem label="编号" prop="no">
                        <Input v-model="formItem.no" placeholder="请输入编号" />
                    </FormItem>
                    <FormItem label="密码" prop="password">
                        <Input v-model="formItem.password" placeholder="请输入密码" type="password" />
                    </FormItem>
                </Form>
            </Modal>
            <Modal
                    v-model="changeModal"
                    title="修改用户"
                    :loading="changeLoading"
                    @on-ok="changeOk"
                    @on-cancel="changeCancel">
                <Form :model="changeData" :label-width="80" :rules="addRuleInline">
                    <FormItem label="姓名" prop="name">
                        <Input v-model="changeData.name" placeholder="请输入姓名" />
                    </FormItem>
                    <FormItem label="编号" prop="no">
                        <Input v-model="changeData.no" placeholder="请输入编号" />
                    </FormItem>
                    <!--<FormItem label="密码" prop="password">-->
                    <!--<Input v-model="changeData.password" placeholder="请输入密码" type="password" />-->
                    <!--</FormItem>-->
                </Form>
            </Modal>
            <Modal v-model="deleteModel" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>删除</span>
                </p>
                <div style="text-align:center">
                    <p>删除后可能对系统造成不可预计的影响</p>
                    <p>确认删除？</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long  @click="del">确认</Button>
                </div>
            </Modal>
        </div>
    </div>

</template>
<script>
    import { checkNull,checkNumber }  from '../Tools/checkMethod'
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        align:'center',
                        width:"70px"
                    },
                    {
                        title: '表单名称',
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
                                        size: 'large'
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
                                        size: 'large'
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
                model: [],
                count:0,
                current:1,
                currentPage:10,
                modal1: false,
                formInline: {
                    user: '',
                    password: ''
                },
                addLoading: true,
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
                },
                changeModal:false,
                changeLoading:true,
                changeData:{},
                deleteModel:false,
                deleteData:''
            }
        },
        mounted () {
            console.log(this.URL)
            this.selectDate();

        },
        methods:{
            selectDate(){
                let self=this
                let postData= {
                    "page": self.current-1,
                    "size":self.currentPage
                }
               this.$http.get(this.URL+'/users',{params:postData}).then(response => {
                   self.model=response.body.content
                   self.count=response.body.totalElements
                   console.log(self.model)
               }, response => {
                   // error callback
               });

            },
            getOnePage(page){
                var self=this;
                self.current=page;
                self.selectDate()
//                console.log("当前页面为："+page)
            },
            changeOne(data){
                var self=this
                self.changeData={}
                self.changeData = JSON.parse(JSON.stringify(data))
                self.changeModal=true;
                console.log(changeData)
            },
            changeCancel(){
                this.$Message.info('取消修改！！');
            },
            changeOk(){

                var self=this;
                this.changeLoading = false
                this.$nextTick(() => { this.addLoading = true })
                if(checkNull([this.changeData.name,this.changeData.no]).isNull)
                {
                    this.$Message.error('请填写全部数据');
                    return;
                }
               this.$http.post(this.URL+'/users',JSON.stringify(this.changeData)).then(response => {
                   self.changeModal=false;
                   this.$Message.success('修改成功！！');
                   self.selectDate();
               }, response => {
                   // error callback
               });
            },
            deleteOne(data){
                var self= this
                self.deleteData = JSON.parse(JSON.stringify(data.id))
                self.deleteModel=true
            },
            del(){
                var self=this
               this.$http.delete(this.URL+'/users/'+ this.deleteData)
                   .then(response => {
                       self.deleteModel=false
                       this.$Message.success('删除成功！！');
                       self.selectDate();
                   }, response => {
                       // error callback
                   });
            },

            addOk () {
                let self=this;
                this.addLoading = false
                this.$nextTick(() => { this.addLoading = true })
//                if(checkNull([this.formItem.name,this.formItem.no,this.formItem.password]).isNull)
//                {
//                    this.$Message.error('请填写全部数据');
//                    return;
//                }
                let sendData={
                    name:self.formItem.name,
                    no:self.formItem.no,
                    password:self.formItem.password
                }

               this.$http.post(this.URL+'/users',sendData).then(response => {
                   self.modal1=false;
                   this.$Message.success('新增成功！！');
                   self.selectDate();
               }, response => {
                   // error callback
               });
            },
            addCancel () {
                this.$Message.info('取消新增！！');
            },
            addOne(){
                var self= this;
                self.modal1=true;
                self.formItem={};
            }
        }

    }
</script>