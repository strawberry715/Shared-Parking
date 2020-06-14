// pages/openblue/openblue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceId:'',
    uuid:'',
    notifycharacteristicId:'',
    writecharacteristicId:'',
    serviceIdAT:"0000f2f0-0000-1000-8000-00805f9b34fb",
    characteristicIdAT:"0000f2f1-0000-1000-8000-00805f9b34fb"
  },
  openblue(res){
    //初始化蓝牙
    wx.openBluetoothAdapter({
      success:(res) => {
        console.log("初始化蓝牙成功");
        //搜索附近蓝牙
        this.searchBlue();
      },
      fail: function (res) {
        console.log('请打开蓝牙和定位功能')
      }
    })
  },

  //搜索附近蓝牙
  searchBlue(){
    wx.startBluetoothDevicesDiscovery({
      success:(res)  =>  {
        console.log("搜索附近蓝牙成功");
        // console.log(res);
        //获取蓝牙模块发现的设备
        this.findBlue();
      },
      fail(){
        console.log("搜索附近蓝牙失败");
      }
    })
  },

  //获取蓝牙模块生效期间所有发现的设备
  findBlue(){
    wx.getBluetoothDevices({
      services:[],
      success:(res) => {
        console.log("获取附近蓝牙模块");
        for(var i = 0; i < res.devices.length; i++){
          if (res.devices[i].name == 'KRSeriB1226' || 
            res.devices[i].localName == 'KRSeriB1226'){
              console.log("获取车位锁设备成功");
              this.setData({
                deviceId: res.devices[i].deviceId,
              });
              this.connectedtoBlue();
              // console.log("车位锁设备:" + res.devices[i].deviceId)
            }
        };
       // 如果第一次搜索失败，则给出提示信息
        // if (this.data.deviceId == '') {
        //   this.showModal();
        // }
      },
      fail:(res) => {
        console.log("获取附近蓝牙设备失败");
      }
    })
  },

  //提示重新搜索
  // showModal(){
  //   wx.showModal({
  //     title: '蓝牙搜索失败',
  //     content: '对不起，蓝牙搜索失败，请重新搜索',
  //     success: function (res) {
  //       // if (res.confirm) {//这里是点击了确定以后
  //        console.log('用户点击确定');
  //        this.findBlue();
  //       // } else {//这里是点击了取消以后
  //       //   console.log('用户点击取消') 
  //       // }
  //     }
  //   })
  // },



  //停止查找其他设备
  stopfindBlue(){
    wx.stopBluetoothDevicesDiscovery({
      success:(res) => {
        console.log("停止查找其他设备");
      }
    })
  },

   //监听寻找新设备(如果第一次没有找到车位锁的设备，则需要在新的设备中寻找)
