var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号？\nnode server.js 8888 这样')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有人发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  response.statusCode = 200
  // 默认首页
  const filePath = path === '/' ? '/index.html' : path
  const index = filePath.lastIndexOf('.')
  // extension 是后缀
  const extension = filePath.substring(index)
  const fileTypes = {
    '.html':'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
	'.xml':'text/xml',
    '.json':'text/json',
    '.png':'image/png',
    '.jpg':'image/jpeg'
  }
  response.setHeader('Content-Type', `${fileTypes[extension] || 'text/html'};charset=utf-8`)
  let content
  try{
    content = fs.readFileSync(`./public${filePath}`)
  }catch(error){
	response.statusCode = 404
    content = '文件不存在'
  }
  response.write(content)
  response.end()

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用浏览器打开 http://localhost:' + port)
