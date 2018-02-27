<template>
    <div>
        <Alert>订单管理</Alert>
        <Form ref="formInline" :model="formInline" inline :label-width="80"  >
            <FormItem label="订单号">
                <Input type="text" v-model="formInline.user" placeholder="" clearable>
                </Input>
            </FormItem>
            </Col>
            <FormItem label="订单名称">
                <Input type="text" v-model="formInline.user" placeholder="" clearable>
                </Input>
            </FormItem>

            <FormItem label="订单时间">
                <DatePicker type="daterange" :options="options2" placement="bottom-end" placeholder="选择时间段" style="width: 200px"></DatePicker>
            </FormItem>

            <FormItem  style="float: right">
                <Button type="success" @click="addOne">新增</Button>
                <Button type="primary" shape="circle" icon="ios-search" @click="selectDate"></Button>
            </FormItem>
            <!--</Row>-->
        </Form>
        <div>
            <Table stripe :columns="columns1" :data="data1" border no-data-text="点击搜索查看数据吧！"></Table>
            <div style="margin: 10px">
                <div style="float: right;">
                    <Page :total="count" show-elevator @on-change="getOnePage" :current="1" show-total :page-size="currentPage"></Page>
                </div>
            </div>
        </div>
        <div>
        <Modal
                v-model="modal6"
                title="新增订单"
                :loading="loading"
                :mask-closable="false"
                width="800">
            <Form ref="addModel" :model="addModel"  :rules="ruleValidate">
                <!--<FormItem label="Name" prop="name">-->
                    <!--<Input v-model="addModel.name" placeholder="Enter your name"></Input>-->
                <!--</FormItem>-->
                <!--<FormItem label="E-mail" prop="mail">-->
                    <!--<Input v-model="addModel.mail" placeholder="Enter your e-mail"></Input>-->
                <!--</FormItem>-->
                <!--<FormItem label="City" prop="city">-->
                    <!--<Select v-model="addModel.city" placeholder="Select your city">-->
                        <!--<Option value="beijing">New York</Option>-->
                        <!--<Option value="shanghai">London</Option>-->
                        <!--<Option value="shenzhen">Sydney</Option>-->
                    <!--</Select>-->
                <!--</FormItem>-->
                <!--<FormItem label="Date">-->
                    <!--<Row>-->
                        <!--<Col span="10">-->
                        <!--<FormItem prop="date">-->
                            <!--<DatePicker type="date" placeholder="Select date" v-model="addModel.date"></DatePicker>-->
                        <!--</FormItem>-->
                        <!--</Col>-->
                        <!--<Col span="4" style="text-align: center">-</Col>-->
                        <!--<Col span="10">-->
                        <!--<FormItem prop="time">-->
                            <!--<TimePicker type="time" placeholder="Select time" v-model="addModel.time"></TimePicker>-->
                        <!--</FormItem>-->
                        <!--</Col>-->
                    <!--</Row>-->
                <!--</FormItem>-->
                <!--<FormItem label="Gender" prop="gender">-->
                    <!--<RadioGroup v-model="addModel.gender">-->
                        <!--<Radio label="male">Male</Radio>-->
                        <!--<Radio label="female">Female</Radio>-->
                    <!--</RadioGroup>-->
                <!--</FormItem>-->
                <!--<FormItem label="Hobby" prop="interest">-->
                    <!--<CheckboxGroup v-model="addModel.interest">-->
                        <!--<Checkbox label="Eat"></Checkbox>-->
                        <!--<Checkbox label="Sleep"></Checkbox>-->
                        <!--<Checkbox label="Run"></Checkbox>-->
                        <!--<Checkbox label="Movie"></Checkbox>-->
                    <!--</CheckboxGroup>-->
                <!--</FormItem>-->
                <!--<FormItem label="Desc" prop="desc">-->
                    <!--<Input v-model="addModel.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>-->
                <!--</FormItem>-->
                <div>
                <div>
                    <label>12312312</label>
                    <p>12312312</p>
                </div>
                <p style="float: right">3213213</p>
                </div>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="add('addModel')">新增</Button>
                <Button type="ghost" style="margin-left: 8px" @click="addCancel()">取消</Button>
            </div>
        </Modal>
        </div>
    </div>



</template>
<script>
    export default {
        data(){
            return{
                addModel: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
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
                    user: '123',
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
                },
                modal6: false,
                loading: true,
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            selectDate(){
                let self=this
                let postData= {
                    "page": self.current-1,
                    "size":self.currentPage
                }
                this.$http.get('http://localhost:8689/',{params:postData}).then(response => {
                    self.model=response.body.content
                    self.count=response.body.totalElements
                    console.log(self.model)
                }, response => {
                    // error callback
                });

            },
            getOnePage(page){
                console.log(page)
            },
            addOne(){
                this.$refs['addModel'].resetFields();
                let self =this;
                self.addModel=[];
                self.modal6=true;
            },
            add(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
//                let self=this;
//                this.$http.post('http://localhost:8689/users',JSON.stringify(self.addModel)).then(response => {
//                    self.changeModal=false;
//                    this.$Message.success('修改成功！！');
//                    self.selectDate();
//                }, response => {
//                    // error callback
//                });

            },
            addCancel(){
                this.modal6=false;
            }
        }

    }
</script>