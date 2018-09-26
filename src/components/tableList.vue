<template>
    <div v-if="ishow" class="table_main">
          <el-table size="md" :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column type="selection" width="50">
            </el-table-column>
            <el-table-column type="index" sortable width="50">
            </el-table-column>
            <el-table-column label="币种" sortable width="170">
              <template slot-scope="scope">
                <router-link :to='{path:"cointypeDetail",query:{id:scope.row.coin_id}}'>
                  <img :src="scope.row.logo_url" alt="">
                  <!-- <i class="el-icon-time">  </i> -->
                  <span style="margin-left: 10px">{{ scope.row.name }}</span></router-link>
              </template>
            </el-table-column>
            <el-table-column prop="tablist.price" label="价格" sortable> </el-table-column>
            <el-table-column prop="tablist.market_cap" label="流通市值" sortable> </el-table-column>
            <el-table-column prop="tablist.market_num" label="流通数量" sortable>
            </el-table-column>
            <el-table-column prop="tablist.volume24h" label="24H成交额"> </el-table-column>
            <el-table-column prop="tablist.price_change24h" label="24H涨跌幅">
            </el-table-column>
            <el-table-column prop="tablist.peity7day1" label="7D价格趋势">
            </el-table-column>
          </el-table>
        </div>
</template>
<script>
export default {
    data(){
        return{
            ishow:false
            
        }
        
    },props:{
        "tablist":Array
    },watch:{
    }
}
</script>

<style lang="scss">

</style>

