//什么是服务器？ 服务器有什么功能？

// 它能够接收请求，能够处理请求，响应请求

var http = require('http')
const fs = require('fs')

var server = http.createServer(function(req,res){
    // res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
    console.log(req.url)
    //后端路由
    var url = req.url
    if(req.url == '/favicon.ico'){
       res.end('')
    }else{
        //静态资源请求
        url = url === '/' ? '/index.html' : url
        res.statusCode = 200
        // 读取文件并返回客户端
        fs.createReadStream(`./ToDoList${url}`).pipe(res)
        // if (req.url == '/') {
        //     res.statusCode = 200
        //     res.setHeader('Content-Type','text/html')
        //     fs.createReadStream('./ToDoList/ToDoList.html').pipe(res)
        // }
        // if (req.url == '/ToDoList.css') {
        //     res.statusCode = 200
        //     fs.createReadStream('./ToDoList/css/ToDoList.css').pipe(res)
        // }
    }
    // switch (req.url) {
    //     case '/':
    //         //管道流
    //         fs.createReadStream('./ToDoList/ToDoList.html').pipe(res)
    //         // res.end('首页')
    //         break;
    //     case '/list':
    //         res.end('商品列表')
    //         break;
    //     case '/deta':
    //         res.end('商品详情')
    //         break;
    //     default:
    //         // break;
    //         res.end('othor')
    // }
    //我收到了请求，

    //结束掉本次对话
    // res.end('hello 2001')
})

server.listen(8888,function(){
    console.log('server is running on 8888')
})