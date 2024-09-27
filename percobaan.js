//  memanggil modul bawaan dari node.js yaitu http 
//  untuk membuat server http

// Step Step Add folder / modify scripts
// git add .
// git commit -m "ketik commit"
// git push

const http = require('http')

http.createServer(function(request,response) {
    response.writeHead(200, {'content-type' : 'text/html'})
    response.end('<h1>Selamat Datang di website saya Horaai...<\h1>')

}).listen(3000, function() {
    console.log('Server sudah nyala, http://localhost:3000')
})


// Test Menambah komentar


