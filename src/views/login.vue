
<template>
    <div class="login-bg">
    <Row>
    <Col span="4" offset="10">
    <div style="text-align: center;padding-top:250px">
        <div style="padding-bottom: 40px">
        <span class="login-title" >瑞东仪表</span>
        </div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" >
        <FormItem prop="no">
            <Input type="text" v-model="formInline.no" placeholder="用户名" style="font-size: 20px">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="密码" style="font-size: 20px">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')" style="font-size: 20px">登录</Button>
        </FormItem>
    </Form>
    </div>
    </Col>
    </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    no: '',
                    password: ''
                },
                ruleInline: {
                    no: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码过短', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
            sessionStorage.removeItem('userInfo');
        },
        methods: {
            handleSubmit(name) {
                var self=this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.URL+'/auth/token',self.formInline).then(response => {
                            sessionStorage.setItem('userInfo',JSON.stringify(self.formInline))
                            sessionStorage.setItem('tokens',response.bodyText)
                            this.$router.push('pageHome');
                        }, response => {
                            this.$Message.error(response.body.message);
                        });
//                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('请输入正确的密码和账号!');
                    }
                })
            }
        }
    }
</script>
<style>
    .login-bg{
        background: url('../image/bg-1.jpg');
        min-height: 100vh;
    }
    .login-title{
        background: linear-gradient(to right, red, blue);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 40px;
    }
</style>