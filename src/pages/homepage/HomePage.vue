<template>
  <div id="home" class="subpage">
    <div class="homepage-text" v-html="main_text"
    :style="{ backgroundImage: this.img_path }"></div>
  </div>
</template>

<script>
const Store = require("electron-store");
const store = new Store();

export default {
  name: "Homepage",
  data: function () {
    return {
      main_text: "",
      img_path: "",
      img_dec: "",
    };
  },
  mounted: function () {
    this.main_text = store.get("homepage_text");
    this.img_path = store.get("img_path");
    this.img_dec = store.get("img_dec");
  },
};
</script>

<style scoped>
#home {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  /* font-size: 3em; */
}
/* .homepage-text {
  background-image: url("C:\\Users\\row31976300\\Pictures\\Saved Pictures\\mpv-shot0003.jpg");
  background-size: cover;
  background-repeat: no-repeat;
} */
</style>