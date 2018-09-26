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
           <span>所有币种</span>
           <span>收藏币种</span>
         </div>
         <div class="toolist">
            <span>下载表格</span>
            <span>全部</span>
            <span>人民币</span>
           <el-autocomplete
    v-model="state2"
     size="mini"
     class="inline-input"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
      :fetch-suggestions="querySearch"
    >
    <i slot="suffix" class="el-input__icon el-icon-search"></i>
  </el-autocomplete>
         </div>
          </div>
          <div class="table_main">
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
        <el-table-column prop="price" label="价格" sortable> </el-table-column>
        <el-table-column prop="market_cap" label="流通市值" sortable > </el-table-column>
        <el-table-column prop="market_num" label="流通数量" sortable>
        </el-table-column>
        <el-table-column prop="volume24h" label="24H成交额" > </el-table-column>
        <el-table-column prop="price_change24h" label="24H涨跌幅" >
        </el-table-column>
        <el-table-column prop="peity7day1" label="7D价格趋势" >
        </el-table-column>
      </el-table>
       </div>
    </div>
    <div class="aside" style="width:400px;background-color:red;height:500px">
      <div class="kk" style=";"></div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      banner: "",
      websock: "",
      value: "",
      results: "",
      restaurants: [],
      state1: "",
      state2: "",
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
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    console.log(this.restaurants);
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
    margin-left:40px;
    margin-right:40px;
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
  width:100%;

  .table_tip {
    box-sizing: border-box;
    padding: 30px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
  }
  .toolist {
    .el-autocomplete {
       box-sizing: border-box;
      padding-left: 15px;
      width: 50%;
    }
  }
  .table_main {
    padding: 0 30px;
    background-color: #fff;
  }
}
.contents{
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  justify-content: space-between;
}
.aside{
  margin-left:15px;
}
</style>


