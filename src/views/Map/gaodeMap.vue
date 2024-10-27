<template>
  <div id="container"></div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader"; //引入
// 安全密钥
window._AMapSecurityConfig = {
  securityJsCode: "7e5b50e0774dd5e2153ef5421e052597",
};
export default {
  name: "gaode",
  data() {
    return {
      map: null, //初始化 map 对象
    };
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: "9ccdc2fd6c6cded4f2c445bb13d507df", //此处填入我们注册账号后获取的Key
        version: "2.0", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          "AMap.ToolBar",
          "AMap.Scale",
          "AMap.Geolocation",
          "AMap.ControlBar",
          "AMap.HawkEye",
          "AMap.MapType",
        ], //需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            //设置地图容器id
            viewMode: "3D", //是否为3D地图模式
            zoom: 13, //初始化地图级别
            center: [114.316113, 34.814103], //初始化地图中心点位置(河南大学东苑)
            showMarker: true,
          });
          //添加控件
          this.map.addControl(
            new AMap.ToolBar({
              position: "LT",
            })
          ); //缩放控件
          this.map.addControl(new AMap.Scale()); //比例尺控件
          this.map.addControl(new AMap.Geolocation({})); //定位控件
          // this.map.addControl(new AMap.ControlBar()); //控制罗盘控件
          this.map.addControl(new AMap.HawkEye()); //鹰眼控件
          this.map.addControl(new AMap.MapType()); //图层切换控件
          //添加点标记
          let maker1 = new AMap.Marker({
            position: new AMap.LngLat(114.309244, 34.817043), //河南大学金明校区坐标
            title: "河南大学金明校区",
          });
          let maker2 = new AMap.Marker({
            position: new AMap.LngLat(114.369525, 34.811487), //河南大学明伦校区坐标
            title: "河南大学明伦校区",
          });
          let maker3 = new AMap.Marker({
            position: new AMap.LngLat(114.316113, 34.814103), //河南大学金明校区东苑学生公寓坐标
            title: "河南大学金明校区东苑学生公寓",
          });
          let maker4 = new AMap.Marker({
            position: new AMap.LngLat(114.355889, 34.79385), //开封鼓楼广场坐标
            title: "开封鼓楼广场",
          });
          let makerList = [maker1, maker2, maker3, maker4];
          // maker2.setAnimation(AMap.Marker.ANIMATION_BOUNCE); // 注意这里没有引号

          this.map.add(makerList); //将创建的点标记添加地图实例

          console.log(makerList);

          // this.map.remove(maker1) //移除已创建的maker
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    //挂载阶段调用，DOM初始化完成进行地图初始化
    this.initMap();
  },
};
</script>
<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  height: 100%;
  width: 100%;
}
/* 去除水印文字 */

:deep() .amap-logo {
  display: none !important;
}
:deep() .amap-copyright {
  display: none !important;
}
</style>
