<template>
  <div id="settings" class="subpage">
    <div class="float-wnd" id="float-wnd">保存成功</div>
    <h1>设置<span id="save-btn" @click="settingsOnSave"></span></h1>
    <!-- <div class="search-setting-div">
            <input type="text" id="search-for-settings" placeholder="输入关键字搜索">
        </div>
        <p></p> -->
    <div class="main-settings">
      <div class="input-setting-item" id="font-family">
        答题页面字体族<br />
        <input type="text" id="font-family-input" v-model="font_family" />
        <p></p>
        <div
          style="
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: 50% 50%;
          "
        >
          <div>字重</div>
          <div>字体大小 (px)</div>
          <div>
            <select v-model="font_weight">
              <option
                v-bind:key="weight"
                v-for="weight in candidate_weight"
                :value="weight"
              >
                {{ weight }}
              </option>
            </select>
          </div>
          <input type="text" v-model="font_size" />
        </div>
        <!-- 字重<br /> -->
      </div>
      <div class="input-setting-item">
        选择题库类型
        <div
          style="
            padding: 0.5em 1em;
            display: grid;
            grid-template-columns: 50% 50%;
          "
        >
          <label>
            <input
              type="radio"
              name="db-type"
              value="Mongodb"
              v-model="picked"
            />Mongodb
          </label>
          <label>
            <input
              type="radio"
              name="db-type"
              value="Json"
              v-model="picked"
            />Json
          </label>
        </div>
      </div>
      <div class="input-setting-item" id="choice-mongodb">
        数据库IP地址及端口号
        <br />
        <input
          type="text"
          id="db-ip-input"
          placeholder="mongodb://127.0.0.1:27017/"
          v-model="mongodb_url"
        />
        <p></p>
        数据库名称
        <span class="reset-candidates" @click="tryToConnectDataBase">
          尝试连接数据库
        </span>
        <br />
        <input
          type="text"
          id="db-name-input"
          placeholder="test"
          v-model="mongodb_name"
        />
      </div>
      <div class="input-setting-item" id="json-save-directory">
        Json文件类型题库存储路径
        <span
          class="browse-files"
          title="浏览文件"
          id="browse-json-btn"
          @click="browseJsonClicked"
        ></span>
        <span class="reset-candidates" @click="resetCandidatesClicked">
          重置待选题库
        </span>
        <br />
        <input
          type="text"
          id="save-directory-input"
          v-model="json_file_path"
          @dblclick="browseJsonClicked"
        />
      </div>
      <div class="input-setting-item" id="homepage-text">
        主页文字&nbsp;(html)<br />
        <textarea id="homepage-text-input" v-model="homepage_text"></textarea>
      </div>
      <div class="input-setting-item" id="background-img-path">
        主页背景图片
        <span
          class="browse-files"
          title="浏览文件"
          id="browse-img-btn"
          @click="browseImgClicked"
        ></span> （功能尚未实现）
        <br />
        <input
          type="text"
          id="bg-img-path-input"
          v-model="img_path"
          @dblclick="browseImgClicked"
        />
        <p></p>
        图片分布格式<br />
        <select v-model="img_dec">
          <option
            v-bind:key="(discription, opt)"
            v-for="(discription, opt) in img_decoration"
            :value="opt"
          >
            {{ discription }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
const { app, dialog } = require("electron").remote;
const Store = require("electron-store");
const store = new Store();
const fs = require("fs");
const mongoose = require('mongoose');
// const menu = new Menu();
// menu.append(new MenuItem({
//   label: "Save",
//   accelerator: "CmdOrCtrl+S",
//   click: () => {
//     this.settingsOnSave();
//     console.log("save");
//   }
// }))

export default {
  name: "Settings",
  data: function () {
    return {
      font_family: "",
      font_weight: 400,
      font_size: 50,
      picked: "",
      mongodb_url: "mongodb://127.0.0.1:27017/",
      mongodb_name: "",
      json_file_path: "",
      homepage_text: `<div style="font-size: 10vw; text-align: center; font-family: '华文行楷'">百科知识大赛</div>`,
      img_path: "",
      candidate_weight: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      img_decoration: {
        copyToFill: "按原图大小复制密铺",
        stretchToFill: "拉伸以填充全屏",
      },
      img_dec: "",
    };
  },
  // 加载用户数据
  mounted: function () {
    if (store.get("candidate_weight") === undefined) {
      for (let key in this.$data) {
        store.set(key, this.$data[key]);
      }
    }
    // console.log(store.get("candidate_weight"))
    for (let key in this.$data) {
      this.$data[key] = store.get(key);
    }
  },
  methods: {
    // 保存设置，目前得手动保存
    // 未来会添加自动保存功能
    settingsOnSave: function () {
      if (this.mongodb_url.substring(this.mongodb_url.length - 1) !== "/") {
        this.mongodb_url = this.mongodb_url + "/";
      }
      for (let key in this.$data) {
        store.set(key, this.$data[key]);
        // console.log(key, this.$data[key]);
      }
      console.log(app.getPath("userData"));
      let wnd = document.querySelector("#float-wnd");
      wnd.className = "float-wnd-shown";
      setInterval(() => {
        wnd.className = "float-wnd";
      }, 4000);
      // store.set("font_family", this.font_family);
    },
    browseJsonClicked: function () {
      dialog
        .showOpenDialog({
          properties: ["openFile"],
          filters: [{ name: "json", extensions: ["json"] }],
        })
        .then((result) => {
          if (result.canceled) {
            return;
          }
          this.json_file_path = result.filePaths[0];
        });
    },
    browseImgClicked: function () {
      dialog
        .showOpenDialog({
          properties: ["openFile"],
          filters: [{ name: "picture", extensions: ["jpg", "jpeg", "png"] }],
        })
        .then((result) => {
          if (result.canceled) {
            return;
          }
          this.img_path = result.filePaths[0];
        });
    },
    resetCandidatesClicked: function () {
      if (this.json_file_path === "") {
        return;
      }
      let candidate_file_path =
        this.json_file_path.slice(0, this.json_file_path.lastIndexOf(".")) +
        "_candidate.json";
      let result = fs.readFileSync(this.json_file_path, { encoding: "utf-8" });
      result = JSON.parse(result);
      fs.writeFileSync(
        candidate_file_path,
        JSON.stringify(new Array(result.length).fill().map((e, i) => i))
      );
      dialog.showMessageBox({
        title: "提示",
        message: "待选题库已重置",
      });
    },
    tryToConnectDataBase: function () {
      mongoose.connect(this.mongodb_url + this.mongodb_name, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
      // const Schema = mongoose.Schema;
      // const a = new Schema({
      //   ex_content: String,
      //   ex_choices: Object,
      //   ex_answer: String,
      // });
      // console.log(a)
    },
  },
  watch: {
    picked: function () {
      // console.log(this.picked);
      if (this.picked === "Mongodb") {
        document.querySelector("#choice-mongodb").className =
          "input-setting-item";
        document.querySelector("#json-save-directory").className =
          "input-setting-item disabled";
      } else {
        document.querySelector("#choice-mongodb").className =
          "input-setting-item disabled";
        document.querySelector("#json-save-directory").className =
          "input-setting-item";
      }
    },
  },
};
</script>

<style scoped>
p {
  font-size: 1.2em;
  color: #42b983;
}
.subpage {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  position: relative;
  left: 45px;
  /* right: 65px; */
  margin: auto;
  max-width: 900px;
}
.reset-candidates {
  background: #94d4b8;
  border-radius: 5px;
  margin-left: 20px;
  padding: 0px 5px;
  font-size: 0.9em;
  cursor: pointer;
}
@font-face {
  font-family: "codicon";
  src: url("../../assets/codicon.ttf");
}
input[type="text"],
select {
  background: #f1fdf8;
  border: 1px solid #2c3e50;
  font-size: 1em;
  width: 90%;
  outline-style: none;
}
input[type="text"]:focus,
select {
  background: #fff;
}
.search-setting-div {
  padding: 1em;
  width: 90%;
  background: #e0f5ec;
}
.input-setting-item {
  padding: 1em;
  width: 90%;
  background: #e0f5ec;
  margin-bottom: 1em;
}
.disabled {
  pointer-events: none;
  user-select: none;
  opacity: 0.3;
}
#background-img-path {
  opacity: 0.3;
  user-select: none;
  pointer-events: none;
}
textarea {
  width: 95%;
  min-height: 3em;
  max-height: 20em;
  resize: vertical;
  font-family: Consolas, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  outline-style: none;
  background-color: #f1fdf8;
}
textarea:focus {
  background: #fff;
}
.browse-files::before {
  content: "\eaf7";
  font-family: codicon;
  font-size: 1.2em;
  position: relative;
  top: 0.2em;
  padding: 0 0.1em;
  cursor: pointer;
}
.browse-files:hover {
  color: #42b983;
}
#save-btn::before {
  font-family: codicon;
  position: relative;
  /* top: 5px; */
  margin-left: 0.3em;
  font-size: 0.7em;
  content: "\eb4b";
  cursor: pointer;
}
#save-btn:hover {
  color: #42b983;
}
.float-wnd {
  position: fixed;
  left: calc(50% - 2em);
  background: #fff;
  top: -20px;
  opacity: 0;
  transition: 0.5s;
}
.float-wnd-shown {
  position: fixed;
  background: #fff;
  left: calc(50% - 2em);
  top: 80px;
  transition: 0.5s;
  padding: 0.5em 1em;
  border-radius: 5px;
  box-shadow: 0 0 5px #2c3e50;
}
</style>