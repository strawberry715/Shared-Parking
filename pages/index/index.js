//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   msg:'strawberry',
   userInfo:{},
   isShow:false
  },
  //事件处理函数
  handleClick(){
    // this.newuser();
    wx.switchTab({
      url: '/pages/want/want',
    })
  },

  //向后台传入数据，新增用户
  newuser(){  
    console.log("新建用户成功",this.data.userInfo.nickName);
    wx.request({
      url: 'http://3090z0549n.imdo.co/park/users',
      method:'POST',
      data:{
        username:this.data.userInfo.nickName,
        password:this.data.userInfo.nickName+'123',
        iphone:'18930098267'
      },
      success:(res) => {
        console.log("新增用户成功",res);
      },
      fail(){
        console.log("新增用户失败");
      }
    })
  },

  onLoad: function (options) {
    this.getUserInfo();
    },
  getUserInfo(){
     //判断用户是否授权
     wx.getSetting({
      success:(data) => {
        console.log(data);
        if(data.authSetting['scope.userInfo']){
          //用户已经授权
          console.log("已经授权");
          this.setData({
            isShow:false
          });
        }else{
          //没有授权
          console.log("尚未授权");
          this.setData({
            isShow:true
          });
        }
      }
    })

   // console.log(this);
   // let that = this;
    //获取用户登录的信息
    wx.getUserInfo({
      success:(data) => {
        console.log(data);
        //更新data中的userInfo
        this.setData({
          userInfo : data.userInfo
        });
      },
      fail:(data) => {
        console.log("获取用户信息失败");
      }
    })
  },
  handleGetUserInfo(data){
    console.log("用户点击了",data);
    //判断用户点击的是否是允许
    if(data.detail.rawData){
      //用户点击的是允许
      this.getUserInfo();
    }
  } 
    
})
