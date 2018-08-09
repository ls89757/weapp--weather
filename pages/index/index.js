// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js');
Page({
  data: {
    currentWeatherData:{
      currentCity:'',
      date:'',
      pm25:'',
      temperature:'',
      weatherDesc:'',
      wind:'',
      realTimeTemperature:''
    },
     originalWeatherData:{
       weatherData:[],
     },
  },
  
  onShow: function()
  {
    this.init();
  },
  onPullDownRefresh:function()
  {
    this.init();
  },
  init()
  {
    var that = this;

    wx.getStorage({
      key: 'data',
      success: function (res) {
        console.log("res");
        console.log(res);
        that.setData({
          'currentWeatherData.currentCity': res.data.currentWeatherData.currentCity,
          'currentWeatherData.date': res.data.currentWeatherData.date,
          'currentWeatherData.pm25': res.data.currentWeatherData.pm25,
          'currentWeatherData.temperature': res.data.currentWeatherData.temperature,
          'currentWeatherData.realTimeTemperature': res.data.currentWeatherData.realTimeTemperature,
          'currentWeatherData.weatherDesc': res.data.currentWeatherData.weatherDesc,
          'currentWeatherData.wind': res.data.currentWeatherData.wind,
          'originalWeatherData.weatherData': res.data.originalWeatherData.weatherData
        });
      }
    });
    // console.log(this.data);
    var BMap = new bmap.BMapWX({
      ak: 'aGk5BtwP77aIbIc7M0LuVprRmB3q8pIp'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var str = data.currentWeather[0].date;
      var result = str.match(/\(([^)]*)\)/);
      var sub = result[1].substring(3);
      that.setData({
        'currentWeatherData.currentCity': data.currentWeather[0].currentCity,
        'currentWeatherData.date': data.currentWeather[0].date,
        'currentWeatherData.pm25': data.currentWeather[0].pm25,
        'currentWeatherData.temperature': data.currentWeather[0].temperature,
        'currentWeatherData.realTimeTemperature': sub,
        'currentWeatherData.weatherDesc': data.currentWeather[0].weatherDesc,
        'currentWeatherData.wind': data.currentWeather[0].wind,
        'originalWeatherData.weatherData': data.originalData.results
      });
      wx.setStorage({
        key: "data",
        data: that.data
      });
      // console.log(wx.getStorageSync("data"));
      // console.log("that.data is");
      // console.log(that.data);
      wx.stopPullDownRefresh();
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
    // console.log("this.data is ");
    console.log(this.data);
  }
})