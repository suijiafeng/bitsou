<template>
  <div>
    <el-carousel height="430px">
      <el-carousel-item v-for="item in banner" :key="item.name">
        <!-- <h3>{{ item }}</h3> -->
        <router-link to="/">
          <img :src="item.img" alt="">
        </router-link>

        <!-- <div style="width:100%;height:100%;background-color:red;"></div> -->
      </el-carousel-item>
    </el-carousel>

    <div class="smr_wrap">
      <el-row>
        <el-col :span="17">
          <div class="smr">
            <div class="smr_top">
              <marquee direction="right" scrollamount="10" scrolldelay="50">
                <span>
                  虚拟币：1100 /代币：1183 /交易平台：300 /24小时成交额：¥922.17亿 /总市值：¥15499.03亿 /GBI指数：8084.57
                </span>
              </marquee>
            </div>
            <div class="smr_bottom">
              <a href="/">
                <dl>
                  <dt>BTC/binance</dt>

                  <dd class="arr_down">￥45735</dd>
                </dl>
              </a>
              <a href="/">
                <dl>
                  <dt>BTC/binance</dt>
                  <dd class="arr_up">￥45735</dd>

                </dl>
              </a>
              <a href="/">
                <dl>
                  <dt>BTC/binance</dt>

                  <dd class="arr_down">￥45735</dd>
                </dl>
              </a>
              <a href="/">
                <dl>
                  <dt>BTC/binance</dt>
                  <dd class="arr_up">￥45735</dd>

                </dl>
              </a>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="ad">
            <a href="">
              <img src="../assets/images/ad.png" alt="">
            </a>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="allcoins">
      <el-table size="md" :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column type="index" sortable width="50">
        </el-table-column>
        <el-table-column  label="币种" sortable width="170">
          <template slot-scope="scope">
            <router-link :to='{path:"cointypeDetail",query:{id:scope.row.coin_id}}'>
             <img :src="scope.row.logo_url" alt=""> 
           <!-- <i class="el-icon-time">  </i> -->
            <span style="margin-left: 10px">{{ scope.row.name }}</span></router-link>
          
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" sortable width="117"> </el-table-column>
        <el-table-column prop="market_cap" label="流通市值" sortable width="120"> </el-table-column>
        <el-table-column prop="market_num" label="流通数量" sortable width="118">
        </el-table-column>
        <el-table-column prop="volume24h" label="24H成交额" width="148"> </el-table-column>
        <el-table-column prop="price_change24h" label="24H涨跌幅" width="138">
        </el-table-column>
        <el-table-column prop="peity7day1" label="7D价格趋势" width="118">
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- <el-container>
     <el-input v-model="value" @keydown.native.enter="sendmessge()"></el-input>
    <el-main>
      <el-carousel>
        <el-carousel-item v-for="item in banner" :key="item.name">
          <router-link to="/">
            <img :src="item.img" alt="">
          </router-link>

        </el-carousel-item>
      </el-carousel>
      Main
      <el-container>
        <el-aside width="200px">Aside</el-aside>
      </el-container>
    </el-main>
  </el-container> -->
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      banner: "",
      websock: "",
      value: "",
      tableData: [
        {
          chinese_name: " BTC-比特币",
          price: "¥20亿",
          market_cap: "6.95",
          market_num: "2900",
          price_change24h: "1024",
          price_change7d: "-6.38"
          // peity7day: "1.08,1.11,1.10,1.04,1.11,1.11,1.10,1.10,1.09,1.09,1.09,1.03,0.9999,1.08,1.16,1.16,1.10,1.04,1.10,1.08,1.16,1.14,1.14,1.03,1.08,1.08,1.08,1.01"
        }
      ]
    };
  },
  created() {
    this.getbanner(), this.getmessage1();
    // this.initWebpack(),
  },
  beforeDestroy() {
    // this.websocketclose();
  },
  methods: {
    getmessage1() {
      const data = {
        token: ` bc092237-74f6-49f4-af44-4754f9e98091`,
        pageNum: 2,
        userId: "",
        pageSize: 18,
        isToken: ""
      };
      this.$http
        .post("/api/v1/coins/all", data)
        .then(response => {
          this.tableData = response.data.data.datas;
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    sendmessge() {
      const time = new Date();
      this.websock.send(this.value);
      this.value = "";
    },
    getbanner() {
      const data = {};
      this.$http
        .post("api/v1/home/homeimg", data)
        .then(res => {
          this.banner = res.data.data;
          // console.log(res.data.data);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
    // initWebpack() {
    //   //初始化websocket
    //   // const wsuri = "ws://121.40.165.18:8800";
    //   const wsuri = "wss://socket.coinex.com/";
    //   // const wsuri = "wss://echo.websocket.org";
    //   // const wsuri = "wss://www.bitsou.com/ws/670/mexscry5/websocket";
    //   this.websock = new WebSocket(wsuri); //这里面的this都指向vue
    //   this.websock.onopen = this.websocketopen;
    //   this.websock.onmessage = this.websocketonmessage;
    //   this.websock.onclose = this.websocketclose;
    //   this.websock.onerror = this.websocketerror;
    // },
    // websocketopen() {
    //   //打开
    //   console.log("WebSocket连接成功");
    //   this.websock.send(this.value);
    //   const gg = `{"id":1,"method":"server.ping","params":[]}`;
    //   this.websock.send(gg);
    // },
    // websocketonmessage(e) {
    //   //数据接收
    //   // this.productinfos = JSON.parse(e.data);
    //   this.$message(e.data);
    // },
    // websocketclose() {
    //   //关闭
    //   console.log("WebSocket关闭");
    // },
    // websocketerror() {
    //   //失败
    //   console.log("WebSocket连接失败");
    // }
  },
  components: {}
};
</script>
<style lang="scss">
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-carousel {
  .el-carousel__item {
    a {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.smr_wrap {
  padding: 0 40px;
  background-color: #fff;
  .ad {
    margin-right: 40px;
    text-align: right;
    width: 100%;
    padding-top: 10px;
    img {
      width: 100%;
    }
    a {
      width: 90%;
    }
  }
  .smr_top {
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #eee;
  }
  .smr_bottom {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    .smr_data {
      display: flex;
      justify-content: space-between;
    }
    dt {
      color: #666;
      font-size: 14px;
    }
    dd {
      font-size: 25px;
      margin-top: 5px;
      padding-right: 15px;
      color: #666;
    }
    .arr_down {
      color: #f00300;
      background: url(../assets/images/arr_d.png) no-repeat right center;
    }
    .arr_up {
      color: #00bf75;
      background: url(../assets/images/arr_u.png) no-repeat right center;
    }
  }
}
.el-table .sort-caret {
  border: 5px solid transparent;
}
.el-table .sort-caret.ascending {
  top: 6px;
}
.el-table .sort-caret.descending {
  bottom: 6px;
}
.el-table .descending .sort-caret.descending {
  border-top-color: #606266;
}
.el-table .ascending .sort-caret.ascending {
  border-bottom-color: #606266;
}
.el-table thead th > .cell .el-checkbox {
  display: none;
}
.el-checkbox__inner {
  width: 18px;
  height: 18px;
  border-color: transparent;
  background: url(../assets/images/star1.png) no-repeat;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
  width: 18px;
  height: 18px;
  border-color: transparent;
  background: url(../assets/images/star2.png) no-repeat;
}
.el-checkbox__inner:hover,
.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: transparent;
}
// .el-table .sort-caret.ascending{
//     border-bottom-color: #606266;
// }
// .el-table .sort-caret.descending{
//   border-top-color: #606266;
// }
.el-checkbox__inner::after {
  border: 1px solid transparent;
}
.el-table th {
  font-weight: 500;
}
.el-table .cell a{
  color:#0077cb

}
.el-table .cell a:hover{
  color:red;

}
</style>


