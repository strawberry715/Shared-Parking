// pages/rent/rent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '12:01',
    latitude:'',
    longitude:'',
    address:'点击右侧图表输入地址',
    name:'阿文',
    password:'',
    starttime:'选择开始时间',
    startdate:'选择开始日期',
    enddate:'选择结束日期',
    endtime:'选择结束时间',
    id:1,
    tel:'',
    bluename:''
  },

  //搜索车位地址
  toChooseLocation(){
    wx.chooseLocation({
      success:(res) => {
        console.log("开始搜索地址",res);
        //更改data中的定位数据
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude,
          address:res.address
        });
        //显示搜索后的位置
        this.getnowmap();
        console.log("搜索位置成功");
      }
    })
  },

    //定位当前位置
    getnowmap(){
      var that = this;
      wx.getLocation({
        success:(res) => {
          that.setData({
            // latitude:res.latitude,
            // longitude:res.longitude,
            markers:[
              {
                latitude:this.data.latitude,
                longitude:this.data.longitude,
                iconPath:"/img/search/now_location.png",
                width:40,
                height:40,
                callout:{
                  content:"当前位置",
                  color:"black",
                  fontSize:13,
                  borderRadius:5,
                  borderWidth:1,
                  borderColor:'black',
                  padding:2,
                  display:"ALWAYS"
                }
              }
            ],
          });
        }
      })
    },


    //监听输入框
    monitortel:function(e){
       //多次显示自定义金额待改进！！！
      this.setData({
        tel:e.detail.value
      });
      // console.log("输入框中输入的联系电话：",this.data.tel);
    },
    monitorbluname:function(e){
        //多次显示自定义金额待改进！！！
        this.setData({
          bluename:e.detail.value
        });
        // console.log("输入框中输入的蓝牙名称：",this.data.bluename);
    },

    //时间选择
    bindDateChange: function(e) {
      console.log('开始日期选择改变', e.detail.value)
      this.setData({
        startdate: e.detail.value
      })
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

        //传入我要出租的订单
        toConfirm(){
          // var that = this;
          if(this.data.latitude != '' && this.data.longitude != ''){
            this.confirm();
          }else{
            wx.showModal({
              title: '提示',   
              content: '请选择地址',   
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
        confirm(){
          wx.request({
            url: 'http://3090z0549n.imdo.co/park/carowner',
            method:'POST',
            data:{
              username:this.data.name,
              password:this.data.name+'123',
              latitude:this.data.latitude,
              longitude:this.data.longitude,
              iphone:this.data.tel,
              bluetooth:this.data.bluename
            },
            success:(res) => {
              console.log("我要出租订单提交成功",res);
            }
          })
        },

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
        choosetime:function(){
          console.log("111");
          wx.request({
            url: 'http://3090z0549n.imdo.co/park/rent/1',
            method:'POST',
            data:{
              createTime:this.data.startdate+' '+this.data.starttime+':00',
              overTime:this.data.enddate+' '+this.data.endtime+':00',
            },
            success:(res) => {
              console.log("我要出租订单提交成功",res);
            }
          })
        },

    //确认出租时既向后台传入出租信息，同时改变出租时间
      toRent(){
        this.toConfirm();
        this.tocConfirmchoosetime();
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