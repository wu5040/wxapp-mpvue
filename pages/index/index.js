//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    // wx.showTabBar({})
    wx.switchTab({
      url: '../videos/videos'
    })
    console.log(wx.getStorageSync('useropenid'))
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log('首次使用，弹窗授权，点击进入依溪云按钮', e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    wx.request({
      url: 'http://127.0.0.1:5000/login',
      method: 'POST',
      data: {
        openid: wx.getStorageSync('useropenid'),
        nickName: e.detail.userInfo.nickName,
        gender:
          e.detail.userInfo.gender == 1 ? '男' : '女',
        city: e.detail.userInfo.city,
        province: e.detail.userInfo.province
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.statusCode === 200) {
          wx.showTabBar({})
          wx.switchTab({
            url: '../videos/videos'
          })
        }
      }
    })
  }
})
