const join = require('path').join;
const fs = require('fs');
// const mammoth = require('mammoth');
const { dialog } = require('electron').remote;
const jQuery = require('jquery')
const admZip = require('adm-zip');

filepath = './data/processed/';

function findSync(startPath) {
    let result = [];
    function finder(path) {
        let files = fs.readdirSync(path);
        files.forEach((val, index) => {
            let fPath = join(path, val);
            let stats = fs.statSync(fPath);
            // if(stats.isDirectory()) finder(fPath);
            if (stats.isFile()) result.push(fPath);
        });
    }
    finder(startPath);
    return result;
}

var jsonData = [];

var content = document.querySelector("#content");
var menu = document.querySelector("#context-menu");

// let filenames = findSync(filepath);

// console.log(filenames);

// getJsonData(filenames, refreshHtmlElement);

function getJsonData(filenames, callback) {
    for (let i = 0; i < filenames.length; i++) {
        // jsonfile.readFileSync(filenames[i], (err, dat) => {
        //     if (err) {
        //         throw err;
        //     }
        //     console.log(dat);
        //     jsonData = [...jsonData, ...dat];
        // })
        fs.readFile(filenames[i], 'utf-8', function (err, dat) {
            if (err) {
                console.log(err);
            }
            else {
                jsonData = [...jsonData, ...JSON.parse(dat)];
                // console.log(jsonData);
            }
            callback(jsonData);
        });
    }
}

function refreshHtmlElement(jsonData) {
    while (content.hasChildNodes()) {
        content.removeChild(content.firstChild);
    }
    // console.log(jsonData);
    // let allPages = parseInt(jsonData.length / 20);
    // console.log(jsonData)
    for (let i = 0; i < jsonData.length; i++) {
        var obj = document.createElement('div');
        obj.id = 'sub-content';
        obj.className = 'one-obj';
        obj.innerHTML = i + '. ';
        for (var j in jsonData[i]) {
            obj.innerHTML += j + ". " + jsonData[i][j] + '<br>';
        }
        obj.addEventListener('contextmenu', showMenu(i))
        content.appendChild(obj);
    }
}

var editmenu = document.querySelector("#menu-edit")
var deletemenu = document.querySelector("#menu-delete")

// editmenu.addEventListener('click', () => {
//     console.log('edit')
// })

function showMenu(index) {
    function show() {
        let evt = window.event || arguments[0];
        // console.log(document.body.scrollTop);
        let sl = document.body.scrollLeft || document.documentElement.scrollLeft;
        let st = document.body.scrollTop || document.documentElement.scrollTop;
        /*获取当前鼠标右键按下后的位置，据此定义菜单显示的位置*/
        let rightedge = document.body.clientHeight - evt.clientX;
        let bottomedge = document.body.clientHeight - evt.clientY;
        /*如果从鼠标位置到容器右边的空间小于菜单的宽度，就定位菜单的左坐标（Left）为当前鼠标位置向左一个菜单宽度*/
        if (rightedge < menu.offsetWidth)
            menu.style.left = sl + evt.clientX - menu.offsetWidth + "px";
        else
            /*否则，就定位菜单的左坐标为当前鼠标位置*/
            menu.style.left = sl + evt.clientX + "px";

        /*如果从鼠标位置到容器下边的空间小于菜单的高度，就定位菜单的上坐标（Top）为当前鼠标位置向上一个菜单高度*/
        if (bottomedge < menu.offsetHeight)
            menu.style.top = st + evt.clientY - menu.offsetHeight + "px";
        else
            /*否则，就定位菜单的上坐标为当前鼠标位置*/
            menu.style.top = st + evt.clientY + "px";

        menu.style.visibility = "visible";
        menu.addEventListener('contextmenu', () => {
            menu.style.visibility = "hidden";
        })
        deletemenu.onclick = () => {
            jsonData.splice(index, 1);
            refreshHtmlElement(jsonData);
        }
        editmenu.onclick = () => {
            let temp = jsonData[index];
            btnInsert.click();
            for (j in temp) {
                blockInsert.value += temp[j] + '\n';
            }
            jsonData.splice(index, 1);
        }
    }
    return show;
}

