<template>
  <div id="about" class="subpage">
    <div class="main-pg log-hidden-pg">
      <div>
        <div class="markdown-body" v-html="this.about_content"></div>
        <p>
          <a
            href="https://github.com/widcardw/Picker.git"
            target="_blank"
            @click="linkClicked"
            >https://github.com/widcardw/Picker.git</a
          >
        </p>
      </div>
      <div id="logblock">
        <div id="log-btn" @click="logBtnClicked"></div>
        <div class="iframe-hidden">
          <div
            class="markdown-body"
            id="iframe-log-block"
            v-html="this.log_file"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "github-markdown-css/github-markdown.css";
const { shell } = require("electron").remote;
const fs = require("fs");
// const markdown = require("markdown").markdown;
const markdowner = require("markdown-it");
var md = new markdowner({ html: true, prefix: 'code-'});

export default {
  name: "About",
  data: function () {
    return {
      about_content: "",
      log_file: "",
      log_shown: false,
    };
  },
  methods: {
    linkClicked: function (event) {
      let lnk = event.srcElement.href;
      event.preventDefault();
      shell.openExternal(lnk);
    },
    logBtnClicked: function () {
      if (this.log_shown === false) {
        document.querySelector(".main-pg").className = "main-pg log-shown-pg";
        document.querySelector(".iframe-hidden").className = "iframe-shown";
        this.log_shown = true;
      } else {
        document.querySelector(".main-pg").className = "main-pg log-hidden-pg";
        this.log_shown = false;
        document.querySelector(".iframe-shown").className = "iframe-hidden";
      }
    },
  },
  mounted: function () {
    fs.readFile("./src/pages/about/AboutPage.md", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        this.about_content = md.render(data.toString()); // markdown.toHTML(data.toString());
        // console.log(this.about_content)
      }
    });
    fs.readFile("./src/pages/about/log.md", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        this.log_file = md.render(data.toString());// markdown.toHTML(data.toString());
      }
    });
  },
};
</script>

<style scoped>
@font-face {
  font-family: "codicon";
  src: url("../../assets/codicon.ttf");
}
#about {
  font-family: codicon, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 1em;
  color: #2c3e50;
}
#log-btn::before {
  content: "\ea82";
  cursor: pointer;
}
a {
  color: #42b983;
  text-decoration: underline;
}
a::after {
  content: "\eb14";
  padding-left: 0.2em;
  font-size: 0.8em;
  text-decoration: none;
}
.main-pg {
  max-width: 900px;
  margin: auto;
  position: relative;
  left: 85px;
}
.log-hidden-pg {
  display: grid;
  grid-template-columns: 98% 2%;
}
.log-shown-pg {
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 20px;
  max-width: 98%;
}
.markdown-body {
  font-size: 1em;
}
.iframe-hidden {
  display: none;
}
.iframe-shown {
  width: 100%;
}
</style>