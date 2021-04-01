const admZip = require('adm-zip');
 
// 解压word文档
const zip = new admZip('2.docx');
zip.extractAllTo('./output/2', true);
 
// 提取内容
let contentXml = zip.readAsText("word/document.xml");
//console.log(contentXml);
 
// 正则匹配文字
let matchWT = contentXml.match(/(<w:t>.*?<\/w:t>)|(<w:t\s.[^>]*?>.*?<\/w:t>)/gi);
matchWT = filter(matchWT);
console.log(matchWT);
 
 
/**
 * 去除空白行
 * @param matchWT
 */
function filter(matchWT) {
    let res = [];
 
    matchWT.forEach(function(wtItem) {
        //如果不是<w:t xml:space="preserve">格式
        if (wtItem !== '<w:t xml:space="preserve"> </w:t>')  {
            wtItem = wtItem.split('>');
            wtItem = wtItem[1].split('<');
            res.push(wtItem[0]);  
    }});
    return res;
}