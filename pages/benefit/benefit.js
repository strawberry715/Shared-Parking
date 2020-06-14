// pages/benefit/benefit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    benefitdetails:[
      // {'numbers':'','time':'','creatTime':'','overTime':'','income':'','state':''},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */

   //请求获取数据
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://3090z0549n.imdo.co/park/indent/carowner/1',
      method:'GET',
      success:(res) => {
        console.log("获取车主订单信息成功：",res);
        wx.hideLoading();
        // console.log(res.data.data[0].numbers);
        var result = res.data.data;
        var list = [];
        for(var i=0;i<result.length;i++){
          var obj = {
            numbers:result[i].numbers,
            income:result[i].money,
            state:result[i].state,
            time:result[i].date,
            creatTime:result[i].createTime,
            overTime:result[i].overTime
          }
          list.push(obj);
        }
        this.setData({
          benefitdetails:list
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