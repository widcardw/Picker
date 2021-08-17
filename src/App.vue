<template>
  <div id="app">
    <div class="drag">
    </div>
      <div class="resize">
        <div class="option-btn" id="minimize" @click="onWindowMinimize"></div>
        <div class="option-btn" id="maximize" @click="onWindowMaximize"></div>
        <div class="option-btn" id="closebtn" @click="onWindowClose"></div>
      </div>
    <div class="icon-tool-bar"
    @click="barClicked">
      <router-link :to="{ name: 'homepage' }">
        <div class="tool-icon" title="主页" id="homepagebtn">
          <div class="btn-homepage"></div>
        </div>
      </router-link>
      <router-link :to="{ name: 'competition' }">
        <div class="tool-icon" title="答题" id="competitionbtn">
          <div class="btn-competition"></div>
        </div>
      </router-link>
      <router-link :to="{ name: 'edit' }">
        <div class="tool-icon" title="编辑" id="editbtn">
          <div class="btn-edit"></div>
        </div>
      </router-link>
      <router-link :to="{ name: 'database' }">
        <div class="tool-icon" title="题库" id="databasebtn">
          <div class="btn-database"></div>
        </div>
      </router-link>
      <router-link :to="{ name: 'settings' }">
        <div class="tool-icon" title="设置" id="settingsbtn">
          <div class="btn-settings"></div>
        </div>
      </router-link>
      <router-link :to="{ name: 'about' }">
        <div class="tool-icon" title="关于" id="aboutbtn">
          <div class="btn-about"></div>
        </div>
      </router-link>
    </div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App" style="display: none"/>
    <router-view> </router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { ipcRenderer } from 'electron'
// const { ipcRenderer } = window.require("electron");
// const ipcRenderer = window.ipcRenderer;

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  methods: {
    resetIconClass: function () {
      let arr = [
        document.querySelector("#homepagebtn"),
        document.querySelector("#competitionbtn"),
        document.querySelector("#editbtn"),
        document.querySelector("#databasebtn"),
        document.querySelector("#settingsbtn"),
        document.querySelector("#aboutbtn"),
      ]
      for (let i = 0; i < arr.length; i++) {
        arr[i].className = "tool-icon"
      }
    },
    barClicked: function () {
      // console.log("Bar clicked!");
      // 重置侧边栏图标样式
      this.resetIconClass();
      // 选中当前页的名称
      let currentpage = this.$router.history.current.name;
      //改变当前页对应侧边栏按钮的样式
      document.querySelector("#" + currentpage + "btn").className="tool-icon tool-checked";
    },
    onWindowMinimize: function () {
      ipcRenderer.send('minimize');
    },
    onWindowMaximize: function () {
      ipcRenderer.send('maximize');
    },
    onWindowClose: function () {
      ipcRenderer.send('winclose');
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
/* 使用微软开发的 codicons */
@font-face {
  font-family: "codicon";
  src: url("./assets/codicon.ttf");
}
.drag {
  width: calc(100% - 5em - 90px);
  height: 40px;
  z-index: -1;
  position: fixed;
  -webkit-app-region: drag;
  user-select: none;
  top: 0;
  left: 5em;
}
.icon-tool-bar {
  position: fixed;
  display: block;
  background-color: #42b983;
  box-shadow: 0 0 10px #888888;
  width: fit-content;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: 300;
}
.tool-icon {
  font-family: codicon;
  width:fit-content;
  font-size: 2em;
  padding: 0.5em 0.7em;
  user-select: none;
  background-color: #42b983;
  color: #fff;
  cursor: pointer;
  transition: 0.5s;
}
.tool-checked {
  background-color: #2ba26c;
  transition: 0.5s;
}
.tool-icon:hover{
  background-color: #54cc96;
  transition: 0.5s;
}
.btn-homepage::before {
  content: "\eb06"
}
.btn-competition::before {
  content: "\eac0"
}
.btn-edit::before {
  content: "\ea73";
}
.btn-database::before {
  content: "\eace";
}
.btn-settings::before {
  content: "\eb51";
}
.btn-about::before {
  content: "\ea74";
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
  color: #2c3e50;
}
.subpage {
  position: relative;
  width: calc(100% - 100px);
  left: 0px;
}
.resize {
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 10086;
  right: 0;
  top: 0;
  margin-top: 5px;
  margin-right: 5px;
  -webkit-app-region: nodrag;
}
.option-btn {
  font-family: codicon;
  color: white;
  font-size: 0em;
  fill-opacity: 0;
  width: 18px;
  height: 18px;
  margin: 5px;
  border-radius: 50%;
  text-align: center;
  line-height: 18px;
  box-shadow: 0 0 5px rgb(172, 172, 172);
  transition: 0.15s;
}
.option-btn:hover {
  cursor: pointer;
  font-size: 0.8em;
  transition: 0.15s;
  transform: rotate(180deg);
}
#minimize {
  background-color: #42b983;
}
#minimize::before {
  content: "\eaba"
}
#maximize {
  background-color: rgb(225, 201, 68);
}
#maximize::before {
  content: "\eab9"
}
#closebtn {
  background-color: rgb(228, 47, 83);
}
#closebtn::before {
  content: "\eab8"
}
/* 
markdown: \eb1d
ext: \eae6
 */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background: #eee
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background   : #ccc;
}
</style>
