const fs = require('fs');
const mammoth = require('mammoth');

var content = document.querySelector('#to-replace');

mammoth.extractRawText({path : "./data/doc.docx"})
    .then(function(result) {
        var text = result.value;
        text = text.replace(/\n\n/g, '<br>');
        content.innerHTML = text;
        console.log(text);
    })
    .done()