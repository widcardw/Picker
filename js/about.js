const { net, shell } = require("electron").remote;

const lnk = document.querySelector("#gitLink");
lnk.onclick = (e) => {
  e.preventDefault();
  shell.openExternal(lnk.href);
};


const lnk2 = document.querySelector("#gitLink2");
lnk2.onclick = (e) => {
  e.preventDefault();
  shell.openExternal(lnk2.href);
};
