
<template>
    <Row>
    <Col span="4" offset="10">
    <div style="text-align: center;padding-top:300px">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" >
        <FormItem prop="no">
            <Input type="text" v-model="formInline.no" placeholder="用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="密码">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
        </FormItem>
    </Form>
    </div>
    </Col>
    </Row>
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
        methods: {
            handleSubmit(name) {
                var self=this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post('http://localhost:8689/login/rest',self.formInline).then(response => {
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
