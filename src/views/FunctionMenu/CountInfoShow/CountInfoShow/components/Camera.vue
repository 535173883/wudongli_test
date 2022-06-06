<template>
  <div id="video-container">
    <h3>暂无摄像头</h3>
    <div class="menudot" @click="fullScreen" v-show="!isscreenfull">
      <svg-icon icon-class="fullScreen"></svg-icon>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";
export default {
  name: "CameraPage",
  data() {
    return {
      isscreenfull: false,
    };
  },
  methods: {
    //全屏准备
    screenPrepare() {
      screenfull.on("change", () => {
        this.isscreenfull = !this.isscreenfull;
      });
      //禁用f11全屏
      window.onkeydown = function (event) {
        if (event.keyCode === 122) {
          event.preventDefault();
          event.returnValue = false;
        }
      };
    },
    //全屏按钮
    fullScreen() {
      const element = document.getElementById("video-container");
      if (screenfull.isEnabled) {
        screenfull.request(element);
      } else {
        console.log("object");
        // Ignore or do something else
      }
    },
  },
  mounted() {
    this.screenPrepare();
  },
};
</script>

<style lang="scss" scoped>
#video-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #dddddd;
}
.menudot {
  position: absolute;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 13px;
  right: 3px;
  top: calc(50% - 20px);
  z-index: 1;
  background-color: hsla(0, 0%, 47.1%, 0.2);
  cursor: pointer;
  overflow: hidden;
  text-align: center;
  font-size: 30px;
  color: #fff;
  svg {
    color: #ffffff;
  }
}
</style>
