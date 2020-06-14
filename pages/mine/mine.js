// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    earnings:'',
    money:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取车主收益信息
    this.getearnings();
    this.getmoney();
  },


  //获取车主的收益
  getearnings(){
    wx.request({
      url: 'http://3090z0549n.imdo.co/park/carowner/1',
      method:'GET',
      success:(res) => {
        console.log("获取车主信息成功",res);
        this.setData({
          earnings:res.data.data.earnings
        })
      }
    })
  },

    //获取用户的余额
    getmoney(){
      wx.request({
        url: 'http://3090z0549n.imdo.co/park/users/1',
        method:'GET',
        success:(res) => {
          console.log("获取用户信息成功",res);
          this.setData({
            money:res.data.data.balance
          })
        }
      })
    },

  toWallet() {
    wx.navigateTo({
      url: '/pages/wallet/wallet',
    })
  },
  toCoupon(){
    wx.navigateTo({
      url: '/pages/coupon/coupon',
    })
  },
  toBenefit(){
    wx.navigateTo({
      url: '/pages/benefit/benefit',
    })
  },
  toPark() {
    wx.navigateTo({
      url: '/pages/park/park',
    })
  },
  toSuggest() {
    wx.navigateTo({
      url: '/pages/suggest/suggest',
    })
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