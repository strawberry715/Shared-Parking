// pages/choosetime/choosetime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catches:[
      {'id': '0', 'value': '8:00-9:00','isChecked':false},
      {'id': '1', 'value': '9:00-10:00','isChecked':false},
      {'id': '2', 'value': '10:00-11:00','isChecked':false},
      {'id': '3', 'value': '11:00-12:00','isChecked':false},
      {'id': '4', 'value': '12:00-13:00','isChecked':false},
      {'id': '5', 'value': '13:00-14:00','isChecked':false},
      {'id': '6', 'value': '14:00-15:00','isChecked':false},
      {'id': '7', 'value': '15:00-16:00','isChecked':false},
      {'id': '8', 'value': '16:00-17:00','isChecked':false},
    ]
  },
  //点击选择时间
  time_click:function(e){
    // console.log(e);
    var that = this;                                                                    
    var btnId = e.currentTarget.dataset.id;
    var item = that.data.catches[btnId];
    item.isChecked = !item.isChecked;
    //重新加载数据
    that.setData({
      catches:that.data.catches
    })
  },

  toOrder(){
    wx.navigateTo({
      url: '/pages/order/order',
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