document.addEventListener('click', () => {
    menu.style.visibility = "hidden";
})

var btnWord = document.querySelector('#importFromWordBtn')
var btnPptx = document.querySelector('#importFromPptxBtn')
var btnJson = document.querySelector('#importBtn')
var btnInsert = document.querySelector('#insertBtn')
var btnmulsel = document.querySelector('#multiselect')
var btnSave = document.querySelector('#saveBtn')
var blockInsert = document.querySelector("#insert-block")
var btnInsertOK = document.querySelector("#insert-ok")
var btnLoadOK = document.querySelector("#load-ok")
btnInsert.isOpen = false;
btnWord.isOpen = false;
var btnRefresh = document.querySelector("#refreshBtn");

btnJson.addEventListener('click', () => {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'Json File', extensions: ['json'] }
        ]
    }).then(result => {
        // console.log(result.filePaths)
        getJsonData(result.filePaths, refreshHtmlElement);
    })
});

btnSave.addEventListener('click', () => {
    dialog.showSaveDialog({
        filters: [{ name: 'my-text', extensions: 'json' }],
        defaultPath: './data/processed/my-text.json'
    }).then(result => {
        // console.log(result.filePath);
        fs.writeFileSync(result.filePath, JSON.stringify(jsonData));
    })
});

btnInsert.addEventListener('click', () => {
    if (btnWord.isOpen === true) {
        btnWord.click();
    }
    if (btnInsert.isOpen === false) {
        window.scrollTo(0, 0);
        blockInsert.value = "";
        blockInsert.placeholder = "";
        btnInsert.isOpen = true;
        blockInsert.style.display = "block";
        btnInsertOK.style.display = 'block';
    }
    else {
        btnInsert.isOpen = false;
        blockInsert.style.display = "none";
        btnInsertOK.style.display = 'none';
        blockInsert.innerHTML = "";
    }
})

btnInsertOK.addEventListener('click', () => {
    let brr = jQuery(blockInsert).val().split('\n')
    jQuery.each(brr, (index, item) => {
        if (item == '') {
            brr.splice(index, 1);
        }
    })
    if (brr.length > 1) {
        let obj = { 'content': brr[0] };
        for (let i = 1; i < brr.length - 1; i++) {
            obj[String.fromCharCode(64 + i)] = brr[i];
        }
        obj['answer'] = brr[brr.length - 1];
        jsonData.push(obj);
        refreshHtmlElement(jsonData);
    }
    btnInsert.isOpen = false;
    blockInsert.style.display = "none";
    btnInsertOK.style.display = 'none';
});

btnPptx.addEventListener('click', () => {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'pptx', extensions: ['pptx'] }
        ]
    }).then(result => {
        if (result.canceled) {
            return;
        }
        const pth = result.filePaths[0];
        const zip = new admZip(pth);
        zip.extractAllTo(pth.slice(0, pth.length - 5));
        let xmls = findSync(pth.slice(0, pth.length - 5) + '/ppt/slides');
        // console.log(xmls);
        readFromPPTXmls(xmls);
        // console.log(jsonData);
        // for (let i = 0; i < xmls.length; i++) {
        //     fs.readFile(xmls[i], (err, dat) => {
        //         if (err) {
        //             throw err;
        //         }
        //         else {
        //             dat = dat.toString();
        //             let matchWT = dat.match(/(<a:t>.*?<\/a:t>)|(<a:t\s.[^>]*?>.*?<\/a:t>)/g);
        //             matchWT = filter(matchWT);  // 一张ppt的文本内容, 即一道题目
        //             let obj = createOneExercise(matchWT);
        //             jsonData.push(obj);
        //             // console.log(jsonData)
        //         }
        //     })
        // }
        // TODO 这里是异步的, 会在读取之前进行操作
        // console.log(jsonData);
        // refreshHtmlElement(jsonData);
    })
})

