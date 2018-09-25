<template>
  <div id="app">
    <el-container>
      <el-header heihgt="100%">
        <Mhead/>
      </el-header>
      <router-view/>
      <el-footer height='100%'>
        <Mfoot/>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import Mhead from "./components/Mhead";
import Mfoot from "./components/Mfoot";
export default {
  name: "App",
  components: {
    Mhead,
    Mfoot
  }
};
</script>

<style>
@import "./assets/css/normalize.css";
body {
  background: #e8e8e8;
  color: #333;
}
ul,
li,dl,dt,dd {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
a {
  display: inline-block;
  text-decoration: none;
}
.el-header,
.el-footer,
.el-main,
.el-aside {
  padding-right: 40px;
  padding-left: 40px;
  min-width: 992px;
}
.el-header,
.el-footer {
  background-color: #212327;
}
</style>
