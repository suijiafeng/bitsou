<template>
  <div class="foot_Copyright">
    <div class="friend_link">
      <div class="more_info_wrap">
        <div class="info_blk">
          <div class="company_info">
            <span class="company_info_item">
              <a target="_blank" rel="nofollow" href="/companyCenter?idx=0">关于我们</a>
            </span>
            <span class="company_info_item">
              <a target="_blank" href="/companyCenter?idx=1">意见反馈</a>
            </span>
            <span class="company_info_item">
              <a target="_blank" href="/companyCenter?idx=2">手机APP</a>
            </span>
            <span class="company_info_item">
              <a target="_blank" href="/serviceDeclare">服务条款</a>
            </span>
            <span class="company_info_item">
              <a target="_blank" href="/companyCenter?idx=4">充提提交</a>
            </span>
          </div>
          <div class="out_link_wrap">
            <span>友情链接：</span>
            <a target="_blank" href="https://www.coinex.com/">CoinEx</a>
          </div>
        </div>
        <div class="logo_blk">
<img src="../assets/logo.png" alt="">
<p>合作邮箱：public@bitsou.com</p>
<p>客服电话：0755-86536769</p>
      </div>
      </div>
      
    </div>
    <div class="copy_wrap">
      <p class="copyright">©Copyright www.bitsou.com 2018  | 备案号：粤ICP备18065817号</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.more_info_wrap{
  padding-top: 25px;
  display: flex;
  justify-content: space-between;
  .logo_blk{
    border-left:1px solid #fff;
    padding:0 40px;
   
    p{
       color:#999;
      margin-bottom:0;
      font-size: 14px;
    }
  }

}
.copyright {
  line-height: 50px;
  background: #212327;
  text-align: center;
  color: #999;
  font-size: 12px;
  margin: 0 auto;
}
.company_info_item {
  display: inline-block;
  width: 100px;
  text-align: left;
  padding: 10px 0;
  color: white;
}
.company_info a {
  color: white;
}

.out_link_wrap {
  color: #999;
  font-size: 14px;
  display: inline-block;
  line-height: 24px;
  padding-right: 10px;
  a {
    color: #999;
    font-weight: 700;
  }
}
</style>


