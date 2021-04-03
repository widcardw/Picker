const fs = require('fs');
const jQuery = require('jquery');
const { dialog } = require('electron').remote;

const lbox = document.querySelector("#lbox");
const rbox = document.querySelector("#rbox");
const rmbox = document.querySelector("#rmbox");
const rubox = document.querySelector("#rubox");
const rdbox = document.querySelector("#rdbox");
const text_content = document.querySelector("#content");
const answer = document.querySelector("#answer");
const title = document.querySelector('#current-base-introduction');
const font_large = document.querySelector('#font-size-large');
const font_small = document.querySelector('#font-size-small');

var jsonData;
var tobe_picked_arr;
var tobe_picked_path;

window.onload = function() {
  fs.readFile('./data/settings/current_base.json', function(err, dat) {
    if (err) {
      dialog.showMessageBox({
        title: "信息",
        message: "还没有选择题库呢"
      })
    }
    else {
      dat = dat.toString();
      title.innerHTML = "当前题库：" + dat.slice(dat.lastIndexOf('\\') + 1, dat.length);
      tobe_picked_path = dat.slice(0, dat.lastIndexOf('.')) +'_tobepicked.json';
      console.log(dat, tobe_picked_path);
      fs.readFile(dat, function(err, dat) {
        if (err) {
          throw err;
        }
        else {
          jsonData = JSON.parse(dat);
          // console.log(jsonData);
          console.log("题库加载完成")
        }
      })
      fs.readFile(tobe_picked_path, function(err, dat) {
        if (err) {
           throw err;
        }
        else {
          tobe_picked_arr = JSON.parse(dat);
          console.log("待选题目加载完成");
        }
      })
    }
  });
}

//抽取按钮响应
rubox.onclick = () => {
  // console.log("rubox click");
  if (tobe_picked_arr.length <= 0) {
    answer.innerHTML = '';
    text_content.innerHTML = "没题目了";
    return;
  }
  answer.style.display = "none";
  let index = Math.floor(Math.random() * tobe_picked_arr.length);
  let string_content = tobe_picked_arr[index] + "." + jsonData[tobe_picked_arr[index]]['content'] + '<br>';
  for (let key in jsonData[tobe_picked_arr[index]]) {
    if (key == 'content') { continue; }
    if (key == 'answer') {
      answer.innerHTML = jsonData[tobe_picked_arr[index]][key];
      continue;
    }
    string_content += key + '.' + jsonData[tobe_picked_arr[index]][key] + '<br>';
  }
  text_content.innerHTML = string_content;
  tobe_picked_arr.splice(index, 1);
  // console.log(tobe_picked_arr);
  rmbox.innerHTML = '剩余 ' + tobe_picked_arr.length;
  fs.writeFileSync(tobe_picked_path, JSON.stringify(tobe_picked_arr));
};
//答案按钮响应
rdbox.onclick = () => {
  // console.log("rdbox click");
  answer.style.display = 'block';
};

font_large.addEventListener('click', () => {
  // console.log("字体变大")
  let current_font_size = parseInt(text_content.style.fontSize);
  text_content.style.fontSize = (current_font_size + 2) + 'px';
})

font_small.addEventListener('click', () => {
  let current_font_size = parseInt(text_content.style.fontSize);
  if (current_font_size > 10)
    text_content.style.fontSize = (current_font_size - 2) + 'px';
})

const hide_or_show = document.querySelector('#hide')
hide_or_show.itemHide = false;

hide_or_show.addEventListener('click', () => {
  if (hide_or_show.itemHide === false) {
    hide_or_show.itemHide = true;
    text_content.style.display = 'none';
    hide_or_show.innerHTML = '⛔';
  }
  else {
    hide_or_show.itemHide = false;
    text_content.style.display = 'block';
    hide_or_show.innerHTML = '⭕';
  }
})