<template>
  <!-- 文字矩阵 -->
  <canvas id="c"></canvas>
  <!-- 定义画布 -->
</template>
<script>
export default {
  mounted() {
    var c = document.getElementById("c"); //拿到画布并赋值给c
    var ctx = c.getContext("2d"); //创建画笔,2d的

    c.height = window.innerHeight; //获取屏幕分辨率:高
    c.width = window.innerWidth; //宽
    var chinese = "01";
    chinese = chinese.split(""); //split() 方法用于把一个字符串分割成字符串数组。

    var font_size = 10; //字体大小
    var columns = Math.floor(c.width / font_size); //屏幕大小除以字体大小=字体个数;向下取整
    //an array of drops - one per column
    var drops = []; //创建一个数组
    for (var x = 0; x < columns; x++) drops[x] = 1;
    //drawing the characters
    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; //rgba:基础三色加不透明度
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = "#0F0"; //green text
      ctx.font = font_size + "px arial";
      //looping over drops
      for (var i = 0; i < drops.length; i++) {
        var text = chinese[Math.floor(Math.random() * chinese.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        //越接近一表示一起下落的可能性越低
        if (drops[i] * font_size > c.height && Math.random() > 0.975)
          drops[i] = 0;
        drops[i]++;
      }
    }
    setInterval(draw, 33); //时间间隔
  },
};
</script>
<style scoped>
body {
  background: black;
}
canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