//  findnewBlue:() => {
//   // var that = this;
//   wx.onBluetoothDeviceFound(function(res){
//     console.log("又获取到新的设备了："+res.devices);
//     //检索车位锁
//     for(var i = 0; i < res.devices.length; i++){
//       if (res.devices[i].name == 'KRSeriB1226' || 
//         res.devices[i].localName == 'KRSeriB1226'){
//           console.log("在新设备中获取车位锁成功");
//           this.setData({
//             deviceId: res.devices[i].deviceId,
//           });
//           if (this.data.deviceId != '') {
//             this.connectedtoBlue();
//           }else{
//             console.log("连接车位锁失败");
//           }
//           // console.log("车位锁设备:" + res.devices[i].deviceId)
//         }
//     };
//   })
//  },

  //通过deviceId连接到车位锁
 connectedtoBlue(){
  wx.createBLEConnection({
    deviceId:this.data.deviceId,
    success:(res) => {
      console.log("通过deviceId连接车位锁成功");
      this.stopfindBlue();
      //获取蓝牙设备所有服务
      this.getBLEDeviceServices();
    },
    fail(){
      console.log("通过deviceId连接车位锁失败失败失败");
    }
  })
 },

 //获取蓝牙设备所有服务
 getBLEDeviceServices(){
  wx.getBLEDeviceServices({
    deviceId:this.data.deviceId,
    success:(res) => {
      console.log('获取蓝牙设备所有服务:', res.services)
      this.setData({
        uuid: res.services[0].uuid,
      });
      //获取蓝牙设备该服务中所有特征值
      this.getBLEDeviceCharacteristics();
    }
   })
 },

 //获取蓝牙设备该服务中所有特征值
 getBLEDeviceCharacteristics(){
  wx.getBLEDeviceCharacteristics({
    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
    deviceId:this.data.deviceId,
    // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
    serviceId:this.data.uuid,
    success:(res) => {
      console.log('蓝牙设备下标为1的服务中所有特征值:', res.characteristics);
      console.log(res);
      console.log(res.characteristics[0].properties.notify);
      for(let i=0;i<res.characteristics.length;i++){
        //存储notify为true的characteristicId的值
        if (res.characteristics[i].properties.notify == true) {
          this.setData({
            notifycharacteristicId:res.characteristics[i].uuid,
          });
         console.log("notify:"+this.data.notifycharacteristicId);
          //启用低功耗蓝牙设备特征值变化时的notify功能
          this.notifyBLECharacteristicValueChange();
        };
         //存储write为true的characteristicId的值
        if (res.characteristics[i].properties.write == true) {
          this.setData({
            writecharacteristicId:res.characteristics[i].uuid,
          });
         console.log("write:"+this.data.writecharacteristicId);
        };
       
      }
    }
  })
 },

 //启用低功耗蓝牙设备特征值变化时的notify功能
 notifyBLECharacteristicValueChange(){
  wx.notifyBLECharacteristicValueChange({
    state: true, // 启用 notify 功能
    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接  
    deviceId:this.data.deviceId,
    // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
    serviceId:this.data.uuid,
    // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
    characteristicId:this.data.notifycharacteristicId,
    success:(res) => {
      console.log('启用低功耗蓝牙设备特征值变化时的notify功能成功', res.errMsg);
       //监听低功耗蓝牙设备的特征值变化事件。
      this.onBLECharacteristicValueChange();
    }
  })
 },

 //监听低功耗蓝牙设备的特征值变化事件。
 onBLECharacteristicValueChange(){
    // ArrayBuffer转16进度字符串示例
    function ab2hex(buffer) {
      let hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function(bit) {
          return ('00' + bit.toString(16)).slice(-2)
        }
      )
      return hexArr.join('');
    }
    wx.onBLECharacteristicValueChange(function(res) {
      console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`);
      console.log(ab2hex(res.value));
    })
 },

 //发送通信协议
  sendAT(){
    // wx.showLoading({
    //   title: '通讯建立中...',
    // })
    var senddata = "AT+PWD[123456]";
    let buffer = new ArrayBuffer(senddata.length)
    let dataView = new DataView(buffer)
    for (var i = 0; i < senddata.length; i++) {
      dataView.setUint8(i, senddata.charAt(i).charCodeAt())
    }
    wx.writeBLECharacteristicValue({
      deviceId:this.data.deviceId,
      serviceId:this.data.serviceIdAT,
      characteristicId:this.data.characteristicIdAT,
      value: buffer,
      success:(res) => {
        // wx.hideLoading();
        // wx.showToast({
        //   title: '已连接车位锁',
        //   icon: 'success',
        //   duration: 1000
        // })
        // console.log("发送通信协议成功")
        // console.log(res)
        // times = 3;
        console.log('发送通信协议成功', res.errMsg);
        console.log('已发送AT');
        //发送通信协议成功后写入数据
        // this.writeBLECharacteristicValue();
      },
      fail:(res) => {
        if (times-- > 0) {
          console.log('AT发送失败，即将重新发送', res);
          this.sendAT();
        } else {
          wx.hideLoading();
        }
      }
    })
  },

//上升指令
//向特征值写入数据（向蓝牙写入设备）必须设备的特征值支持 write 才可以成功调用
  goUp(){
    this.sendAT();
    var that = this
    let buffer = new ArrayBuffer(7)
    let dataView = new DataView(buffer)
    dataView.setUint8(0, 0xaa)
    dataView.setUint8(1, 0x00)
    dataView.setUint8(2, 0x01)
    dataView.setUint8(3, 0x01)
    dataView.setUint8(4, 0x00)
    dataView.setUint8(5, 0x00)
    dataView.setUint8(6, 0xbb)
    let deviceId = this.data.deviceId
    wx.writeBLECharacteristicValue({
      // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId:that.data.deviceId,
      // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
      serviceId:that.data.uuid,
      // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
      characteristicId:that.data.writecharacteristicId,
      // 这里的value是ArrayBuffer类型
      value: buffer,
      success:(res)=> {
        console.log(res)
        console.log('已发送上升命令')
        // 写入数据后再读一次
        // setTimeout(that.readBLECharacteristicValue,2000)
      },
      fail:(res)=>{
        this.goUp()
        console.log('上升指令发送失败',res)
      }
    })
  },

//下降指令
  goDown(){
    var that = this
    let buffer = new ArrayBuffer(7)
    let dataView = new DataView(buffer)
    dataView.setUint8(0, 0xaa)
    dataView.setUint8(1, 0x00)
    dataView.setUint8(2, 0x01)
    dataView.setUint8(3, 0x02)
    dataView.setUint8(4, 0x00)
    dataView.setUint8(5, 0x00)
    dataView.setUint8(6, 0xbb)
    let deviceId = this.data.deviceId
    wx.writeBLECharacteristicValue({
      // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId:that.data.deviceId,
      // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
      serviceId:that.data.uuid,
      // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
      characteristicId:that.data.writecharacteristicId,
      // 这里的value是ArrayBuffer类型
      value: buffer,
      success:(res)=> {
        console.log(res)
        console.log('已发送下降命令')
        // 写入数据后再读一次
        // setTimeout(that.readBLECharacteristicValue,2000)
      },
      fail:(res)=>{
        this.goUp()
        console.log('下降指令发送失败',res)
      }
    })
},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
})