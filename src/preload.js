window.remote = require('electron').remote;

const remote = window.remote;

const { ipcRenderer } = require("electron");
window.ipcRenderer = ipcRenderer;

global.electron = require('electron');