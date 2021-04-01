const { net, shell } = require("electron").remote;

const lnk = document.querySelector("#gitLink");
lnk.onclick = (e) => {
  e.preventDefault();
  shell.openExternal(lnk.href);
};
