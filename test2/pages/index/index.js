Page({

  /**
   * 页面的初始数据
   */
  data: {
      region:['北京市','北京市','东城区'],
      now:{
          temp:0,
          text:"未知",
          icon:1,
          humidity:0,
          pressure:0,
          vis:0,
          windDir:0,
          windScale:0,
          windSpeed:0

      }
  },
  regionChange:function(e){
      this.setData({region: e.detail.value});
      this.getWeather();
  },
  getWeather:function(){
    var that=this;
    // 先获取城市ID
    wx.request({
        url: 'https://n55ctuk93r.re.qweatherapi.com/geo/v2/city/lookup',
        data: {
            location: that.data.region[2] || '北京', // 使用选择的区域或默认值
            adm: that.data.region[1], 
        },
        header: {
            'X-QW-Api-Key': '320b1d6a698b4855ba3a51722198b5e4'
        },
        success: function(res) {
            if (res.data.code === '200' && res.data.location.length > 0) {
                // 获取第一个城市的ID
                var locationId = res.data.location[0].id;
                // 请求天气数据
                wx.request({
                    url: 'https://n55ctuk93r.re.qweatherapi.com/v7/weather/now',
                    data: {
                        location: locationId
                    },
                    header: {
                        'X-QW-Api-Key': '320b1d6a698b4855ba3a51722198b5e4'
                    },
                    success: function(res){
                        console.log(res.data)
                        that.setData({now:res.data.now})
                    },
                });
            }
        },
    });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();
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