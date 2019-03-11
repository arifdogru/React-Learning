var  http=require('http');
var fs= require('fs');
function myfunc(request,response){
  if (request.url == '/') {
    //console.log(request);
    /*response.writeHeader(200,{'Context-Type':'text-plain'});
    response.write('<html><body><h1> Server Side </h1></body></html>');
    response.end();*/
    fs.createReadStream('./test.html').pipe(response);
  }
  else {
    response.writeHeader(404,{'Context-Type':'text-plain'});
    response.write('Bu Sayfaya Erişim Yoktur');
    response.end();
  }
}

http.createServer(myfunc).listen(8000);
console.log('SUNUCU AYAKTA');
