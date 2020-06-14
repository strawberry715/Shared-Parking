// pages/wallet/wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:'',
    addmoney:'',
    catshes:[
      {'id':'1','name':'10'},
      {'id':'2','name':'20'},
      {'id':'3','name':'30'},
      {'id':'4','name':'50'},
      {'id':'5','name':'80'},
      {'id':'6','name':'100'}
    ],
    btnId:'1'
  },

  //点击充值金额后改变颜色
  wallet_click:function(e){
    // console.log(e);
    // console.log(this.data.catshes[0].name);
    var btnId = e.currentTarget.dataset.id;
    wx.setStorage({
      data: btnId,
      key: 'itemId',
    });
    this.setData({
      btnId:btnId,
      // 获取用户点击的金额
      addmoney:this.data.catshes[btnId-1].name
    });
    console.log("充值的金额为：",this.data.addmoney);
  },

  //用户余额显示
  show_balance:function(){
    wx.request({
      url: 'http://3090z0549n.imdo.co/park/users/1',
      method:'GET',
      success:(res) => {
        // console.log("用户信息",res);
        console.log("用户余额：",res.data.data.balance);
        this.setData({
          balance:res.data.data.balance
        })
      }
    })
  },

  //获取自定义框的值
  customize:function(e){
    //多次显示自定义金额待改进！！！
    this.setData({
      addmoney:e.detail.value
    });
    // console.log("自定义的金额为",this.data.addmoney);
  },

  //用户充值
  inverst_money(){
    wx.request({
      url: 'http://3090z0549n.imdo.co/park/recharge/1',
      method:'POST',
      data:{
        // uid:1,
        money:this.data.addmoney
      },
      success: (res) => {
        console.log("充值成功",res);
        this.show_balance();
        //充值成功提示
        wx.showToast({
          title: '充值成功',   
          icon: 'success',    
          duration: 2000//持续的时间    
        })
      },
      fail:(res) => {
        console.log("充值失败")
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //用户余额显示
    this.show_balance();
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