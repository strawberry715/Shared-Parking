// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    address:'',
    telephone:'',
    bluename:'',
    electricity:'',
    income:'',
    lastlogin:''
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
        console.log("获取车位详情成功：",res);
        console.log(res.data.data.username);
        this.setData({
          name:res.data.data.username,
          address:res.data.data.place,
          telephone:res.data.data.iphone,
          bluename:res.data.data.bluetooth,
          electricity:res.data.data.electric,
          income:res.data.data.earnings,
          lastlogin:res.data.data.loginTime
        })
      }
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