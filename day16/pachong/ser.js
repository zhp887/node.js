
const
http    = require('http'),
fs      = require('fs'),
cheerio = require('cheerio'),
request = require('superagent'),
xlsx    = require('node-xlsx'),
url = 'http://wh.fang.anjuke.com/loupan/all/p';

let page = 1,
list = [],
start = '',
fetchPage = ()=> {
    start();
};

start = ()=> {
request.get(url + page +'/')
    .end((err, res)=> {
        if (!err) {     // 如果获取过程中没有发生错误
            let
                html = res.text,    // 获取到数据
                $ = cheerio.load(html, {decodeEntities: false}),    // 加载获取到的 html 数据
                $itemMod = $('.key-list').find('.item-mod'),
                len = $itemMod.length;

            if(len > 0) {
                page ++;
                $itemMod.each((i, e)=> {
                    let data = [],  // 用来存储抓取的数据
                        $e = $(e);  // 缓存
                    data.push($e.find('.items-name').text().trim());
                    data.push($e.find('.status-icon').text().trim());
                    data.push($e.find('.address').text().trim().replace(/(&nbsp;)*|（.*/g, '').split('（')[0]);
                    data.push($e.find('.price').text().trim());
                    data.push($e.find('.tel').text().trim());
                    data.push($e.find('.address').next('p').find('a').text().trim());
                    data.push($e.find('.pic>img').attr('src'));
                    list.push(data);
                });
                console.log(list.length);
                // 通过 xlsx 模块将数据转化成 buffer 对象
                let buf = xlsx.build([{name: 'hhh'}, {data: list}]);
                // 将 buffer 写入到 my.xlsx 中（导出）
                fs.writeFile('my.xlsx', buf, (err)=> {
                    if(err) throw err;
                    console.log('File is saved!');
                    // 回调获取下一页数据
                    start();
                });
            }

        } else {
            console.log('Get data error !');
        }
    });
};

fetchPage();
