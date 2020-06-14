// pages/parknote/parknote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parknotes:[
      // {'id':'','address':'','time':''}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://3090z0549n.imdo.co/park/indent/user/1',
      success:(res) => {
        console.log("查询该用户的所有订单记录",res);
        console.log(res.data.data[0].numbers);
        wx.hideLoading();
        var result = res.data.data;
        var list = [];
        for(var i=0;i<result.length;i++){
          // console.log("用户的订单编号:"+result[i].numbers);
          var obj = {
            id:result[i].numbers,
            address:result[i].carOwner.place,
            time:result[i].date+' '+result[i].createTime,
            state:result[i].state
          }
          list.push(obj);
        }
        this.setData({
          parknotes:list
        })
        console.log("从后台获取更改后的parknotes：",this.data.parknotes)
      }
    })
  },

  toAssess(){
    wx.navigateTo({
      url: '/pages/assess/assess',
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