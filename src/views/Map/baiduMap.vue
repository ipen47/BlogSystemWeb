<template>
  <div id="baidu"><baidu-map class="bm-view" @ready="init"></baidu-map></div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    init({ BMap, map }) {
      // 初始化地图
      var map = new BMap.Map("baidu");
      var point = new BMap.Point(114.316113, 34.814103); // 地图中心点坐标
      map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
      // 1.标准地图：BMAP_NORMAL_MAP
      // 2.地球模式：BMAP_EARTH_MAP
      // 3.普通卫星地图：BMAP_SATELLITE_MAP
      map.setMapType(BMAP_NORMAL_MAP); // 设置地图类型为地普通卫星地图
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      //添加控件
      // 比例尺	ScaleControl	默认位于地图左下方，显示地图的比例关系
      // 缩放	NavigationControl	默认位于地图右下方，控制地图级别的缩放
      // 定位	GeolocationControl	默认位于地图左下方，用于获取定位
      // 城市选择列表	CityListControl	默认位于地图左上方，用于进行城市选择定位
      // 缩略地图	OverviewMapControl	默认位于地图右下方，是一个可折叠的缩略地图
      // 地图类型	MapTypeControl	默认位于地图右上方
      map.addControl(new BMap.ScaleControl());
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.GeolocationControl());
      map.addControl(new BMap.OverviewMapControl());
      map.addControl(new BMap.MapTypeControl());
      //添加点标注
      var marker = new BMap.Marker(point); //河南大学金明校区东苑宿舍坐标
      //跳动的动画

      map.addOverlay(marker);
      marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
#baidu {
  padding: 0px;
  margin: 0px;
  height: 100%;
  width: 100%;
}
/* 去除文字 */
:deep() .BMap_cpyCtrl {
  display: none !important;
}
</style>
