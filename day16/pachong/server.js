// 引入https模块
const https = require("https");
//引入第三方依赖包 cheerio 类似jquery的语法
const cheerio = require("cheerio");
//请求的路径
const url = "https://www.zhipin.com/shenzhen/";


https.get(url, (res) => {
    let raw = "";
    // console.log(res)
    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到raw变量中
    res.on("data", (chunk) => {
        raw += chunk;
    });
    //监听 req 的 end 事件
    res.on("end", () => {
        findBoss(raw);
    });
});


let findBoss = (htmlStr) => {
    //装载整个爬取的内容
    let result = [];
    //使用cheerio装载整个html页面
    const $ = cheerio.load(htmlStr);

    //类似于jquery的语法,去获取想要得到的内容
    $(".menu-sub ul").find('li').each((index, item) => {
        let Name = $(item).find("h4").text();
        let subName = [];
        $(item).find('a').each((k, v) => {
            subName.push($(v).text());
        });

        result.push({
            Name,
            subName
        });
    });

    console.log(result);
}