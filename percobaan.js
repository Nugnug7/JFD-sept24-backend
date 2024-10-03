//  memanggil modul bawaan dari node.js yaitu http 
//  untuk membuat server http

// Step Step Add folder / modify scripts

// git add .
// git commit -m "ketik commit"
// git push

// Reset code coding balik ke masa sebelumnya dengan command sebagai berikut
//git --hard (kode commit nya)


const http = require('http')
const fs = require('fs')


http.createServer(function(request,response) {
    response.writeHead(200, {'content-type' : 'text/html'})
    console.log(request.url)

    // Halaman utama
    if (request.url == '/') {
        fs.createReadStream('./view/halaman-utama.html').pipe(response)        
    }

    // halaman profil
    else if (request.url == '/profil') {
        let tahun_lahir = 1945
        let tahun_ini = 2024
        let umur  = tahun_ini - tahun_lahir
        fs.createReadStream('./view/halaman-profil.html').pipe(response)
    }

    // halaman hubungi
    else if (request.url == '/hubungi-saya') {
        let kontak = {
            wa      : '082122513110',
            email   : 'dwi@gmail.com',
            linkend : 'linkend',
            ig      : 'dwinug',
        }
        response.end(
            `<ul>
                <li>Wa      : ${kontak.wa}</li>
                <li>Email   : ${kontak.email}</li>
                <li>Email   : ${kontak.linkend}</li>
                <li>Email   : ${kontak.ig}</li>
            </ul>`
        )
        
    }

    // Untuk menangani URL yang tidak ada
    else {
        response.end(`<h1>Halaman tidak di temukan</h1>`)
    }


}).listen(3000, function() {
    console.log('Server sudah nyala, http://localhost:3000')
})


// Test Menambah komentar


