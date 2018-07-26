<!-- can move -->
<template>
  <div @click="handleClick" :style="{'z-index': zIndex}" class="ProjectTab-container window" ref="ProjectT">
      <div @mousedown="tabHandleMouseDown($event)" class="ProjectTab-container-header">{{label}}</div>
      <div class="searchBox">
      </div>
  </div>
</template>
<script>
export default {
  name: 'ProjectTab',
  props: ['label'],
  data () {
    return {
        zIndex: 99,
    }
  },
  methods: {
    tabHandleMouseDown: function($event) {
      let e = $event.target
      e.style.zIndex            = "99999"
      e.parentNode.style.zIndex = "99999"
      let ProjectT  = this.$refs.ProjectT
      let startX  = $event.clientX-ProjectT.offsetLeft
      let startY  = $event.clientY-ProjectT.offsetTop
      this.startX = startX
      this.startY = startY
      this.ProjectT = ProjectT
      this.ProjectT.onmousemove = this.tabHandleMouseMove
      document.onmouseup      = this.tabHandleMouseUp
    },
    tabHandleMouseMove: function(e) {
      this.ProjectT.style.left = e.clientX-this.startX+"px"
      this.ProjectT.style.top  = e.clientY-this.startY+"px"
    },
    tabHandleMouseUp: function() {
      this.ProjectT.onmousemove = null
      this.ProjectT.onmouseup   = null
    },
    handleClick: function () {
        let wind = document.getElementsByClassName('window')
        for (let i=0;i<wind.length;i++) {
            wind[i].style.zIndex = wind[i].style.zIndex - 1
            if (wind[i].style.zIndex < 1) {
                wind[i].style.zIndex = 1
            }
        }
        this.zIndex = this.zIndex + 1
    }
  }
}
</script>
<style scoped>
.ProjectTab-container {
  display: flex;
  justify-content: center;
  padding-top: 50px;
  position: absolute;
  width: 12vw;
  min-width: 300px;
  height: 50vh;
  min-height: 180px;
  border: 3px solid #113337;
  background-color: #489799;
  overflow: auto; /* 加上overflow鼠标离开事件源神奇不影响事件生存 */
  box-shadow: 0 0 14px #113337;
  overflow: hidden;
}
.ProjectTab-container-header {
  position: absolute;
  top: 0;
  width: 100%;
  height: 3%;
  min-height: 25px;
  background-color: #113337;
  cursor: move;
  text-align: center;
  color: #B0B6B7;
}
.search> input {
  min-width: 279px;
  outline: none;
  border: 0;
  height: 2.1em;
  padding: 0.5em;
  background-color: #00292F;
  color: #b0b4b4;
  border-radius: 4px;
  margin-bottom: 2px;
}
.searchBox {
  width: 279px;
  position: relative;
  margin: 0 auto;
}
.searchRes {
  float: left;
  width: 279px;
  height: auto;
  max-height: 200px;
  background: url("../../assets/bgi.png") center center;
  overflow: auto;
  border-radius: 4px;
}
.searchRes> ul> li {
  margin: 0;
  padding: 0;
  line-height: 2em;
  overflow: auto;
  color: #b0b4b4;
  padding: 0.5em;
  cursor: pointer;
  border-bottom: 2px solid #489799;
  border-radius: 4px;
}
.player {
  margin: auto;
}
</style>
