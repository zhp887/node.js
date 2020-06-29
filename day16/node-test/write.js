var fs = require('fs')

var str = 'hello world'
fs.writeFile('./test.txt',str,function(err){
    if (err) {
        console.log('写文件失败')
    } else {
        console.log('写文件成功')
    }
})