// pages/order/order.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'浙江省宁波市鄞州区学士路199号',
    time:'',
    date:'点击选择日期',
    starttime:'选择开始时间',
    endtime:'选择结束时间'
  },
  toChoosetime(){
    wx.navigateTo({
      url: '/pages/rentNext/rentNext',
    })
  },

  toPaymoney(){
    if(this.data.date != "点击选择日期" && this.data.starttime != "选择开始时间" && this.data.endtime != "选择结束时间"){
      this.paymoney();
    }else{
      wx.showModal({
        title: '提示',   
        content: '请选择租用日期、时间',    
        success: function (res) {    
          if (res.confirm) {//这里是点击了确定以后   
            console.log('用户点击确定')    
          } else {//这里是点击了取消以后     
            console.log('用户点击取消')    
          }    
        }    
      })
    }
  },

  paymoney(){
    wx.request({
      url: 'http://3090z0549n.imdo.co/park/indent/1/1',
      method:'POST',
      data:{
        date:this.data.date,
        createTime:this.data.starttime+':00',
        overTime:this.data.endtime+':00',
        money:5
      },
      success:(res) => {
        console.log("支付成功");
        wx.showModal({
          title: '提示',   
          content: '支付成功',    
          success: function (res) {    
            if (res.confirm) {//这里是点击了确定以后   
              console.log('用户点击确定')    
            } else {//这里是点击了取消以后     
              console.log('用户点击取消')    
            }    
          }    
        })
      }
    })
  },

  bindDateChange: function(e) {
    console.log('预约日期选择改变', e.detail.value)
    this.setData({
      date: e.detail.value,
    });
  },
  bindTimeChange: function(e) {
    console.log('开始时间选择改变', e.detail.value)
    this.setData({
      starttime: e.detail.value
    })
  },
  bindendTimeChange: function(e) {
    console.log('结束时间选择改变', e.detail.value)
    this.setData({
      endtime: e.detail.value
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