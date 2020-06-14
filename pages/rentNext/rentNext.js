// pages/rentNext/rentNext.js
var app = getApp();

Page({

  
  /**
   * 页面的初始数据
   */
  data: {
    starttime:app.data.userstarttime,
    startdate:app.data.userstartdate,
    enddate:app.data.userenddate,
    endtime:app.data.userendtime
  },



        //修改时间与全局时间相同

          //修改我要出租的时间
          tocConfirmchoosetime(){
            // var that = this;
            if(this.data.startdate != '选择开始日期' && this.data.enddate != '选择结束日期' && this.data.starttime != '选择开始时间' && this.data.endtime != '选择结束时间'){
              this.choosetime();
            }else{
              wx.showModal({
                title: '提示',   
                content: '请选择时间',   
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
          choosetime(){
            wx.navigateTo({
              url: '/pages/order/order',
            });
          },
  
           //时间选择
          bindDateChange: function(e) {
            console.log('开始日期选择改变', e.detail.value)
            this.setData({
              startdate: e.detail.value,
            });
          },
          bindendDateChange: function(e) {
            console.log('结束日期选择改变', e.detail.value)
            this.setData({
              enddate: e.detail.value
            })
          },
          bindTimeChange: function(e) {
            console.log('开始时间选择改变，携带值为', e.detail.value)
            this.setData({
              starttime: e.detail.value
            })
          },
          bindendTimeChange: function(e) {
            console.log('结束时间选择改变，携带值为', e.detail.value)
            this.setData({
              endtime: e.detail.value
            })
          },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  //点击时间后改变样式
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