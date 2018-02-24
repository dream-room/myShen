<!--<style scoped>-->
    <!--.layout{-->
        <!--border: 1px solid #d7dde4;-->
        <!--background: #f5f7f9;-->
        <!--position: relative;-->
        <!--border-radius: 4px;-->
        <!--overflow: hidden;-->
    <!--}-->
    <!--.layout-header-bar{-->
        <!--background: #fff;-->
        <!--box-shadow: 0 1px 1px rgba(0,0,0,.1);-->
    <!--}-->

    <!--.layout-logo{-->
        <!--width: 100px;-->
        <!--height: 30px;-->
        <!--background: #5b6270;-->
        <!--border-radius: 3px;-->
        <!--float: left;-->
        <!--position: relative;-->
        <!--top: 15px;-->
        <!--left: 20px;-->
    <!--}-->
    <!--.layout-nav{-->
        <!--width: 420px;-->
        <!--margin: 0 auto;-->
        <!--margin-right: 20px;-->
    <!--}-->
<!--</style>-->
<!--<template>-->
    <!--<div class="layout">-->
        <!--<Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">-->
            <!--<Menu  theme="dark" width="auto"  @on-select="routerTo" >-->
                <!--<Submenu name="">-->
                    <!--<template slot="title">-->
                        <!--<Icon type="ios-navigate"></Icon>-->
                       <!--首页-->
                    <!--</template>-->
                    <!--<MenuItem name="pageHome">首页</MenuItem>-->
                    <!--<MenuItem name="personalInformation">个人资料</MenuItem>-->
                    <!--<MenuItem name="list">用户列表</MenuItem>-->
                <!--</Submenu>-->
                <!--<Submenu name="2">-->
                    <!--<template slot="title">-->
                        <!--<Icon type="ios-keypad"></Icon>-->
                       <!--订单管理-->
                    <!--</template>-->
                    <!--<MenuItem name="orderManagement">订单管理</MenuItem>-->
                    <!--<MenuItem name="2-2">Option 2</MenuItem>-->
                <!--</Submenu>-->
                <!--<Submenu name="3">-->
                    <!--<template slot="title">-->
                        <!--<Icon type="ios-analytics"></Icon>-->
                        <!--Item 3-->
                    <!--</template>-->
                    <!--<MenuItem name="3-1">Option 1</MenuItem>-->
                    <!--<MenuItem name="3-2">Option 2</MenuItem>-->
                <!--</Submenu>-->
            <!--</Menu>-->
        <!--</Sider>-->
        <!--<Layout :style="{marginLeft: '200px',minHeight:'100vh'}">-->
            <!--<div style="position: fixed;overflow-y: auto;width:90%;z-index: 100">-->
                <!--<Menu mode="horizontal" theme="light" >-->
                    <!--&lt;!&ndash;<div class="layout-logo"></div>&ndash;&gt;-->
                    <!--<div class="layout-nav">-->
                        <!--<MenuItem name="1">-->
                            <!--<Icon type="ios-navigate"></Icon>-->
                            <!--Item 1-->
                        <!--</MenuItem>-->
                        <!--<MenuItem name="2">-->
                            <!--<Icon type="ios-keypad"></Icon>-->
                            <!--Item 2-->
                        <!--</MenuItem>-->
                        <!--<MenuItem name="3">-->
                            <!--<Icon type="ios-analytics"></Icon>-->
                            <!--Item 3-->
                        <!--</MenuItem>-->
                        <!--<MenuItem name="4">-->
                            <!--<Icon type="ios-paper"></Icon>-->
                            <!--Item 4-->
                        <!--</MenuItem>-->
                    <!--</div>-->
                <!--</Menu>-->
            <!--</div>-->
            <!--<Content :style="{padding: '60px 16px 16px'}">-->
                <!--<Breadcrumb :style="{margin: '16px 0'}">-->
                    <!--<BreadcrumbItem to="/pageHome">首页</BreadcrumbItem>-->
                    <!--<BreadcrumbItem>Components</BreadcrumbItem>-->
                <!--</Breadcrumb>-->
                <!--&lt;!&ndash;<Card>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div style="">Content</div>&ndash;&gt;-->
                <!--&lt;!&ndash;</Card>&ndash;&gt;-->
                <!--<router-view></router-view>-->
            <!--</Content>-->
            <!--<Footer class="layout-footer-center" style="text-align: center">2011-2018 &copy; Shenmq</Footer>-->
        <!--</Layout>-->
    <!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--export default {-->

        <!--methods:{-->
            <!--routerTo(e){-->
                <!--this.$router.push(e);-->
            <!--}-->

        <!--}-->

    <!--}-->
<!--</script>-->

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

</style>
<template>
    <div class="layout">
        <Layout  style="min-height: 100vh">
            <Header>
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
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" @on-select="routerTo">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="home"></Icon>
                                首页
                            </template>
                            <MenuItem name="pageHome">
                                <Icon type="home"></Icon>
                                主页</MenuItem>
                            <MenuItem name="personalInformation">
                                <Icon type="person"></Icon>
                                个人资料</MenuItem>

                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-list"></Icon>
                                订单管理
                            </template>
                            <MenuItem name="orderManagement">
                                <Icon type="ios-list"></Icon>订单管理</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-briefcase"></Icon>
                                物品管理
                            </template>
                            <MenuItem name="itemManagement">
                                <Icon type="ios-briefcase"></Icon>物品管理</MenuItem>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="person-stalker"></Icon>
                                用户管理
                            </template>
                            <MenuItem name="list">
                                <Icon type="ios-people"></Icon>用户列表</MenuItem>
                            <MenuItem name="authorityManagement">
                                <Icon type="locked"></Icon>权限管理</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}" >
                        <BreadcrumbItem to="/pageHome">首页</BreadcrumbItem>
                        <BreadcrumbItem>{{routeName}}</BreadcrumbItem>
                        <!--<BreadcrumbItem>Components</BreadcrumbItem>-->
                        <!--<BreadcrumbItem>Layout</BreadcrumbItem>-->
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view></router-view>
                    </Content>
                    <Footer  style="text-align: center;padding-bottom: 0px">2011-2018 &copy; Shenmq</Footer>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                routeName:""
            }
        },
        methods:{
            routerTo(e){
                this.$router.push(e);
                this.routeName=this.$route.meta.title
            },
            route(e)
            {
                this.$router.push(e);
            },


        }

    }
</script>

