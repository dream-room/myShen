<template>
    <div>
        <Alert>零件管理</Alert>
        <div>
            <Form  :model="formInline" inline :label-width="40" >
                <FormItem >
                    <label style="font-size: 20px;vertical-align: middle">零件名称：</label>
                    <Input type="text" v-model="formInline.name" placeholder="" clearable style="width: 200px">
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
            <RadioGroup v-model="orderType" type="button" @on-change="selectData" size="large">
                <Radio label="">全部</Radio>
                <Radio label="1">机芯</Radio>
                <Radio label="2">气压表</Radio>
                <Radio label="3">压力表</Radio>
            </RadioGroup>
            <Table stripe :columns="searcherColumns" :data="model" border no-data-text="你好像还没有添加数据哦！" width="100%" style="margin-top: 3px" size="large"></Table>
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
                    :mask-closable="false"
                    width="600px"
                    title="新增零件">
                <Form  ref="addModel" :model="addModel" :label-width="80" :rules="addRuleInline" >
                    <FormItem label="名称" prop="name">
                        <Input v-model="addModel.name" placeholder="请输入名称" />
                    </FormItem>
                    <FormItem label="通常价" prop="price">
                        <Input v-model="addModel.price" placeholder="请输入价格" />
                    </FormItem>
                    <FormItem label="类型" prop="type">
                        <Select v-model="addModel.type" >
                            <Option value="1">机芯</Option>
                            <Option value="2">气压表</Option>
                            <Option value="3">压力表</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="库存" prop="num">
                        <Input v-model="addModel.num" placeholder="请输入库存"  />
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="primary" @click="add()" size="large">新增</Button>
                </div>
            </Modal>
            <!--修改-->
            <Modal
                    v-model="showChangeModel"
                    :mask-closable="false"
                    title="修改零件">
                <Form  ref="changeModel" :model="changeModel" :label-width="80" :rules="addRuleInline" >
                    <FormItem label="名称" prop="name">
                        <Input v-model="changeModel.name" placeholder="请输入名称" />
                    </FormItem>
                    <FormItem label="通常价" prop="price">
                        <Input v-model="changeModel.price" placeholder="请输入价格" />
                    </FormItem>
                    <FormItem label="类型" prop="type">
                        <Select v-model="changeModel.type" >
                            <Option value="1">机芯</Option>
                            <Option value="2">气压表</Option>
                            <Option value="3">压力表</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="库存" prop="num">
                        <Input v-model="changeModel.num" placeholder="请输入库存"  />
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
                    <span>删除</span>
                </p>
                <div style="text-align:center">
                    <h2>删除后可能对系统造成不可预计的影响</h2>
                    <h2>确认删除？</h2>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long  @click="del">确认</Button>
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
                formInline: {
                    name: ""
                },
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
                        title: '零件名称',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: '库存',
                        key: 'num',
                        align:'center'
                    },
                    {
                        title: '通常价',
                        key: 'price',
                        align:'center'
                    },
                    {
                        title: '类型',
                        key: 'type',
                        align:'center',
                        render:(h,params)=>{
                            return this.allType[params.row.type]
                        }
                    },
                    {
                        title: '修改时间',
                        key: 'updateTime',
                        align:'center',
                        render:(h,params)=>{
                            return getTime(params.row.updateTime)
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
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.changeOne(params.row)
                                            console.log(params.row)
                                        }
                                    }
                                }, '修改'),
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
                                }, '删除')
                            ]);
                        }
                    }
                ],
                showAddModel:false,
                addModel:{
                  name:'',
                  num:'',
                  price:''
                },
                addRuleInline:{
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],
                    num: [
                        { required: true, message: '数量不能为空', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '价格不能为空', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择类型', trigger: 'change' }
                    ]
                },
                showChangeModel:false,
                changeModel:{
                    name:'',
                    num:'',
                    price:''
                },
                showDeleteModel:false,
                deleteModel:'',
                allType:{"1":"机芯","2":"气压表","3":"压力表"},
                orderType:''
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
                    "type":self.orderType
                }
                this.$http.get(this.URL+'/components',{params:postData}).then(response => {
                    self.model=response.body.content
                    self.count=response.body.totalElements
                    console.log(self.model)
                }, response => {
                    // error callback
                });
            },
            getOnePage(page){
                let self=this;
                self.current=page;
                self.selectData()
            },
            //新增
            addOne(){
                this.$refs['addModel'].resetFields();
                this.addModel=[];
                this.showAddModel=true;
            },
            add(){
                let self=this;
                this.$refs['addModel'].validate((valid) => {
                    if (valid) {
                        let sendData={
                            name:self.addModel.name,
                            num:self.addModel.num,
                            price:self.addModel.price,
                            type:self.addModel.type
                        }
                        self.$http.post(this.URL+'/components',sendData).then(response => {
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
                console.log(data)
                self.changeModel = JSON.parse(JSON.stringify(data))
                self.changeModel.num=data.num.toString()
                self.changeModel.price=data.price.toString()
                self.changeModel.type=data.type.toString()
                self.showChangeModel=true;
            },
            change(){
                let self=this;
                this.$refs['changeModel'].validate((valid) => {
                    if (valid) {
                        self.$http.post(this.URL+'/components',self.changeModel).then(response => {
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
            //删除
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
            },
        }
    }
</script>