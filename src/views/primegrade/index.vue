<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Uid">
        <el-input v-model="form.uidinput" placeholder="请输入用户uid" />
      </el-form-item>
      <el-form-item label="预设接口">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item label="会员等级">
        <el-radio-group v-model="form.userprimegrade">
          <el-radio label="gold">黄金会员</el-radio>
          <el-radio label="bojin">铂金会员</el-radio>
          <el-radio label="diamond">钻石会员</el-radio>
          <el-radio label="heizuan">黑钻会员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="返回结果">
        <el-input v-model="form.returndesc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import crossDomainPost from '@/api/crossdomain'
export default {
  data() {
    return {
      form: {
        uidinput: '',
        userprimegrade: '',
        returndesc: '',
        url: 'http://10.5.23.145:8080/api/upGradeForGrowth'
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.form.uidinput === '') {
        this.$message({
          message: '请输入用户uid！',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: this.form.uidinput,
        type: 'warning'
      })

      var tmp = {
        'uid': this.form.uidinput,
        'growth': this.form.userprimegrade === 'gold' ? 300 : this.form.userprimegrade === 'bojin' ? 3000 : this.form.userprimegrade === 'diamond' ? 10000 : this.form.userprimegrade === 'heizuan' ? 100000 : 0,
        'justcheck': 0
      }
      // 进行rest请求
      console.log('发起请求')
      crossDomainPost({
        url: this.form.url,
        json: JSON.stringify(tmp)
      }).then(response => {
        console.log('response', response)
        if (response && response.ResponseStatus.Ack === 'Success') {
          if (response.tolevel === 10) {
            this.form.returndesc = '升级成功！' + '黄金会员' + 'level:' + response.tolevel
          } else if (response.tolevel === 20) {
            this.form.returndesc = '升级成功！' + '铂金会员' + 'level:' + response.tolevel
          } else if (response.tolevel === 30) {
            this.form.returndesc = '升级成功！' + '钻石会员' + 'level:' + response.tolevel
          } else if (response.tolevel === 40) {
            this.form.returndesc = '升级成功！' + '黑钻会员' + 'level:' + response.tolevel
          } else {
            this.form.returndesc = '请检查账户' + 'level:' + response.tolevel
          }
        } else {
          this.form.returndesc = '升级失败！'
        }
      })
    },
    onCancel() {
      this.$message({
        message: '取消!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

