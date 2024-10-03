const express = require('express')
const app = express()
const mysql = require('mysql2')



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
        

        db.query(sqlSyntax, function(errorSql, hasil) {
            if (errorSql) {
                rejects(errorSql)
            } else {
                resolve(hasil)
            }
    })

    })
}

app.set('view engine', 'ejs')       // setting penggunaan template engine express
app.set('views', './view-ejs')      // setting penggunaan untuk menyimpan file ejs


//  '/', '/pendidikan', '/karyawan' = artinya rute / url
// function render ('nama-file') 
// nama file nya wajib ber extensi .ejs
// otomatis mengambil file .ejs yang ada di folder view-ejs

app.get('/', function(req,res) {
    res.render('beranda') 
})


app.get('/pendidikan', function(req,res) {
    let profil = {
        nama : 'Prabowo Subianto',
        S1   : 'UI',
        SMK  : 'SMEA',
    }
    res.render ('page-pendidikan', profil)
})


app.get('/karyawan', async function(req,res) {
    // Prose Penarikan Data
    let data = {
        karyawan : await getAll_karyawan()
    }
    res.render ('page-karyawan', data)
})


app.listen(3000, function() {
    console.log('Server sudah nyala, http://localhost:3000')
})