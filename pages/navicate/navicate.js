// pages/Navicate/Navicate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {    
    markers:[]
  },
  //移动定位位置
  move:function(res){
    console.log(res);
    let index_lat = "markers[0].latitude";
    let index_lng = "markers[0].longitude";
    this.setData({
      [index_lat]:res.detail.latitude,
      [index_lng]:res.detail.longitude
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   var that = this;
  //   //获取当前位置
  //   wx.getLocation({
  //     success:function(res){
  //       console.log(res);
  //       that.setData({
  //         markers:[
  //           {
  //             latitude:res.latitude,
  //             longitude:res.longitude,
  //             iconPath:"/img/search/now_location.png",
  //             width:40,
  //             height:40,
  //             callout:{
  //               content:"当前位置",
  //               color:"black",
  //               fontSize:13,
  //               borderRadius:5,
  //               borderWidth:1,
  //               borderColor:'black',
  //               padding:2,
  //               display:"ALWAYS"
  //             }
  //           }
  //         ]
  //       })
  //     }
  //   })
  // },

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