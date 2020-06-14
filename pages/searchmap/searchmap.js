// pages/searchmap/searchmap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:[],
    latitude:'29.8172',
    longitude:'121.547',
    index:[],
    parkid:''
  },

  toSearchLoaction(){
    //搜索需要停车的位置
    this.chooseLocation();
  },

  //定位当前位置
  getnowmap(){
    var that = this;
    wx.getLocation({
      success:(res) => {
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude,
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

  //搜索位置并定位到相应位置
  chooseLocation(){
    wx.chooseLocation({
      success:(res) => {
        console.log("开始搜索地址",res);
        //更改data中的定位数据
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude
        });
        //显示搜索后的位置
        this.getnowmap();
        console.log("搜索位置成功");
        // console.log(res.errMsg);       
        // this.showParker();
      }
    });
  },

  //显示搜索位置附近的车位
  showParker(){
    wx.request({
      url: 'http://3090z0549n.imdo.co/park/carowner',
      method:'GET',
      dataType:'json',
      data:{  latitude:this.data.latitude,
              longitude:this.data.longitude,
              range:1000,
              num:4         },
      success:(res) => {
        console.log("连接后台数据库成功：",res);
        var result = res.data.data.carowner;
        for(var i=0;i<result.length;i++){
          let lat = result[i].latitude;
          let lng = result[i].longitude;
          var index = "markers["+(i+1)+"]";
          var idd = i;
          this.setData({
            [index]:{
              id:idd,
              latitude:lat,
              longitude:lng,
              iconPath:"/img/search/location_icon.png",
              width:40,
              height:40, 
              callout:{
                content:"车位",
                color:"black",
                fontSize:13,
                borderRadius:5,
                borderWidth:1,
                borderColor:'black',
                padding:2,
                display:"ALWAYS" }
            }
          });
        }
      }
    })
  },

  //图表跳转
  markertap(e){
    console.log(e);
    console.log(e.markerId);
    this.setData({
      parkid:e.markerId
    });
    console.log(this.data.parkid);
    wx.request({
      url: 'http://3090z0549n.imdo.co/park/carowner/'+this.data.parkid,
      method:'GET',
      success:(res) => {
        console.log("获取车位信息成功",res);
      }
    })
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前位置
    this.getnowmap();
  }
})