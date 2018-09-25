


<template>
  <nav>
    <el-row :gutter="20">
      <el-col class="head-logo" :span="6">
        <a href="/"> <img src="../assets/logo.png" alt=""> </a>
      </el-col>
      <el-col class="nav-list" :span="18">
        <ul class="nav-item">
          <li>
            <router-link to="/" exact>币种</router-link>
          </li>
          <li>
            <router-link to="/tradearea">交易所</router-link>
          </li>
          <li>
            <router-link to="/macroanalysis">宏观分析</router-link>
          </li>

        </ul>
        <div class="nav-other">
          <div class="head-search">
            <input type="text">
            <router-link class="search-btn" to="/mmmm">
              <img src="../assets/images/search.png" alt="">
            </router-link>
          </div>

          <router-link class="icon_wrap msg_icon" to="/dddd"><img src="../assets/images/icon-message.png" alt=""></router-link>

          <router-link class="icon_wrap user_icon" to="/kkkk"><img src="../assets/images/icon-user.png" alt=""></router-link>

        </div>
      </el-col>
    </el-row>
  </nav>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.head-logo {
  line-height: 50px;
  text-align: left;
  img {
    vertical-align: middle;
  }
}
.nav-list {
  display: flex;
  justify-content: flex-end;
  text-align: right;
  .nav-item {
    .active {
      background: #fee91b;
      color: #333 !important;
    }
  }

  li {
    display: inline-block;
    a {
      line-height: 60px;
      color: #fff;
      padding: 0 20px;

      display: inline-block;
      text-align: center;
      font-weight: 700;
      font-size: 16px;
    }
  }
  .icon_wrap {
    line-height: 60px;
    &.msg_icon {
      width: 35px;
      margin-left: 35px;
      display: inline-block;

      cursor: pointer;
    }
    &.user_icon {
      width: 30px;
      margin-left: 20px;
    }
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
}
.nav-other {
  line-height: 60px;
  display: flex;
  justify-content: space-around;
  .head-search {
    position: relative;
    .search-btn {
      position: absolute;
      right: 15px;
      top: 4px;
    }

    input {
      outline: none;
      border: 0;
      height: 30px;
      border-radius: 20px;
      color: #fff;
      background: #999;
      padding-right: 35px;
      padding-left: 25px;
    }
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>


