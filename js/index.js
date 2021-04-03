const path = require("path");
const fs = require("fs");
const { ipcRenderer } = require("electron");
const { ipcRenderer: ipc } = require("electron");
const { setTimeout } = require("timers");
const { globalShortcut } = require('electron').remote;
// 下面的东西这里有没有无所谓,因为不涉及到ipcRender发送消息
// const { electron, remote, webview } = require("electron");

//判断是否存在"data"文件夹,不存在则创建一个
fs.open("./data/", (err, fd) => {
  //console.log(err.code);
  if (err && err.code == "ENOENT")
    fs.mkdir("data", (err2) => {
      if (err2) throw err2;
    });
  // 创建处理好的数据文件夹
  fs.open("./data/processed", (err2, fd2) => {
    if (err2 && err2.code == 'ENOENT')
      fs.mkdir("data/processed", (err3) => {
        if (err3) throw err3;
      })
    fs.close(fd2, err4 => {
      throw err4;
    })
  })
  // 创建设置文件夹
  fs.open('./data/settings', (err5, fd3) => {
    if (err5 && err5.code == 'ENOENT') {
      fs.mkdir('data/settings', (err6) => {
        if (err6) throw err6;
      })
    }
    fs.close(fd3, err7 => {
      throw err7;
    })
  })
  fs.open('./data/css', (err5, fd3) => {
    if (err5 && err5.code == 'ENOENT') {
      fs.mkdir('data/css', (err6) => {
        if (err6) throw err6;
      })
    }
    fs.close(fd3, err7 => {
      throw err7;
    })
  })
  fs.close(fd, (err1) => {
    throw err1;
  });
});

// 获取doc上的控件
const wb = document.querySelector("#wb");
const btnHome = document.querySelector("#home");
const btnComp = document.querySelector("#competition");
const btnEdit = document.querySelector("#browseAndEdit");
const btnSett = document.querySelector("#settings");
const btnexte = document.querySelector("#extentions");
const btnAbout = document.querySelector("#about");
const btnMini = document.querySelector("#mini");
const btnZoom = document.querySelector("#zoom");
const btnClose = document.querySelector("#close");

// 类似于空出0.1s+的加载时间
wb.addEventListener("did-start-loading", () => {
  wb.style.opacity = 0;
});
wb.addEventListener("dom-ready", () => {
  // wb.openDevTools();
  console.log("dom-ready");
  setTimeout(() => {
    wb.style.opacity = 1;
  }, 50);
});
// 点击按钮,更改webview网页内容,达到切换窗口的效果
btnHome.onclick = () => {
  wb.src = "./htm/homepage.html";
};
btnComp.onclick = () => {
  wb.src = "./htm/competition.html";
};
btnEdit.onclick = () => {
  wb.src = "./htm/browseAndEdit.html";
};
btnSett.onclick = () => {
  wb.src = "./htm/settingsPage.html";
};
btnexte.onclick = () => {
  wb.src = "./htm/extentionsPage.html";
};
btnAbout.onclick = () => {
  wb.src = "./htm/aboutPage.html";
};

//最小化,最大化,关闭按钮
btnMini.onclick = () => {
  // console.log("minimize");
  ipc.send("mini");
};
btnZoom.onclick = () => {
  ipc.send("zoom");
};
btnClose.onclick = () => {
  ipc.send("close");
};

globalShortcut.register('CommandOrControl+L', () => {
  wb.openDevTools();
})