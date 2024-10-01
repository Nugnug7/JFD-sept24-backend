const mysql = require('mysql2')
const http = require('http')
const fs = require('fs')



// Menyambungkan ke sql 
const db = mysql.createConnection ({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'db_jdf_sep24'
})

// Buka koneksi Database
db.connect ( (error) =>{
    if (error) {
        throw error
    } else {
        console.log('Berhasil terkoneksi')
    }
})


// Database query untuk di tarik data nya 
db.query('SELECT * FROM karyawan', function(errorSql, hasil) {
    if (errorSql) {
        console.log(errorSql)
    } else {
        console.log(hasil)
    }
})




function getAll_karyawan () {
    return new Promise ( (resolve, rejects) => {
        let sqlSyntax =
        `SELECT 
            kry.*, jbt.nama as jabatan_nama, 
            jbt.singkatan as jabatan_singkatan, 
            agm.nama as agama_nama 
        FROM karyawan as kry 
        LEFT JOIN jabatan as jbt ON jbt.id = kry.jabatan 
        LEFT JOIN agama as agm ON agm.id = kry.agama`
        

        db.query('SELECT * FROM karyawan', function(errorSql, hasil) {
            if (errorSql) {
                rejects(errorSql)
            } else {
                resolve(hasil)
            }
    })
})
}


http.createServer(async function(request,response) {
    response.writeHead(200, {'content-type' : 'text/html'})

    if (request.url == '/') {
        fs.createReadStream('./view/halaman-utama.html').pipe(response)        
    }
    else if (request.url == '/karyawan') {
        // Tarik data dari Database
        let data = await getAll_karyawan()

        // Looping data dalam bentuk elemen html
        let html_list_karyawan = ''
        for (const i in data) {
           html_list_karyawan +=
           ` Nama lengkap :${data[i].nama} <br>
             NIK          :${data[i].nik} <br>
             Alamat       :${data[i].alamat} <br>
             Tanggal lahir:${new Date(data[i].tanggal_lahir).toLocaleDateString('id-ID')} <br>
             Jabatan      :${data[i].jabatan_nama ? data[i].jabatan_nama : ''}<br>
             Agama        :${data[i].agama_nama ? data [i].agama_nama : ''} <br>
             <br>     
           `
        }

    
        // Kirim hasilnya ke Front End
        response.end(
        `<h1>Data Karyawan PT Data informasi teknologi</h1>
        <hr>
        <br>
        ${html_list_karyawan}
        `
        )
    }

}).listen(3000, function() {
    console.log('Server sudah nyala, http://localhost:3000')
})