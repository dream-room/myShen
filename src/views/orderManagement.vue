<template>
    <div>
        <Alert>订单管理</Alert>
        <div>
            <Form  :model="selectModel" inline :label-width="20">
                <FormItem>
                    <label style="font-size: 20px;vertical-align: middle">订单编号：</label>
                    <Input type="text" v-model="selectModel.no" placeholder="输入订单编号" clearable style="width: 200px;" >
                    </Input>
                </FormItem>
                <FormItem>
                    <label style="font-size: 20px;vertical-align: middle">订单公司：</label>
                    <Input type="text" v-model="selectModel.name" placeholder="输入下单公司名称" clearable style="width: 200px" >
                    </Input>
                </FormItem>
                <FormItem>
                    <label style="font-size: 20px;vertical-align: middle">订单时间：</label>
                    <DatePicker type="daterange" placeholder="选择下单时间段" style="width: 200px" v-model="selectModel.createTime"></DatePicker>
                    </Input>
                </FormItem>
                <FormItem  style="float: right">
                    <Button type="success" @click="addOne" size="large">新增</Button>
                    <Button type="primary" @click="selectData" size="large">搜索</Button>
                </FormItem>
                <!--</Row>-->
            </Form>
        </div>
        <div>
            <RadioGroup v-model="orderType" type="button" @on-change="selectDataByType" size="large">
                <Radio label="1">编辑中</Radio>
                <Radio label="2">进行中</Radio>
                <Radio label="3">已完成</Radio>
                <Radio label="4">已取消</Radio>
            </RadioGroup>
            <Table stripe :columns="searcherColumns" :data="model" border no-data-text="你好像还没有添加数据哦！" width="100%" style="margin-top: 10px" size="large"></Table>
            <div style="margin: 10px">
                <div style="float: right;">
                    <Page :total="count" show-elevator @on-change="getOnePage" :current="current" show-total :page-size="currentPage"></Page>
                </div>
            </div>
        </div>
        <div>
            <!--//添加-->
            <Modal
                    v-model="showAddModel"
                    width="600"
                    title="新增订单">
                <Form  ref="addModel" :model="addModel" :label-width="100" :rules="addRuleInline"  >
                    <FormItem label="订单编号" prop="no" >
                        <Input v-model="addModel.no" placeholder="请输入编号" />
                    </FormItem>
                    <FormItem label="订单名称" prop="name">
                        <Input v-model="addModel.name" placeholder="请输入名称" />
                    </FormItem>
                    <FormItem label="订单公司" prop="company">
                        <Input v-model="addModel.company" placeholder="请输入名称" />
                    </FormItem>
                    <FormItem label="计划交货日期" prop="lastExpectedTime">
                        <DatePicker v-model="addModel.lastExpectedTime" type="date" show-week-numbers placeholder="选择最后交货日期" style="width: 468px"></DatePicker>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="primary" @click="add()" size="large">新增</Button>
                </div>
            </Modal>
            <!--修改-->
            <Modal
                    v-model="showChangeModel"
                    width="600"
                    title="修改订单">
                <Form  ref="changeModel" :model="changeModel" :label-width="100" :rules="addRuleInline"  >
                    <FormItem label="订单编号" prop="no">
                        <Input v-model="changeModel.no" placeholder="请输入编号" />
                    </FormItem>
                    <FormItem label="订单名称" prop="name">
                        <Input v-model="changeModel.name" placeholder="请输入名称" />
                    </FormItem>
                    <FormItem label="订单公司" prop="company">
                        <Input v-model="changeModel.company" placeholder="请输入名称" />
                    </FormItem>
                    <FormItem label="计划交货日期" prop="lastExpectedTime">
                        <DatePicker  v-model="changeModel.lastExpectedTime" type="date" placeholder="选择最后交货日期"  style="width: 468px"></DatePicker>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="primary" @click="change()" size="large">修改</Button>
                </div>
            </Modal>
            <!--删除-->
            <Modal v-model="showDeleteModel" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>作废</span>
                </p>
                <div style="text-align:center">
                    <h2>作废后可能对系统造成不可预计的影响</h2>
                    <h2>确认作废？</h2>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long  @click="del">确认</Button>
                </div>
            </Modal>
            <!--配置-->
            <Modal
                    v-model="showConfigureModel"
                    width="800"
                    :mask-closable="false"
                    title="配置零件">
                <Form  ref="configureModel" :model="configureModel" :label-width="80"  >
                    <FormItem
                            v-for="(item, index) in configureModel.items"
                            :key="index"
                            :label="'零件 '+(index+1)"
                            :prop="'items.' + index + '.id'+'.num'"
                    >
                        <Row>
                            <Col span="12">
                                <Select v-model="item.componentId" filterable >
                                    <Option v-for="cp in componentsList" :value="cp.id"  :key="cp.id">{{ cp.name }}</Option>
                                </Select>
                            </Col>
                            <Col span="2" offset="1">
                                <label>数量：</label>
                            </Col>
                            <Col span="5" >
                                <Input type="text" v-model="item.num" placeholder="输入数量"></Input>
                            </Col>
                            <Col span="3" offset="1">
                                <Button type="ghost" @click="handleRemove(index)">删除</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="12">
                                <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="primary" @click="configure()" size="large">配置</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>
    import {getTime} from '../Tools/timeMethod'
    export default{
        data(){
            return{
                selectModel: {
                    no: "",
                    name:"",
                    createTime:""
                },
                allStatus:{"1":"编辑中","2":"进行中","3":"已完成","4":"已取消"},
                orderType:'1',
                count:0,//总数
                current: 1,//页码
                currentPage:10,//每页显示的数量
                model:[],
                searcherColumns:[
                    {
                        title: '序号',
                        type: 'index',
                        align:'center',
                        width:"70px"
                    },
                    {
                        title: '订单编号',
                        type: 'index',
                        align:'center',
                    },
                    {
                        title: '订单名称',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: '下单公司',
                        key: 'company',
                        align:'center'
                    },
                    {
                        title: '计划交货日期',
                        key: 'lastExpectedTime',
                        align:'center',
                        render: (h,params)=>{
                            return getTime[params.row.lastExpectedTime]
                        }
                    },
                    {
                        title: '状态',
                        key: 'num',
                        align:'center',
                        render: (h,params)=>{
                            return this.allStatus[params.row.status]
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        align:'center',
                        render: (h,params)=>{
                            return getTime(params.row.createTime)
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'default'
                                    },
                                    style: {
                                        marginRight: '5px',
                                    },
                                    on: {
                                        click: () => {
                                            this.changeOne(params.row)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'default'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:params.row.status==1?'inline':'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.configureOne(params.row)
                                        }
                                    }
                                }, '配置'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'default',
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteOne(params.row)
                                        }
                                    }
                                }, '作废')
                            ]);
                        }
                    }
                ],
                showAddModel:false,
                addModel:{
                    no:'',
                    name:'',
                    lastExpectedTime:'',
                    company:''
                },
                addRuleInline:{
                    no: [
                        { required: true, message: '编号不能为空', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '公司不能为空', trigger: 'blur' }
                    ],
                    company: [
                        { required: true, message: '公司不能为空', trigger: 'blur' }
                    ],
                    lastExpectedTime: [
                        { required: true, type: 'date', message: '日期不能为空', trigger: 'change' }
                    ]
                },
                showChangeModel:false,
                changeModel:{
                    name:'',
                    no:'',
                    lastExpectedTime:'',
                    company:''
                },
                showDeleteModel:false,
                deleteModel:'',
                configureModel:{},
                showConfigureModel:false
            }
        },
        mounted () {
            this.selectData();
        },
        methods:{
            //搜索
            selectData(){
                let self=this
                let postData= {
                    "page": self.current-1,
                    "size":self.currentPage,
                    'no': self.selectModel.no,
                    'name':self.selectModel.name,
                    'status':self.orderType
                    // 'createTime':self.selectModel.createTime
                }
                this.$http.get(this.URL+'/bills',{params:postData}).then(response => {
                    self.model=response.body.content
                    self.count=response.body.totalElements
                    console.log(self.model)
                }, response => {
                    // error callback
                });
            },
            selectDataByType(){
                console.log(this.orderType)
                this.selectData()
            },
            getOnePage(page){
                let self=this;
                self.current=page;
                self.selectData()
            },
            //新增
            addOne(){
                this.$refs['addModel'].resetFields();
                this.addModel={};
                this.showAddModel=true;
            },
            add(){
                let self=this;
                console.log(self.addModel.lastExpectedTime)
                this.$refs['addModel'].validate((valid) => {
                    if (valid) {
                        let sendData={
                            name:self.addModel.name,
                            no:self.addModel.no,
                            lastExpectedTime:self.addModel.lastExpectedTime,
                            company:self.addModel.company
                        }
                        self.$http.post(this.URL+'/bills',sendData).then(response => {
                            self.showAddModel=false;
                            self.$Message.success('新增成功！！');
                            self.selectData();
                        }, response => {
                            // error callback
                        });
                    } else {
                        this.$Message.error('请按照要求填写数据!');
                    }
                })
            },
            //修改
            changeOne(data){
                var self=this
                this.$refs['changeModel'].resetFields();
                self.changeModel = JSON.parse(JSON.stringify(data))
                self.showChangeModel=true;
            },
            change(){
                let self=this;
                this.$refs['changeModel'].validate((valid) => {
                    if (valid) {
                        self.$http.post(this.URL+'/bills',self.changeModel).then(response => {
                            self.showChangeModel=false;
                            self.$Message.success('修改成功！！');
                            self.selectData();
                        }, response => {
                            // error callback
                        });
                    } else {
                        this.$Message.error('请按照要求填写数据!');
                    }
                })
            },
            //配置
            configureOne(data){
                let self =this;
                console.log(data)
                self.showConfigureModel=true;
            },
            configure(){

            },
            handleAdd () {
                this.formDynamic.items.push({
                    id: '',
                    num: ''
                });
            },
            handleRemove (index) {
                this.formDynamic.items.splice(index,1)
                console.log(this.formDynamic.items)
            },
            //作废
            deleteOne(data){
                var self= this
                self.deleteModel = JSON.parse(JSON.stringify(data.id))
                self.showDeleteModel=true
            },
            del(){
                var self=this
                this.$http.delete(this.URL+'/components/'+ this.deleteModel)
                    .then(response => {
                        self.showDeleteModel=false
                        this.$Message.success('删除成功！！');
                        self.selectData();
                    }, response => {
                        // error callback
                        this.$Message.warning(response.body.message);
                    });
            }
        }
    }
</script>
<style>
</style>