// Requirement aplikasi pendukung node JS untuk backend (express js, node module, express-validator)

const express = require('express')
const app = express()
const mysql = require('mysql2')
const {body, query, validationResult} = require('express-validator')



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

function getOne_karyawan(idkry){
    return new Promise ( (resolve, rejects) => {
        let sqlSyntax =
        `SELECT 
            kry.*, jbt.nama as jabatan_nama, 
            jbt.singkatan as jabatan_singkatan, 
            agm.nama as agama_nama 
        FROM karyawan as kry 
        LEFT JOIN jabatan as jbt ON jbt.id = kry.jabatan 
        LEFT JOIN agama as agm ON agm.id = kry.agama
        where kry.id = ?`
        
        db.query(sqlSyntax, [idkry], function(errorSql, hasil) {
            if (errorSql) {
                rejects(errorSql)
            } else {
                resolve(hasil)
            }
    })

    })

}


// Untuk mengambil data yang ter-encoded (enkripsi)
// Yang dikirimkan melalui protokol http
app.use(express.urlencoded({extended:false}))
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

app.get('/karyawan/detail/:id_karyawan', async function(req,res) {
    // Ambil 1 data karyawan
    let data = {
        satukaryawan : await getOne_karyawan(req.params.id_karyawan)
    }
    res.render ('page-karyawan-detail', data)
})


// Menampilkan Jabatan dan Agama menjadi pilihan
function getAll_jabatan() {
    return new Promise( (resolve, reject) => {
        let sqlSyntax =
        `SELECT * FROM jabatan`
        db.query(sqlSyntax, function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}

function getAll_agama() {
    return new Promise( (resolve, reject) => {
        let sqlSyntax =
        `SELECT * FROM agama`
        db.query(sqlSyntax, function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}

app.get('/karyawan/tambah', async function(req,res) {
    // form tambah karyawan
    // tambah data variable jabatan dan agama untuk di tampilkan menjadi pilihan
    let data = {
        jabatan: await getAll_jabatan(),
        agama: await getAll_agama(),
    }
    res.render ('page-karyawan-form-tambah', data)
})


let formValidasiInsert = [
    body('form_nik').notEmpty().isNumeric(),
    body('form_nama').notEmpty().isString(),
    body('form_tanggal_lahir').notEmpty().isDate(),
    body('form_alamat').notEmpty().isString(),
]

app.post('/karyawan/proses-insert-data', formValidasiInsert,async function(req,res) {
    const errors = validationResult(req)
    // jika lolos validasi
    if (errors.isEmpty()) {
    // in case request params meet the validation criteria

    // form tambah karyawan
    // req.body             => ambil semua inputan dari form body
    // req.body.nama_form   => ambil satuan inputan dari form body

    try {
         // 2. Kirim sebagai script SQL
        let insert = await insert_karyawan(req)
          // 3. Proses pengecekan ter input ke DB 
        if (insert.affectedRows > 0)
            res.redirect('/karyawan')
            //console.log('Berhasil input ke Database')
    // 3a. Jika gagal, tampilan error
        } catch (error){
        // 3b. Jika berhasil, tampilan pesan sukses
        throw error
        }

    //insert_karywan (req)
    //res.end('kiriman data')
    // 1. Tangkap isi data dari masing-masing
    
    
    // jika tidak lolos
    } else {
    // res.status(422).json({errors: errors.array()})
    let errorData = {
        pesanError: errors.array()
    }
    errorData.pesanError[0].fields
    res.render('page-karyawan-form-tambah', errorData)
}

    
})

function insert_karyawan (req) {
    return new Promise ( (resolve, rejects) => {
        let sqlSyntax =
        `insert INTO karyawan
        (nama,nik,tanggal_lahir,alamat,jabatan,agama)
        Values
        (?,?,?,?,?,?)
        `
        let sqlData = [
            req.body.form_nama,
            req.body.form_nik,
            req.body.form_tanggal_lahir,
            req.body.form_alamat,
            req.body.form_jabatan,
            req.body.form_agama,
        ]
        
        db.query(sqlSyntax, sqlData, function(errorSql, hasil) {
            if (errorSql) {
                rejects(errorSql)
            } else {
                resolve(hasil)
            }
    })

    })

}


// Membuat tombol hapus pada page karyawan

function hapuskaryawan(idkry){
    return new Promise ( (resolve, rejects) => {
        let sqlSyntax =
        `DELETE From karyawan where id =?`
        
        db.query(sqlSyntax, [idkry], function(errorSql, hasil) {
            if (errorSql) {
                rejects(errorSql)
            } else {
                resolve(hasil)
            }
    })

    })
}

app.get('/karyawan/hapus/:id_karyawan', async function(req,res) {
    try {
        let hapus = await hapuskaryawan(req.params.id_karyawan)
        if (hapus.affectedRows > 0) {
        
        res.redirect('/karyawan')
    }
    }    catch (error) {
    throw error
    }

})





// Port untuk ke halaman HTML 
app.listen(3000, function() {
    console.log('Server sudah nyala, http://localhost:3000')
})