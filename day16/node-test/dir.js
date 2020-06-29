// node dir.js abc
// global 直接使用，无需引入

var fs = require('fs')

var dir = process.argv[2]

fs.mkdir(`./${dir}`,function(err,suc){
    if (err) {
        console.log('目录创建失败')
    }else{
        console.log('目录创建成功')
    }
})
