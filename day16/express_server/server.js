var express = require('express')

var server = express()
server.use(express.static('public'))
server.get('/*',function(req,res){
    console.log(req.url)
    res.send('hello express')
})


server.listen(8889,function(){
    console.log('server is running on 8889')
})