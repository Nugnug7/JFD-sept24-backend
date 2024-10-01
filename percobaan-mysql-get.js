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

db.query('SELECT * FROM karyawan', function(errorSql, hasil) {
    if (errorSql) {
        console.log(errorSql)
    } else {
        console.log(hasil)
    }
})