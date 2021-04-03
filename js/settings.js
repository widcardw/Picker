const fs = require('fs');
const path = require('path');
const jQuery = require('jquery');
const { dialog } = require('electron').remote;

var base_path = document.querySelector('#base-path');
var browse_base_btn = document.querySelector('#browse-base');
var hasnt_been_picked_path = document.querySelector("#hasnt-been-picked-path");
var clear_hasnt_been_picked_btn = document.querySelector("#clear-hasnt-been-picked-btn");

var global_base_path;

browse_base_btn.addEventListener('click', () => {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'Json File', extensions: ['json'] }
        ]
    }).then((result) => {
        if (result.canceled) {
            return;
        }
        base_path.value = result.filePaths[0];
        global_base_path = result.filePaths[0];
        fs.writeFileSync('./data/settings/current_base.json', result.filePaths[0]);
        let tobe_picked_path = global_base_path.slice(0, global_base_path.lastIndexOf('.')) +'_tobepicked.json';
        hasnt_been_picked_path.value = tobe_picked_path;
    });
});

clear_hasnt_been_picked_btn.addEventListener('click', () => {
    resetToBePicked()
});

window.onload = function() {
    // let buf = fs.readFileSync('./data/settings/current_base.json').toString()
    // console.log(buf);
    fs.readFile('./data/settings/current_base.json', function(err, dat) {
        if (err) {
            console.log(err);
            return;
        }
        global_base_path = dat;
        base_path.value = dat;
        // 待选数组，如果存在，则不再更新，如果不存在则进行更新
        // TODO 刷新之后待选数组更新了
        let tobe_picked_path = global_base_path.slice(0, global_base_path.lastIndexOf('.')) +'_tobepicked.json';
        fs.access(tobe_picked_path, function(err) {
            if (err) {
                let exe_num;
                fs.readFile(global_base_path, function(err, dat) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        dat = JSON.parse(dat);
                        exe_num = dat.length;
                        // console.log(dat);
                        fs.writeFileSync(
                            tobe_picked_path, 
                            JSON.stringify(new Array(exe_num).fill().map((e, i)=>i))
                        );
                    }
                })
            }
        })
        hasnt_been_picked_path.value = tobe_picked_path;
    })

    fs.readFile('./css/mainfont.css', function(err, dat) {
        if (err) {
            console.log(err);
        }
        else {
            dat = dat.toString();
            // console.log(dat);
            let fonts = dat.slice(dat.search('font-family: ') + 13, dat.search(';'));
            set_font_family.value = fonts;
        }
    })

    fs.readFile('./css/fontweight.css', function(err, dat) {
        if (err) {
            console.log(err)
        }
        else {
            dat = dat.toString();
            let weight = dat.slice(dat.search('font-weight: ') + 13, dat.search(';'));
            set_font_weight.value = weight;
        }
    })
}

// 强制更新待选数组，好像也用不着fs.access
function resetToBePicked() {
    let tobe_picked_path = global_base_path.slice(0, global_base_path.lastIndexOf('.')) +'_tobepicked.json';
    fs.access(tobe_picked_path, (err) => {
        let exe_num;
        fs.readFile(global_base_path, (err, dat) => {
            if (err) {
                console.log(err);
            }
            else {
                dat = JSON.parse(dat);
                exe_num = dat.length;
                // console.log(dat);
                fs.writeFileSync(
                    tobe_picked_path, JSON.stringify(new Array(exe_num).fill().map((e, i)=>i))
                );
            }
        })
    })
    hasnt_been_picked_path.value = tobe_picked_path;
}

const set_font_family = document.querySelector("#set-font-family");
const confirm_font = document.querySelector("#confirm-font")

confirm_font.addEventListener('click', () => {
    let fonts = set_font_family.value;
    let css = 'body \{ font-family: ' + fonts + ';\}';
    fs.writeFileSync('./css/mainfont.css', css);
})

const set_font_weight = document.querySelector('#set-font-weight');

set_font_weight.addEventListener('change', () => {
    let font_weight = set_font_weight.value;
    let css = 'body \{ font-weight: ' + font_weight + ';\}';
    fs.writeFileSync('./css/fontweight.css', css);
})