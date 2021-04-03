# Picker
用 `electron` 写的抽题器，如果需要针对该仓库进行开发，请先安装 `Node.js`，并熟悉一些 `Javascript` 的基本操作。

使用方法

```shell
git clone https://github.com/widcardw/Picker.git
cd Picker
npm install --save_dev
npm run start
```

2021/4/3 初步完工

暂未用到数据库，导致题库的题量也就最多只能有上千那样，再多的话估计就得崩了。之后可能会考虑采用 `Mongodb` 数据库来进行优化。

**警告！有相当多的 BUG ！使用时请谨慎！**

**PPTX 导入的功能做的还不是很完善！请尽量采用文本导入或 `json` 导入！**

**以及在`浏览与编辑`中编辑好题目之后一定要记得保存！不保存切换到其他页面就直接没了！**

注：在打包之后，要将 `competition.html` 头部的两个样式更改一下
```html
<link rel="stylesheet" href='../../../../data/css/mainfont.css'>
<link rel="stylesheet" href='../../../../data/css/fontweight.css'>
```