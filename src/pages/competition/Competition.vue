<template>
  <div id="competition" class="subpage">
    <!-- <p>This is the page for competition</p> -->
    <div class="top-db">
      <div id="db-name">{{ this.db_name + " " + this.candidates.length + " remain" }}</div>
    </div>
    <div
      id="content"
      class="content"
      :style="{
        fontSize: this.fts + 'px',
        fontFamily: this.font_family,
        fontWeight: this.font_weight,
      }"
      v-show="this.isContentShown"
    >
      <table>
        <thead>
          <tr>
            <th>{{ this.ex_number }}</th>
            <th>{{ this.ex_content }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(choice, index) in this.ex_choices"
            v-bind:key="(choice, index)"
          >
            <td>{{ index }}</td>
            <td>{{ choice }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      id="answer"
      v-show="this.isAnswerShown"
      :style="{
        fontSize: this.fts + 'px',
        fontFamily: this.font_family,
        fontWeight: this.font_weight,
      }"
    >
      {{ this.ex_answer }}
    </div>
    <div class="operation">
      <div
        class="codicon"
        id="selectNew"
        @click="selectNewExercise"
        title="抽取题目"
      ></div>

      <div
        class="codicon"
        id="showAnswer"
        @click="showAnswer"
        title="显示答案"
      ></div>

      <div
        class="codicon"
        v-bind:id="[this.isContentShown ? 'show' : 'hide']"
        @click="toggleVisibility"
        title="切换可见性"
      ></div>

      <div
        class="codicon"
        id="reset-font"
        @click="resetFontSize"
        title="还原字体大小"
      ></div>

      <div
        class="codicon"
        id="enlarge"
        @click="textEnlarge"
        title="放大字体"
      ></div>

      <div
        class="codicon"
        id="smallen"
        @click="textSmallen"
        title="缩小字体"
      ></div>
    </div>
  </div>
</template>

<script>
const Store = require("electron-store");
const store = new Store();
const fs = require("fs");
const { dialog } = require("electron").remote;

export default {
  name: "Competition",
  data: function () {
    return {
      fts: 2,
      isAnswerShown: false,
      isContentShown: true,
      ex_content: "准备答题",
      ex_choices: {  },
      ex_answer: "",
      ex_number: 0,
      font_family: "",
      font_weight: 0,
      all_exs: 0,
      db_name: "",
      candidates: [],
      candidate_file_path: "",
    };
  },
  mounted: function () {
    // 字体, 字重
    this.font_family = store.get("font_family");
    this.font_weight = store.get("font_weight");
    this.fts = parseInt(store.get("font_size"));

    // 判断选项是 Mongodb 还是 Json
    let picked = store.get("picked");
    if (picked === "Mongodb") {
      // TODO
      console.log("mongodb");
    } else if (picked === "Json") {
      let json_file_path = store.get("json_file_path");
      this.db_name = json_file_path.substring(json_file_path.lastIndexOf("\\") + 1)
      fs.readFile(json_file_path, (err, dat) => {
        if (err) {
          dialog.showMessageBox({
            title: "错误",
            message: "未能打开 Json 题库文件",
          });
        } else {
          // 将读取的 Json 文件放到成员变量
          dat = dat.toString();
          this.all_exs = JSON.parse(dat);

          // 读取 candidates, 即候选题目数组
          this.candidate_file_path =
            json_file_path.slice(0, json_file_path.lastIndexOf(".")) +
            "_candidate.json";
          fs.readFile(this.candidate_file_path, (err, dat) => {
            if (err) {
              // 如果没有这个文件, 则创建, 本质是 0~n-1 的数组
              this.candidates = new Array(this.all_exs.length)
                .fill()
                .map((e, i) => i);
              fs.writeFileSync(
                this.candidate_file_path,
                JSON.stringify(this.candidates)
              );
            } else {
              // 否则读取, 赋值给成员
              this.candidates = JSON.parse(dat.toString());
              console.log(this.candidates.length);
            }
          });
        }
      });
    }
  },
  methods: {
    toggleVisibility: function () {
      this.isContentShown = !this.isContentShown;
      if (this.isContentShown === false) {
        this.isAnswerShown = false;
      }
    },
    textSmallen: function () {
      if (this.fts >= 20) {
        this.fts -= 5;
      }
      // console.log("smallen", this.fts)
    },
    textEnlarge: function () {
      this.fts += 5;
      // console.log("enlarge", this.fts)
    },
    resetFontSize: function () {
      this.fts = parseInt(store.get("font_size"));
    },
    selectNewExercise: function () {
      this.isAnswerShown = false;
      if (this.candidates.length === 0) {
        this.ex_number = "";
        this.ex_content = "答题结束";
        this.ex_choices = {};
        this.ex_answer = "";
        return;
      }
      // 产生随机数
      let rand_candi_index = Math.floor(this.candidates.length * Math.random());
      // console.log(rand_candi_index);
      // 随机题目的编号
      let rand_ex_index = this.candidates[rand_candi_index];
      // 将这个题目的编号从数组中删除
      this.candidates.splice(rand_candi_index, 1);
      // 提取这个题目
      this.ex_number = rand_ex_index;
      this.ex_content = this.all_exs[rand_ex_index]["ex_content"];
      this.ex_choices = this.all_exs[rand_ex_index]["ex_choices"];
      this.ex_answer = this.all_exs[rand_ex_index]["ex_answer"];
      // console.log(this.candidates);
      // 将已选的从文件中删除
      fs.writeFileSync(
        this.candidate_file_path,
        JSON.stringify(this.candidates)
      );
    },
    showAnswer: function () {
      if (this.isContentShown === true) {
        this.isAnswerShown = !this.isAnswerShown;
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
/* .content {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
} */
.top-db {
  /* height: 50px; */
  position: fixed;
  padding-bottom: 5px;
  padding-left: 80px;
  background-color: #d0eee1;
  box-shadow: 0 0 10px #a7a7a7;
  color: #42b983;
  top: 0;
  z-index: 299;
}
@font-face {
  font-family: "codicon";
  src: url("../../assets/codicon.ttf");
}
.codicon {
  color: #2c3e50;
  font-family: codicon;
  font-size: 1.5em;
  padding: 0.3em;
  height: fit-content;
  /* margin: 0.3em; */
  cursor: pointer;
  /* float: right; */
  transition: 0.3s;
}
.codicon:hover {
  color: #42b983;
  transition: 0.3s;
}
#show::before {
  content: "\ea70";
}
#hide::before {
  content: "\eae7";
}
#enlarge::before {
  content: "\eb81";
}
#smallen::before {
  content: "\eb82";
}
#reset-font::before {
  content: "\eb69";
}
#selectNew::before {
  content: "\eb40";
}
#showAnswer::before {
  content: "\eab2";
}
#db-name {
  /* float: left;  */
  color: #2c3e50;
  font-size: 1.5em;
  padding-right: 0.3em;
  padding-top: 0.3em;
}
#answer {
  position: relative;
  left: 160px;
  font-size: 2em;
  width: fit-content;
}
.content {
  display: block;
  position: relative;
  left: 160px;
  width: calc(100% - 160px);
  top: 0%;
}
.operation {
  font-size: 2em;
  position: fixed;
  right: 0px;
  top: 80px;
}
.hidden {
  display: none;
}
.operation > .codicon {
  font-size: 1.2em;
  background-color: #d0eee1;
  box-shadow: 0 0 4px #42b983;
}
li {
  list-style: none;
}
table {
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid #ddd;
}

thead {
  background: #f0f3f6;
}

th,
td {
  padding: 0.3em;
}
</style>