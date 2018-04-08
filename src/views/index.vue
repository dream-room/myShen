

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 0;
    }
    .index-menu{
        font-size: 16px;
    }

</style>
<template>
    <div class="layout">
        <Layout>
            <div style="z-index: 999;position: fixed;top:0;width: 100vw">
                <Menu mode="horizontal" theme="primary" active-name="1"  style="height: 70px;">
                    <!--<div><img src="../image/logo.jpg" /></div>-->
                    <div class="layout-nav">
                        <MenuItem name="pageHome" @click.native="route('/pageHome')" >
                            <Icon type="home"></Icon>
                            首页
                        </MenuItem>
                        <MenuItem name="person">
                            <Icon type="person"></Icon>
                            {{userName}}
                        </MenuItem>
                        <MenuItem name="edit" @click.native="showModel = true" >
                            <Icon type="edit"></Icon>
                            修改密码
                        </MenuItem>
                        <MenuItem name="exit" @click.native="route('/login')" >
                            <Icon type="power"></Icon>
                            退出
                        </MenuItem>
                    </div>
                </Menu>
            </div>
            <Layout>
                <Sider hide-trigger  :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto',background: '#fff'}" style="top: 70px;">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" @on-select="routerTo"  accordion style="font-size: 18px">
                        <Submenu name="1" >
                            <template slot="title">
                                <Icon type="home"></Icon>
                                首页
                            </template>
                            <MenuItem name="pageHome" class="index-menu">
                                <Icon type="home"></Icon>
                                主页</MenuItem>
                        </Submenu>
                        <Submenu name="2" >
                            <template slot="title">
                                <Icon type="ios-list"></Icon>
                                订单管理
                            </template>
                            <MenuItem name="orderManagement" class="index-menu">
                                <Icon type="ios-list"></Icon>订单管理</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-briefcase"></Icon>
                                物品管理
                            </template>
                            <MenuItem name="itemManagement" class="index-menu">
                                <Icon type="ios-briefcase"></Icon>物品管理</MenuItem>
                            <MenuItem name="componentsManagement" class="index-menu">
                                <Icon type="ios-briefcase"></Icon>零件管理</MenuItem>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="person-stalker"></Icon>
                                用户管理
                            </template>
                            <MenuItem name="list" class="index-menu">
                                <Icon type="ios-people"></Icon>用户列表</MenuItem>
                            <!--<MenuItem name="authorityManagement" class="index-menu">-->
                                <!--<Icon type="locked"></Icon>权限管理</MenuItem>-->
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '70px 1px 1px 1px',marginLeft: '200px',minHeight:'100vh',}" >
                    <Content :style="{padding: '24px 24px 0 24px', minHeight: '280px', background: '#fff',maxHeight:'100vh'}">
                        <router-view></router-view>
                    </Content>
                    <div>
                        <p style="text-align: center;color:#999;">Copyright©2014-2018 RD</p>
                    </div>
                </Layout>
            </Layout>
        </Layout>
        <Modal
                v-model="showModel"
                title="修改"
                :mask-closable="false"
                @on-ok="change"
                @on-cancel="changeCancel"
              >
            <Form :model="infoModel" :label-width="80" >
                <FormItem label="密码" prop="password">
                    <Input v-model="infoModel.password" placeholder="请输入密码" type="password" />
                </FormItem>
                <FormItem label="重复密码" prop="rePassword">
                    <Input v-model="infoModel.rePassword" placeholder="请再次输入密码" type="password" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                oneName:"",
                showModel:false,
                infoModel: {
                    password: '',
                    rePassword:''
                },
                userName:''
            }
        },
        mounted(){
            let user = JSON.parse(sessionStorage.getItem('userInfo'));
            this.userName=user.no
        },
        methods:{
            routerTo(e){
                this.$router.push(e);
                this.oneName=this.routeName
            },
            route(e)
            {
                this.$router.push(e);
                this.oneName=this.routeName
            },
            change(){
                let self = this
                self.$Message.success('修改成功！！');
                self.showModel=false
            },
            changeCancel(){
                let self = this
                self.$Message.error('取消修改！！');
                self.showModel=false
            }
        }

    }
</script>