function readFromPPTXmls(xmls) {
    let count = 0;
    for (let i = 0; i < xmls.length; i++) {
        fs.readFile(xmls[i], (err, dat) => {
            if (err) {
                throw err;
            }
            else {
                dat = dat.toString();
                let matchWT = dat.match(/(<a:t>.*?<\/a:t>)|(<a:t\s.[^>]*?>.*?<\/a:t>)/g);
                matchWT = filter(matchWT);  // 一张ppt的文本内容, 即一道题目
                let obj = createOneExercise(matchWT);
                jsonData.push(obj);
                count++;
                // console.log(jsonData)
                if (count === xmls.length) {
                    refreshHtmlElement(jsonData)
                }
            }
        })
    }
}

function createOneExercise(arr) {
    let obj = { 'content': arr[0] };
    let i;
    for (i = 1; i < arr.length - 1; i++) {
        obj[String.fromCharCode(64 + i)] = arr[i];
    }
    obj['answer'] = arr[i];
    return obj;
}

function filter(matchWT) {
    let res = [];

    matchWT.forEach(function (wtItem) {
        // console.log(jQuery(wtItem).text())
        //如果不是<w:t xml:space="preserve">格式
        // wtItem = wtItem.split('>');
        // wtItem = wtItem[1].split('<');
        wtItem = jQuery.trim(jQuery(wtItem).text());
        if (wtItem !== "")
            res.push(wtItem);
    });
    return res;
}

// btnWord.addEventListener('click', () => {
//     dialog.showOpenDialog('mainWindow', {
//         properties: ['openFile', 'openDirectory'],
//         filters: [
//             { name: 'Documents', extensions: ['doc', 'docx'] }
//         ]
//     }).then(result => {
//         if (result.canceled) {
//             return;
//         }
//         mammoth.extractRawText({ path: result.filePaths[0]})
//             .then(function(res) {
//                 var text = res.value;
//                 console.log(text);
//             })
//             .done()
//     })
// })
btnWord.addEventListener('click', () => {
    if (btnInsert.isOpen === true) {
        btnInsert.click();
    }
    if (btnWord.isOpen === false) {
        window.scrollTo(0, 0);
        blockInsert.style.height = '120px';
        blockInsert.placeholder = '题干\n选项\n选项\n选项\n答案\n\n题干\n……'
        blockInsert.value = "";
        btnWord.isOpen = true;
        blockInsert.style.display = "block";
        btnLoadOK.style.display = 'block';
    }
    else {
        btnWord.isOpen = false;
        blockInsert.style.display = "none";
        btnLoadOK.style.display = 'none';
    }
})

var numHaveProcessed = document.querySelector('#have-processed');

btnLoadOK.addEventListener('click', () => {
    let result = blockInsert.value;
    if (result.length < 3) {
        btnWord.click();
        return;
    }
    let exercises = result.split('\n\n'); // 题目数组
    jQuery.each(exercises, (index, item) => {
        if (item == '' || item == '\n') {
            exercises.splice(index, 1);
        }
    })
    // console.log(exercises);
    for (let i = 0; i < exercises.length; i++) {
        let one = exercises[i].split('\n');
        jQuery.each(one, (index, item) => {
            if (item == '') {
                one.splice(index, 1);
            }
        })
        // console.log(one)
        let obj = { 'content': one[0] };
        for (let j = 1; j < one.length - 1; j++) {
            obj[String.fromCharCode(64 + j)] = one[j];
        }
        obj['answer'] = one[one.length - 1];
        jsonData.push(obj);
        numHaveProcessed.innerHTML = ` (已处理${i + 1}题)`;
    }
    // console.log(jsonData)
    refreshHtmlElement(jsonData);
    setTimeout(() => {
        btnWord.isOpen = false;
        blockInsert.style.display = "none";
        btnLoadOK.style.display = 'none';
    }, 3000);
})

btnRefresh.addEventListener('click', () => {
    refreshHtmlElement(jsonData);
})