<template>
  <div>
    <button open-type="getUserInfo" @getuserinfo="bindgetuserinfo">用户授权</button>
    <txv-video vid="n08529w6iq8" playerid="txv1"></txv-video>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    onLoad () {
      // 查看是否授权

    },
    bindgetuserinfo: function (e) {
      console.log(e)
      wx.login({
        success (res) {
          if (res.code) {
            // 发起网络请求
            console.log(res.code)
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session',
              data: {
                appid: 'wx574909b2ce478921',
                secret: '',
                js_code: res.code,
                grant_type: 'authorization_code'
              },
              success (res) {
                console.log('登录请求结果', res.data)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  }
}
</script>
<style></style>