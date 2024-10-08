// Requirement aplikasi pendukung node JS untuk backend (express js, node module, express-validator)
const express = require('express')
const app = express()
const mysql = require('mysql2')
const moment = require('moment')
const {body, query, validationResult} = require('express-validator')

// Membuat folder model terpisah untuk database 
const model_agama = require('./model/model_agama')
const model_jabatan = require('./model/model_jabatan')
const model_karyawan = require('./model/model_karyawan')

// Menyambungkan controller ke masing-masing controller sesuai fungsi
const cont_default = require('./controller/controller_default')
const cont_pendidikan = require('./controller/controller_pendidikan')
const cont_karyawan = require('./controller/controller_karyawan')

// Menyambungkan ke sql 
const db = mysql.createConnection ({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'db_jdf_sep24'
})

// Buka koneksi Database.
db.connect ( (error) =>{
    if (error) {
        throw error
    } else {
        console.log('Berhasil terkoneksi')
    }
})


// Untuk mengambil data yang ter-encoded (enkripsi)
// Yang dikirimkan melalui protokol http
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')       // setting penggunaan template engine express
app.set('views', './view-ejs')      // setting penggunaan untuk menyimpan file ejs

//  '/', '/pendidikan', '/karyawan' = artinya rute / url
// function render ('nama-file') 
// nama file nya wajib ber extensi .ejs
// otomatis mengambil file .ejs yang ada di folder view-ejs

app.get('/', cont_default.halaman_beranda)
app.get('/pendidikan', cont_pendidikan.halaman_pendidikan)
app.get('/karyawan', cont_karyawan.halaman_list_semua_karyawan)
app.get('/karyawan/detail/:id_karyawan', cont_karyawan.halaman_karyawan_detail)
app.get('/karyawan/tambah', cont_karyawan.halaman_karyawan_form_tambah)

let formValidasiInsert = [
    body('form_nik').notEmpty().isNumeric(),
    body('form_nama').notEmpty().isString(),
    body('form_tanggal_lahir').notEmpty().isDate(),
    body('form_alamat').notEmpty().isString(),
]

app.post('/karyawan/proses-insert-data', formValidasiInsert, cont_karyawan.proses_insert_karyawan)
app.get('/karyawan/hapus/:id_karyawan', cont_karyawan.proses_hapus)
app.get('/karyawan/edit/:id_karyawan', cont_karyawan.halaman_karyawan_form_edit)
app.post('/karyawan/proses-update-data/:id_karyawan', cont_karyawan.proses_update)





// Port untuk ke halaman HTML 
app.listen(3000, function() {
    console.log('Server sudah nyala, http://localhost:3000')
})