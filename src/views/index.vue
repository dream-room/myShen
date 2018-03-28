

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .index-menu{
        font-size: 16px;
    }

</style>
<template>
    <div class="layout">
        <Layout  >
            <Header :style="{position: 'fixed', width: '100vw', top: 0, overflow: 'auto'}" style="z-index: 100">
                <Menu mode="horizontal" theme="dark" active-name="1" >
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="pageHome" @click.native="route('/pageHome')" >
                            <Icon type="home"></Icon>
                            首页
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger  :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto',background: '#fff'}" style="top: 60px;">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" @on-select="routerTo"  accordion style="font-size: 18px">
                        <Submenu name="1" >
                            <template slot="title">
                                <Icon type="home"></Icon>
                                首页
                            </template>
                            <MenuItem name="pageHome" class="index-menu">
                                <Icon type="home"></Icon>
                                主页</MenuItem>
                            <MenuItem name="personalInformation" class="index-menu">
                                <Icon type="person"></Icon>
                                个人资料</MenuItem>

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
                            <MenuItem name="authorityManagement" class="index-menu">
                                <Icon type="locked"></Icon>权限管理</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '70px 24px 0',marginLeft: '200px',minHeight:'100vh'}" >
                    <!--<Breadcrumb :style="{margin: '24px 0'}" >-->
                        <!--<BreadcrumbItem >首页</BreadcrumbItem>-->
                        <!--<BreadcrumbItem>{{oneName}}</BreadcrumbItem>-->
                        <!--&lt;!&ndash;<BreadcrumbItem>Components</BreadcrumbItem>&ndash;&gt;-->
                        <!--&lt;!&ndash;<BreadcrumbItem>Layout</BreadcrumbItem>&ndash;&gt;-->
                    <!--</Breadcrumb>-->
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff',maxHeight:'100vh'}">
                        <router-view></router-view>
                    </Content>
                    <div>
                        <p style="text-align: center;color:#999;">Copyright©2014-2018 RD</p>
                    </div>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                oneName:""
            }
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
        }

    }
</script>

