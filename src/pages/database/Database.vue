<template>
  <div id="database" class="subpage">
    <p>This is the page for database</p>
    <div id="xterm"></div>
  </div>
</template>

<script>
// import { Terminal } from "xterm";
// import { AttachAddon, FitAddon } from "xterm-addon-web-links";
// import "xterm/css/xterm.css";

export default {
  name: "Database",
  // props: {
  //   socketURI: {
  //     type: String,
  //     default: "ws://172.25.111.124:8080/",
  //   },
  // },
  // mounted() {
  //   this.initSocket();
  // },
  // beforeDestroy() {
  //   this.socket.close();
  //   this.term.dispose();
  // },
  // methods: {
  //   initTerm() {
  //     const term = new Terminal({
  //       fontSize: 14,
  //       cursorBlink: true
  //     });
  //     const attachAddon = new AttachAddon(this.socket);
  //     const fitAddon = new FitAddon();
  //     term.loadAddon(attachAddon);
  //     term.loadAddon(fitAddon);
  //     term.open(document.getElementById('xterm'));
  //     fitAddon.fit();
  //     term.focus();
  //     this.term = term
  //   },
  //   initSocket() {
  //     this.socket = new WebSocket(this.socketURI);
  //     this.socketOnClose();
  //     this.socketOnOpen();
  //     this.socketOnError();
  //   },
  //   socketOnOpen() {
  //     this.socket.onopen = () => {
  //       // 链接成功后
  //       this.initTerm()
  //     }
  //   },
  //   socketOnClose() {
  //     this.socket.onclose = () => {
  //       console.log('close socket')
  //     }
  //   },
  //   socketOnError() {
  //     this.socket.onerror = () => {
  //       console.log('socket 链接失败')
  //     }
  //   }
  // }
  // mounted() {
  //   const terminal = new Terminal({
  //     cursorBlink: true,
  //   });
  //   // terminal.loadAddon(new WebLinksAddon());
  //   terminal.open(document.querySelector("#terminal"), true);
  //   terminal.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $");
  // },
};
</script>

<style scoped>
p {
  font-size: 1.2em;
  color: #42b983;
}
</style>