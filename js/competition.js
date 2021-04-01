const fs = require('fs');
const jQuery = require('jquery');

const lbox = document.querySelector("#lbox");
const rbox = document.querySelector("#rbox");
const rubox = document.querySelector("#rubox");
const rdbox = document.querySelector("#rdbox");

//抽取按钮响应
rubox.onclick = () => {
  console.log("rubox click");
};
//答案按钮响应
rdbox.onclick = () => {
  console.log("rdbox click");
};
