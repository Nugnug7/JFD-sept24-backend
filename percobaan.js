//  memanggil modul bawaan dari node.js yaitu http 
//  untuk membuat server http

// Step Step Add folder / modify scripts
// git add .
// git commit -m "ketik commit"
// git push

// Reset code coding balik ke masa sebelumnya dengan command sebagai berikut
//git --hard (kode commit nya)


const http = require('http')

http.createServer(function(request,response) {
    response.writeHead(200, {'content-type' : 'text/html'})
    console.log(request.url)

    // Halaman utama
    if (request.url == '/') {
        response.end(`<h1>Selamat datang di website</h1>`)
    }
    // halaman profil
    else if (request.url == '/profil') {
        response.end(
            `<ul>
                <li>Nama lengkap    : Dwi Nugroho</li>
                <li> Nama panggilan : Dwi </li>
                <li> Alamat         : Jakarta</li>
                <li> Pekerjaan      : Freelance</li>
            </ul>`
        )
    }
    // halaman hubungi
    else if (request.url == '/hubungi-saya') {
        response.end(
            `<ul>
                <li>Wa      : 082122513110</li>
                <li>Email   : dwi@gmail.com</li>
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


