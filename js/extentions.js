const inputRange = document.querySelector("#inputRange");
const unrepeated = document.querySelector("#unrepeated");
const remain = document.querySelector("#remain");
const OKBtn = document.querySelector("#OKBtn");
const numShow = document.querySelector("#numShow");

var rangeValue = 100;
var randIndex = 0;
var remainValue = 0;
var count = 0;
var arr = [];
var randomValue = 0;
var brr = [];
// 更新数据较小时的数组
function updateArray() {
  arr = [];
  for (count = 0; count < rangeValue; count++) {
    arr[count] = count + 1;
  }
}
window.onload = () => {
  //更新数组
  updateArray();
  inputRange.oninput = () => {
    rangeValue = inputRange.value;
    if (rangeValue < 10000) {
      updateArray();
    }
  };
  unrepeated.onclick = () => {
    if (unrepeated.checked == false) {
      remain.innerText = "剩余数量：∞";
    }
    if (rangeValue < 10000) {
      updateArray();
    }
  };
  //当数组比较小的时候,采用这种方法
  OKBtn.onclick = () => {
    count = 0;
    if (rangeValue < 10000) {
      count = arr.length;
      if (count > 0) {
        randIndex = Math.floor(Math.random() * count);
        randomValue = arr[randIndex];
        numShow.innerText = String(randomValue);
        if (unrepeated.checked == true) {
          arr.splice(randIndex, 1);
          remainValue = arr.length;
          remain.innerText = "剩余数量：" + remainValue;
        }
      } else {
        numShow.innerText = "End";
      }
    } else {
      largeRange();
    }
  };
};
function largeRange() {
  randomValue = Math.floor(Math.random() * rangeValue + 1);
  if (unrepeated.checked == true) {
    if (brr.length > rangeValue / 10 || brr.length > 1000) {
      numShow.innerText = "点的手酸吗";
      numShow.style.fontSize = "6vw";
      return;
    }
    while (brr.indexOf(randomValue) != -1) {
      randomValue = Math.floor(Math.random() * rangeValue + 1);
      console.log("re");
      // count++;
    }
    brr.push(randomValue);
    console.log(brr);
    remainValue = rangeValue - brr.length;
    remain.innerText = "剩余数量：" + remainValue;
    numShow.innerText = String(randomValue);
  } else {
    numShow.innerText = String(randomValue);
  }
}
