// pages/want/want.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //搜索车位
  toSearch(){
    wx.navigateTo({
      url: '/pages/searchmap/searchmap',
    })
  },
  //我的钱包
  toMywallet(){
    wx.navigateTo({
      url: '/pages/wallet/wallet',
    })
  },
 // 导航
  toNavicate(){
    wx.navigateTo({
      url: '/pages/navicate/navicate',
    })
  },
  //停车记录
  toParknote(){
    wx.navigateTo({
      url: '/pages/parknote/parknote',
    })
  },
  //开锁
  openclock(){
    wx.navigateTo({
      url: '/pages/openblue/openblue',
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})