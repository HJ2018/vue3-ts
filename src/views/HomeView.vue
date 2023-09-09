<template>
  <div class="home">
    <el-container>
      <el-header>

          <el-row :gutter="20">
            <el-col :span="4"><img src="../assets/logo.png" class="logo" /></el-col>
            <el-col :span="16">
              <h2>后台管理系统</h2>
            </el-col>
            <el-col :span="4"><span class="log-out">退出登录</span></el-col>
          </el-row></el-header>

        <el-container>


        <el-aside width="200px">

        <el-menu 
          active-text-color="#ffd04b" 
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          router
          >

            <el-menu-item 
            :index="item.path"
             v-for="item in allRoutes" 
             :key="item.path">
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>

        </el-aside>


        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" >
import { defineComponent } from 'vue';
import { useRouter} from 'vue-router';
// import router from '../router/index'
//c
export default defineComponent({
  name: 'HomeView',
  setup(){
    
    const r = useRouter()
    const allRoutes =  r.getRoutes().filter(
      v=>v.meta.isShoe
    )

    // const allRoutes = router.getRoutes().filter(
    //   v=>v.meta.isShow
    // );
  

    
    console.log(allRoutes);
    return {allRoutes}
    
  },
  components: {},
});
</script>

<style lang='scss' scoped>
.el-header {
  height: 80px;
  background-color: #666;

  .logo {
    height: 80px;
  }

  h2,
  .log-out {
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: #fff
  }
}

.el-aside{
  height: calc(100vh - 80px);
  .el-menu{
    height: calc(100vh - 80px);
  }
}
</style>
