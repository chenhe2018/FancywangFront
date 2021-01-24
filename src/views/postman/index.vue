<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="UID">
        <el-input v-model="form.uid" />
      </el-form-item>
      <el-form-item label="预设接口">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item label="预设模板">
        <el-input v-model="form.json" type="textarea" rows="5" />
      </el-form-item>
      <el-form-item label="返回值">
        <el-input v-model="form.rtn" type="textarea" rows="5" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="primary" @click="onClear">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      form: {
        uid: 'atc2019061231',
        // url:"http://webapi.soa.fws.qa.nt.ctripcorp.com/api/12986/memberCardSalesAndActivate",
        url: 'http://localhost:8080/hello',
        json:
          '{"requestHead":{"channelName":"market.test","toKen":"BBJCKHSDHLJDFHJK"},"requestId":"atcMMHFSFEGFETGAA24356667ww465367","uid":"atc2019061231","salesStrategyCode":"fyyx00002","orderId":304820612901,"orderAmount":10800,"countryCode":"","mobilePhone":"","extendsInfo":""}',
        rtn: 'null'
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message({
        message: this.form.uid + '\r\n' + this.form.url,
        type: 'warning'
      })
      // this.form.rtn = JSON.stringify(JSON.parse(this.form.json), null, 2)
      var tmp = JSON.parse(this.form.json)
      console.log('模板解析', tmp)
      tmp['uid'] = this.form.uid
      tmp['requestId'] = this.randomString(20)
      this.form.json = JSON.stringify(tmp)
      // 进行rest请求
      console.log('发起请求')
      request({
        url: this.form.url,
        method: 'get',
        data: this.form.json
      }).then(response => {
        console.log('response', response)
        if (response && response.ack === 'success') {
          this.form.rtn = '成功'
        } else {
          this.form.rtn = '失败'
        }
      })
    },
    onClear() {
      this.form.uid = ''
      this.form.rtn = ''
    },
    randomString(len) {
      len = len || 32
      var chars =
        'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      var maxPos = chars.length
      var pwd = ''
      for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

