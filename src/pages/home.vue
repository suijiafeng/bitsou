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
      <div class="smr">
        <div class="smr_top">
          <marquee direction="right" scrollamount="10" scrolldelay="50">
            <span>
              虚拟币：1100 /代币：1183 /交易平台：300 /24小时成交额：¥922.17亿 /总市值：¥15499.03亿 /GBI指数：8084.57
            </span>
          </marquee>
        </div>

        <div class="smr_bottom">
          <el-row>
            <el-col :span="16">
              <div class="smr_bottom__wrap">
                <a href="/">
                  <dl>
                    <dt>BTC/binance</dt>

                    <dd class="arr_down">￥45735</dd>
                  </dl>
                </a>
                <a href="/">
                  <dl>
                    <dt>ETH /binance</dt>
                    <dd class="arr_up">￥45735</dd>

                  </dl>
                </a>
                <a href="/">
                  <dl>
                    <dt>BCH /binance</dt>

                    <dd class="arr_down">￥3704</dd>
                  </dl>
                </a>
                <a href="/">
                  <dl>
                    <dt>EOS /binance</dt>
                    <dd class="arr_up">￥39.47</dd>

                  </dl>
                </a>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="ad">
                <a href="">
                  <img src="../assets/images/ad.png" alt="">
                </a>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div class="contents  g-wrap">
      <div class="allcoins">
        <div class="table_tip">
          <div class="tab">
            <span :class="{'active':isclick==='one'}" @click="tab('one')">所有币种</span>
            <span :class="{'active':isclick==='two'}" @click="tab('two')">收藏币种</span>
          </div>
          <div class="toolist">
            <!-- <span>下载表格</span> -->
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{dropvalue}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="全部">全部</el-dropdown-item>
                <el-dropdown-item command="货币">货币</el-dropdown-item>
                <el-dropdown-item command="代币">代币</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="handleCommand2">
              <span class="el-dropdown-link">
                {{dropvalue2}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="人民币">人民币(CNY)</el-dropdown-item>
                <el-dropdown-item command="美元">美元(USD)</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
            <!-- <span>全部</span> -->
            <!-- <span>人民币</span> -->
            <el-autocomplete v-model="state2" size="mini" class="inline-input" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect" :fetch-suggestions="querySearch">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-autocomplete>
          </div>
        </div>
        <!-- <tab-list :tablist="tableData"/> -->
        <div class="table_main">
          <el-table size="md" :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column type="selection" width="50">
            </el-table-column>
            <el-table-column prop="id_stor" label="#" width="50">
            </el-table-column>
            <el-table-column label="币种" width="170">
              <template slot-scope="scope">
                <router-link :to='{path:"cointypeDetail",query:{id:scope.row.coin_id}}'>
                  <img :src="scope.row.logo_url" alt="">
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="价格" sortable> </el-table-column>
            <el-table-column prop="market_cap" label="流通市值" sortable> </el-table-column>
            <el-table-column prop="market_num" label="流通数量" sortable>
            </el-table-column>
            <el-table-column prop="volume24h" label="24H成交额"> </el-table-column>
            <el-table-column prop="price_change24h" label="24H涨跌幅">
            </el-table-column>
            <el-table-column prop="peity7day1" label="7D价格趋势">
            </el-table-column>
          </el-table>
          <div class="pagetation">
            <el-pagination background :page-size="pageSize" @current-change="pageto" layout="prev, pager, next" :total="pageTotal">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="aside">
        <div class="aside_item">
          <div class="aside_item__title">
            <div id="echarts_pie" style="width:120px;height:130px;"></div>
            <div class="nub">
              <p>币种总市值<strong>￥{{coinHeard.tota|ceil}}亿</strong></p>
              <p>币种总数量<strong>{{coinHeard.number}}个</strong></p>
            </div>

          </div>
          <ol class="ec_lists">
            <li>
              <span><b class="order">1</b>{{coinHeard.rankName1}}/￥{{coinHeard.tota4|ceil}}亿</span>
              <span style="font-weight:700;width:45px;">{{coinHeard.proportion1s}}%</span>
            </li>
            <li>
              <span><b class="order">2</b>{{coinHeard.rankName2}}/￥{{coinHeard.tota3|ceil}}亿</span>
              <span style="font-weight:700;width:45px;">{{coinHeard.proportion2s}}%</span>
            </li>
            <li>
              <span><b class="order">3</b>{{coinHeard.rankName3}}/￥{{coinHeard.tota2|ceil}}亿</span>
              <span style="font-weight:700;width:45px;">{{coinHeard.proportion3s}}%</span>
            </li>
            <li>
              <span><b class="order">4</b>{{coinHeard.rankName4}}/￥{{coinHeard.tota1|ceil}}亿</span>
              <span style="font-weight:700;width:45px;">{{coinHeard.proportion4s}}%</span>
            </li>
            <!-- <li>
              <span><b class="order">1</b>BTC-比特币 /￥7,549亿</span>
              <span style="font-weight:700">52.86%</span>
            </li>
            <li>
              <span><b class="order">1</b>BTC-比特币 /￥7,549亿</span>
              <span style="font-weight:700">52.86%</span>
            </li> -->
          </ol>
        </div>
        <div class="aside_item">
          <div class="aside_item__title">
            <h2>最新资讯</h2>
            <a class="more_link" href="/">更多</a>
          </div>
          <div class="aside_item_con">
            <ul>
              <li v-for="notice in notices" :key="notice.id">
                <a :href="notice.url">
                  <span class="text">
                    <i class="aside-icon"><img :src="notice.logo" alt=""></i>{{notice.title}}</span>
                  <span class="date">{{notice.time | timefamter }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tabList from "../components/tablelist";
export default {
  name: "home",
  data() {
    return {
      dropvalue: "全部",
      dropvalue2: "人民币",
      isclick: "one",
      banner: "",
      websock: "",
      value: "",
      temp: null,
      results: "",
      restaurants: [],
      state1: "",
      state2: "",
      pageTotal: null,
      pageNum: 1,
      pageSize: 18,
      notices: [],
      coinHeard: "",
      coinHeardE: [],
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
    this.init();
  },
  mounted() {
    this.$nextTick(function() {
      this.initEcharts()
    });
  },
  beforeDestroy() {
    // this.websocketclose();
  },
  filters: {
    timefamter(v) {
      return v.substr(5, 11);
    },
    ceil(num) {
      return Math.ceil(num);
    }
  },
  methods: {
    init() {
      this.getbanner();
      this.getmessage1();
      this.asideMsg();
      this.getCoinsHead();
    },
    pageto(v) {
      this.pageNum = v;
      this.getmessage1();
    },
    handleCommand(command) {
      this.dropvalue = command;
    },
    handleCommand2(command) {
      this.dropvalue2 = command;
    },
    getmessage1() {
      const data = {
        token: ` bc092237-74f6-49f4-af44-4754f9e98091`,
        pageNum: this.pageNum,
        userId: "",
        pageSize: this.pageSize,
        isToken: ""
      };
      this.$http
        .post("/api/v1/coins/all", data)
        .then(response => {
          const allTata = response.data.data;
          this.tableData = allTata.datas;
          this.pageTotal = allTata.pageTotal;
          // console.log(response);
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
    },
    getCoinsHead() {
      this.$http
        .post("api/v1/coins/coinHeard")
        .then(res => {
          if (res.data.code === 1) {
            this.coinHeard = res.data.data;
            // console.log(this.coinHeard);
            let arr = [];
            let rankName = [];
            let tota = [];
            let proportion = [];

            for (let i in this.coinHeard) {
              if (i.startsWith("rankName")) {
                rankName.push(this.coinHeard[i]);
              } else if (i.startsWith("tota")) {
                if (i != "tota") {
                  // console.log(this.coinHeard[i])
                  tota.push(this.coinHeard[i]);
                }
              } else if (i.startsWith("proportion")) {
                proportion.push(this.coinHeard[i]);
              }
            }
            for (let i = 0; i < rankName.length; i++) {
              arr.push({
                tota: tota[i],
                value: proportion[i],
                name: rankName[i]
              });
            }
            this.coinHeardE = arr;
          }
          this.initEcharts();
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    querySearch(queryString, cb) {
      this.loadAll();
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createFilter(queryString) {
      return () => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      const URL = `https://www.bitsou.com/api/v1/home/search`;
      const data = {
        token: `c07ee22e-a54d-422f-9f1e-6f06866b5219`,
        search: this.state2,
        userId: ""
      };
      this.$http
        .post(URL, data)
        .then(response => {
          this.restaurants = response.data.data.coin.datas;
          const rsl = [];
          this.restaurants.forEach((v, i) => {
            rsl.push(v.name);
          });
          this.results = rsl;
          console.log(this.results);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    asideMsg() {
      const URL = `https://www.bitsou.com/api/v1/home/notice`;
      this.$http
        .post(URL)
        .then(response => {
          this.notices = response.data.data.datas;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSelect(item) {
      console.log(item);
    },
    tab(v) {
      if (v === "one") {
        this.isclick = v;
        this.tableData = this.temp;
      } else if (v === "two") {
        this.isclick = v;
        this.temp = this.tableData;
        this.tableData = [];
      }
    },
    initEcharts() {
      this.$echarts.init(document.getElementById("echarts_pie")).setOption({
        title: {},
        tooltip: {
          trigger: "item",
          backgroundColor: "#e7e7e7e0",
          padding: 10,
          borderColor:"#999",
          textStyle: {
            color: "#666"
          },
          extraCssText: "box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);",
          
          formatter: function (params) {
            // console.log(params)
            return `${params.data.name}:${params.data.value}%</br> 市值:${params.data.tota}亿`

}
        },
        // legend: {
        //   show: false,
        //   x: "right",
        //   y: "10px",
        //   orient: "vhorizontal",
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        // },
        series: [
          {
            name: "访问来源",
            type: "pie",
            color: ["#73bee3", "#fed017", "#fea6a1", "#7fbf80", "#d26e38"],
            hoverAnimation: true, //扇形半径动画效果
            // center: ["30%", "50%"],
            radius: ["60%", "80%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "12"
                  // fontWeight: "bold"
                }
              }
            },

            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.coinHeardE

            // [
            //   { value: 335, name: "直接访问" },
            //   { value: 310, name: "邮件营销" },
            //   { value: 234, name: "联盟广告" },
            //   { value: 135, name: "视频广告" },
            //   { value: 1548, name: "搜索引擎" }
            // ]
          }
        ]
      });
    }
  },

  components: {
    tabList
  }
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
  background-color: #fff;
  .ad {
    text-align: right;

    padding-top: 10px;
    img {
      width: 100%;
    }
    a {
      display: inline-block;
      width: 300px;
    }
  }
  .smr_top {
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #eee;
  }
  .smr_bottom {
    margin-left: 40px;
    margin-right: 40px;
    .smr_bottom__wrap {
      display: flex;
      margin-top: 36px;
      justify-content: space-between;
    }

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
.el-table .cell a {
  color: #0077cb;
}
.el-table .cell a:hover {
  color: red;
}

.allcoins {
  width: 100%;

  .table_tip {
    box-sizing: border-box;
    padding: 30px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
  }
  .toolist {
    width: 60%;
    .el-dropdown {
      margin-left: 20px;
    }
    span {
      cursor: pointer;
    }
    .el-autocomplete {
      box-sizing: border-box;
      padding-left: 15px;
      width: 50%;
    }
  }
  .table_main {
    padding: 0 30px;
    background-color: #fff;
    .pagetation {
      text-align: right;
      padding: 45px 15px 25px;
    }
  }
}
.contents {
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  justify-content: space-between;
}
.aside {
  margin-left: 15px;
}

.tab {
  .active {
    color: #333;
    border-bottom-color: #fed017;
  }
  span {
    cursor: pointer;
    color: #999;
    font-weight: 700;
    font-size: 18px;
    padding-bottom: 6px;
    margin-left: 20px;
    border-bottom: 3px solid transparent;
  }
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #fed017;
}

.aside {
  width: 400px;
  // height: 600px;

  .aside_item {
    background-color: #fff;
    padding: 0 15px 50px;
    margin-bottom: 20px;
    .aside_item__title {
      display: flex;
      justify-content: space-between;
      h2 {
        font-weight: 700;
        color: #333;
        font-size: 18px;
      }
      .more_link {
        height: 50px;
        font-size: 14px;
        display: inline-block;
        color: #666666;
        line-height: 50px;
        &:hover {
          color: #f00300;
        }
      }
    }
    .nub {
      color: #333;
      font-size: 14px;
      margin-top: 15px;
      strong {
        color: #000;
      }
    }
    .ec_lists {
      color: #666;
      font-size: 12px;

      li {
        display: flex;
        margin-top: 12px;
        justify-content: space-between;

        &:nth-child(1) {
          .order {
            background-color: #73bee3;
          }
        }
        &:nth-child(2) {
          .order {
            background-color: #fed017;
          }
        }
        &:nth-child(3) {
          .order {
            background-color: #fea6a1;
          }
        }
        &:nth-child(4) {
          .order {
            background-color: #7fbf80;
          }
        }
        .order {
          color: #fff;
          width: 15px;
          height: 15px;
          line-height: 15px;
          text-align: center;
          margin-right: 5px;
          display: inline-block;
        }
      }
    }
    .aside_item_con {
      li {
      }
      .aside-icon {
        margin-right: 5px;
      }
      a {
        border-bottom: 1px solid #eee;
        color: #666;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        &:hover {
          .text {
            color: #f00300;
          }
        }
        span {
          line-height: 45px;
        }
      }
      .text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 170px;
        display: inline-block;
      }
    }
  }
}
</style>


