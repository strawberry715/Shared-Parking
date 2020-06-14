// pages/have/have.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    electricity:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://3090z0549n.imdo.co/park/carowner/1',
      method:'GET',
      data:{
        id:1
      },
      success:(res) => {
        this.setData({
          electricity:res.data.data.electric
        })
      }
    })
  },
  toRent(){
    wx.navigateTo({
      url: '/pages/rent/rent',
    })
  },
  toFrent() {
    wx.navigateTo({
      url: '/pages/Frent/Frent',
    })
  },
  toDetails() {
    wx.navigateTo({
      url: '/pages/details/details',
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